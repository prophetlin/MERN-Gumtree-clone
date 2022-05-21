import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    negotiable: {
        type: Boolean,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    dateListed: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
})

const Listing = mongoose.model('Listing',ListingSchema);
export default Listing;