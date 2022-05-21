import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js'; 
import Token from '../models/tokenModel.js'; 
import bcrypt from 'bcryptjs';
import { generateAuthToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req,res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
}));


userRouter.post('/signin', expressAsyncHandler(async (req,res) => {

    const user = await User.findOne({email: req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            const token = await generateAuthToken(user);
            const createToken = await Token.create({user_id: user._id,token: token});

            if(createToken) {
                res.send( {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: token,
                })


            } else{
                res.status(500).send( {message: 'error creating token'} );
                //token fail
            }

        } else {
            //password wrong
            res.status(401).send( {message: 'Invalid email or password'} );
        }
    }else {
        //no such user//
        res.status(401).send( {message: 'Invalid email or password'} );
    }
    
}));

userRouter.post('/register', expressAsyncHandler(async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    if(user) {
        res.status(409).send( {message: 'Email already in use'} );
    }
    const new_user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: false    
    });
    if(!new_user) {
        res.status(500).send( {message: 'error creating user'} );
    }
    // const token = await generateAuthToken(user);
    // const createToken = await Token.create({user_id: user._id,token: token});
    // if(createToken) {

        res.send({                   
            _id: new_user._id,
            name: new_user.name,
            email: new_user.email,
            isAdmin: new_user.isAdmin,
        });

    // }else{
    //     res.status(500).send( {message: 'error creating token'} );
    //     //token fail
    // }

}))
export default userRouter;