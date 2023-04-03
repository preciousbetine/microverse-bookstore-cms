import {
  createSlice,
  createAsyncThunk,
  isPending,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';
import { addBookAtAPI, deleteBookAtAPI, getBooksFromAPI } from './booksApi';

const initialState = {
  defaultCategory: 'Fiction',
  books: [],
  loading: false,
  error: undefined,
};

const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, thunkAPI) => {
    try {
      const books = await getBooksFromAPI();
      return books;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const addBook = createAsyncThunk(
  'books/addBook',
  async (bookInfo, thunkAPI) => {
    try {
      const { books } = thunkAPI.getState().books;
      const resp = await addBookAtAPI(bookInfo, books);
      if (resp === 'Created') {
        const books = await getBooksFromAPI();
        return books;
      }
      return thunkAPI.rejectWithValue('Wrong API response received!');
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const removeBook = createAsyncThunk(
  'books/removeBook',
  async (bookId, thunkAPI) => {
    try {
      await deleteBookAtAPI(bookId);
      const books = await getBooksFromAPI();
      return books;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(addBook, fetchBooks, removeBook),
        (state) => ({
          ...state,
          loading: true,
        }),
      )
      .addMatcher(
        isFulfilled(addBook, fetchBooks, removeBook),
        (state, { payload }) => ({
          ...state,
          books: payload,
        }),
      )
      .addMatcher(
        isRejected(addBook, fetchBooks, removeBook),
        (state, { payload }) => ({
          ...state,
          loading: false,
          error: payload,
        }),
      );
  },
});

export { fetchBooks, addBook, removeBook };
export default booksSlice.reducer;
