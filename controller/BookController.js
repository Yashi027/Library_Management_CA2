import Book from "../model/Book.js";

export const addBook = async(req,res) => {
    try {
        const {title, author, category} = req.body;
        if(!title || !author || !category ){
            return res.status(400).json({success: false, message: "Please fill all the details"})
        }
        const newBook = await Book.create({
            title: title,
            author: author,
            category: category
        });
        return res.status(201).json({success: true, message:"Book added successfully", newBook});
    } catch (error) {
        console.log("Error while adding book", error);
        return res.status(500).json({success: false, message:"Internal Server Error"})
    }
}


export const getBooks = async(req,res) => {
    try {
        const limit = parseInt(req.query.limit , 10) || 10;
        const page = parseInt(req.query.page, 10) || 1;

        const books = await Book.find().sort({createdAt:-1}).skip((page-1)*limit).limit(limit);
        if(!books){
            return res.status(400).json({success: false, message: "No books found"});
        }
        const totalbooks = await Book.countDocuments();
        const totalpages = Math.ceil(totalbooks/limit);
        return res.status(200).json({success: true, message: "Fetched all books", currPage: page, totalRecords: totalbooks});

    } catch (error) {
        console.log("Error while fetching book", error);
        return res.status(500).json({success: false, message:"Internal Server Error"})
    }
}

export const updateBook = async(req,res) => {
    try {
        const {id} = req.params;
        if(!id){
            console.log(id);
            return res.status(400).json({success: false, message: "Not a valid path"});
        }
        const {isAvailable} = req.body;
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({success: false, message: "Book not found"});
        }
        book.isAvailable = isAvailable;
        const updatedBook = await book.save();
        return res.status(200).json({success: true, message: "Book updated successfully", updatedBook});
    } catch (error) {
        console.log("Error while updating book", error);
        return res.status(500).json({success: false, message:"Internal Server Error"})
    }
}