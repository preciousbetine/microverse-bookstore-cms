import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Styles from '@/styles/Home.module.scss';

const Book = ({ title, author, category }) => (
  <div className={Styles.book}>
    <div className={Styles['book-description']}>
      <div>
        <div className={Styles.category}>{category}</div>
        <h2 className={Styles['book-title']}>{title}</h2>
        <span className={Styles.author}>{author}</span>
      </div>
      <ul>
        <li>Comments</li>
        <li>Remove</li>
        <li>Edit</li>
      </ul>
    </div>
    <div />
    <div />
  </div>
);

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const submitForm = () => {
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
  const [books] = useState([
    {
      id: uuidv4(),
      title: 'The Way of Kings',
      author: 'Brandon Sanderson',
    },
    {
      id: uuidv4(),
      title: 'The Name of the Wind',
      author: 'Patrick Rothfuss',
    },
    {
      id: uuidv4(),
      title: 'The Final Empire',
      author: 'Brandon Sanderson',
    },
  ]);

  const bookElements = books.map((book) => (
    <Book
      key={book.id}
      title={book.title}
      author={book.author}
    />
  ));

  return (
    <>
      <div className={Styles.books}>
        {bookElements}
      </div>
      <AddBookForm />
    </>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string,
};

Book.defaultProps = {
  category: 'Fiction',
};

export default Home;
