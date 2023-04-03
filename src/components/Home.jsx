import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addBook, removeBook } from '@/redux/books/booksSlice';
import Styles from '@/styles/Home.module.scss';

const Book = ({
  bookId, title, author, category,
}) => {
  const dispatch = useDispatch();

  const deleteThisBook = () => {
    dispatch(removeBook(bookId));
  };

  return (
    <div className={Styles.book}>
      <div className={Styles['book-description']}>
        <div>
          <div className={Styles.category}>{category}</div>
          <h2 className={Styles['book-title']}>{title}</h2>
          <span className={Styles.author}>{author}</span>
        </div>
        <ul>
          <li>
            <button type="button">Comments</button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => { deleteThisBook(); }}
            >
              Remove
            </button>
          </li>
          <li>
            <button type="button">Edit</button>
          </li>
        </ul>
      </div>
      <div />
      <div />
    </div>
  );
};

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(addBook({ title, author }));
  };

  return (
    <div className={Styles['book-form-container']}>
      <h2>ADD NEW BOOK</h2>
      <form onSubmit={submitForm}>
        <input
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={Styles['title-input']}
        />
        <input
          placeholder="Book author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={Styles['author-input']}
        />
        <button type="submit">ADD BOOK</button>
      </form>
    </div>
  );
};

const Home = () => {
  const { books } = useSelector((store) => store.books);

  const allBooks = books.map((book) => (
    <Book
      bookId={book.item_id}
      key={book.item_id}
      title={book.title}
      author={book.author}
    />
  ));

  return (
    <>
      <div className={Styles.books}>
        {allBooks}
      </div>
      <AddBookForm />
    </>
  );
};

Book.propTypes = {
  bookId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string,
};

Book.defaultProps = {
  category: 'Fiction',
};

export default Home;
