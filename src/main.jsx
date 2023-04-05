import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from '@/redux/store';
import { fetchBooks } from '@/redux/books/booksSlice';
import { editBooks } from './redux/books/booksApi';

store.dispatch(fetchBooks());

const f = async () => {
  const books = await editBooks();
  console.log(books);
};

// f();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
