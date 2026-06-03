import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

import axios from 'axios'
 const API_URL = 'http://localhost:3000/api/books'

 export const fetchBooks =createAsyncThunk("books/fetchBooks",async()=>{
    const res=await axios.get(API_URL)
    return res.data
 })

 export const fetchBookById = createAsyncThunk("books/fetchBookById",async(id)=>{
    const res=await axios.get(`${API_URL}/${id}`)
    return res.data
 })
 export const addBook = createAsyncThunk("books/addBook",async(book)=>{
    const res=await axios.post(API_URL,book)
    return res.data
 })

 export const editBook = createAsyncThunk("books/editBook",async({id,book})=>{
    const res=await axios.put(`${API_URL}/${id}`,book)
    return res.data
 })

 export const deleteBook = createAsyncThunk("books/deleteBook",async(id)=>{
    await axios.delete(`${API_URL}/${id}`)
    return { id }
 })

 const bookSlice = createSlice({
     name: "books",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchBooks.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchBooks.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
        })
        .addCase(fetchBooks.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }),
        builder.addCase(fetchBookById.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchBookById.fulfilled, (state, action) => {
            state.status = "succeeded";
            const index = state.items.findIndex(book => book.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            } else {
                state.items.push(action.payload);
            }  
        })
        .addCase(fetchBookById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }),
        builder.addCase(addBook.fulfilled, (state, action) => {
            state.items.push(action.payload); 
        }),
        builder.addCase(addBook.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }),
        builder.addCase(editBook.fulfilled, (state, action) => {
            const index = state.items.findIndex(book => book.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        }),
        builder.addCase(editBook.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }),
        builder.addCase(deleteBook.fulfilled, (state, action) => {
            state.items = state.items.filter(book => book.id !== action.payload.id);
        })
        .addCase(deleteBook.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }   
    })
 export default bookSlice.reducer