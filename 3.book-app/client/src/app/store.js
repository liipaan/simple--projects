import {configureStore} from '@reduxjs/toolkit'
import booksReducer from '../feature/books/bookSlice'
export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
})