import {
  createSlice,
  createAsyncThunk,
  isPending,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';
import {
  addBookAtAPI,
  deleteBookAtAPI,
  getBooksFromAPI,
  updateBookChaterAtAPI,
} from '@/redux/books/booksApi';
import { hideModal } from '@/redux/modal/modalSlice';

const initialState = {
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
      const { books } = thunkAPI.getState().books;
      await deleteBookAtAPI(bookId, books);
      const result = await getBooksFromAPI();
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const updateBookChapter = createAsyncThunk(
  'books/updateChapter',
  async ({ book, bookChapter }, thunkAPI) => {
    try {
      const { books } = thunkAPI.getState().books;
      await updateBookChaterAtAPI(book, bookChapter, books);
      const result = await getBooksFromAPI();
      thunkAPI.dispatch(hideModal());
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const editBook = createAsyncThunk(
  'books/editBook',
  async ({ bookId, book }, thunkAPI) => {
    try {
      const { books } = thunkAPI.getState().books;
      await deleteBookAtAPI(bookId, books);
      const { updatedBooks } = thunkAPI.getState().books;
      const resp = await addBookAtAPI(book, updatedBooks);
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

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearBooksError: (state) => ({
      ...state,
      error: undefined,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(addBook, fetchBooks, removeBook, editBook, updateBookChapter),
        (state) => ({
          ...state,
          loading: true,
        }),
      )
      .addMatcher(
        isFulfilled(addBook, fetchBooks, removeBook, editBook, updateBookChapter),
        (state, { payload }) => ({
          ...state,
          books: payload,
          loading: false,
          error: undefined,
        }),
      )
      .addMatcher(
        isRejected(addBook, fetchBooks, removeBook, editBook, updateBookChapter),
        (state, { payload }) => ({
          ...state,
          loading: false,
          error: payload,
        }),
      );
  },
});

export {
  fetchBooks,
  addBook,
  removeBook,
  editBook,
  updateBookChapter,
};
export const { clearBooksError } = booksSlice.actions;
export default booksSlice.reducer;
