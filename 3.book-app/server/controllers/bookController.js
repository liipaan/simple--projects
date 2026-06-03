import Book from "../models/Book.js";
import mongoose from "mongoose";
export const getBooks = async (req, res) => {
try {
const books = await Book.find().sort({createdAt:-1})
res.json(books)

} catch (error) {
   res.status(500).json({message:"internal server error"}) 
}
}
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            return res.status(404).json({message:"Book not found"})
        }
        res.json(book)
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}

export const createBook = async (req, res) => {
    try{
        const {title,author,price} = req.body
        if (!title || !author || !price) {
            return res.status(400).json({message:"All fields are required"})
        }
        const book = await Book.create({title,author,price})
        res.status(201).json(book)
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}
export const updateBook = async (req, res) => {
    try {
        const {title,author,price} = req.body
        if (!title || !author || !price) {
            return res.status(400).json({message:"All fields are required"})
        }
        const book = await Book.findByIdAndUpdate(req.params.id, {title,author,price},{ returnDocument:"after"})
        if (!book) {
            return res.status(404).json({message:"Book not found"})
        }
        res.json(book)
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        if (!book) {
            return res.status(404).json({message:"Book not found"})
        }
        res.json({message:"Book deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}