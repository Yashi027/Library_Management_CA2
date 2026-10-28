import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    author:{
        type: String,
        required: true,
        trim: true
    },
    category:{
        type: String,
        required: true
    },
    isAvailable:{
        type: Boolean,
        default: true
    }
},{timestamps: true})

const Book = mongoose.model('Book',BookSchema);
export default Book;