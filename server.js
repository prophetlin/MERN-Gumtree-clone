import express from 'express';
import userRouter from './routers/userRouter.js';
import listingRouter from './routers/listingRouter.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import  fileUpload  from 'express-fileupload';
import path from 'path';
dotenv.config();
const uri = "mongodb+srv://lyh133:lolaofu133@dumbtree.d4zgv.mongodb.net/dumbtree?retryWrites=true&w=majority";
const __dirname = path.resolve();
//process.env.MONGODB_URL ||'mongodb://localhost/dumbtree'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(fileUpload());
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(express.static(path.join(__dirname, "client", "build")))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

app.use('/api/users', userRouter);
app.use('/api/listings', listingRouter);


app.use((err,req,res,next) => {
    res.status(500).send({message: err.message});
})

app.get('/', (req, res) => {
    res.send('Server is ready');
});


const port = process.env.PORT || 5000;
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => {

    console.log(`server at ${port}`);
})