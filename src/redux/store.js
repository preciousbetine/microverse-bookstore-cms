import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '@/redux/categories/categoriesSlice';
import booksReducer from '@/redux/books/booksSlice';
import modalReducer from '@/redux/modal/modalSlice';

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    books: booksReducer,
    modal: modalReducer,
  },
});
