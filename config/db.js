import mongoose from "mongoose";


export const connectdb = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/library");
        console.log("Database connected");
    } catch (error) {
        console.log("Failed to connect to database");
    }
}