import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Listing from '../models/listingModel.js'; 
import path from 'path';
const __dirname = path.resolve();
const listingRouter = express.Router();

listingRouter.get('/', expressAsyncHandler(async (req,res) => {
    const listings = await Listing.find({});
    res.send(listings);
}));

listingRouter.get('/seed', expressAsyncHandler(async (req,res) => {
    await Listing.remove({});
    const createdListings = await Listing.insertMany(data.listings);
    res.send({createdListings});
}));

listingRouter.get('/:id', expressAsyncHandler(async (req,res) => {
    const listing = await Listing.findById(req.params.id);
    if(listing){
        res.send(listing);
    } else {
        res.status(404).send({ message: 'Product Not Found'})
    }
    
}));


listingRouter.post('/create', expressAsyncHandler(async (req,res) => {

    console.log(req.body.title,req.body.category,req.body.image,req.body.price,req.body.location,req.body.detail, req.body.negotiable,req.body.condition,req.body.dateListed)


    const new_listing = await Listing.create({
        title: req.body.title,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        location: req.body.location,
        detail: req.body.detail,
        negotiable: req.body.negotiable,
        condition: req.body.condition,
        dateListed: req.body.dateListed,
    });
    if(!new_listing) {
        res.status(500).send( {message: 'error creating listing'} );
    }


    res.send({
        id: new_listing._id,
        title: req.body.title,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        location: req.body.location,
        detail: req.body.detail,
        negotiable: req.body.negotiable,
        condition: req.body.condition,
        dateListed: req.body.dateListed,
    })

}));

listingRouter.post('/upload', (req,res) => {

    if(req.files === null) {
        return res.status(400).send({message: 'No file uploaded'})
    }
    const file = req.files.file;
    file.mv(`${__dirname}/client/build/images/${file.name}`, err=>{
        if(err) {
            console.error(err);
            return res.status(400).send(err);
        }
    })
    res.send({fileName: file.name, filePath: `/uploads/${file.name}` })

});
export default listingRouter;