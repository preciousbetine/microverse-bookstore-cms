import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeBook } from '@/redux/books/booksSlice';
import Styles from '@/styles/Book.module.scss';

const Book = ({
  bookId,
  title,
  author,
  category,
}) => {
  const dispatch = useDispatch();

  const deleteThisBook = () => {
    dispatch(removeBook(bookId));
  };

  const bookControls = (
    <>
      <li>
        <button type="button">Comments</button>
      </li>
      <li>
        <button type="button" onClick={() => { deleteThisBook(); }}>
          Remove
        </button>
      </li>
      <li>
        <button type="button">Edit</button>
      </li>
    </>
  );

  return (
    <div className={Styles.book}>
      <div className={Styles['book-description']}>
        <div>
          <div className={Styles.category}>
            {category}
          </div>
          <h2 className={Styles['book-title']}>{title}</h2>
          <div className={Styles.author}>{author}</div>
        </div>
        <ul className={Styles['desktop-controls']}>
          {bookControls}
        </ul>
      </div>
      <div className={Styles['reading-progress']}>
        <div className={Styles['percent-complete']}>
          <div
            className={Styles['progress-display']}
          />
          <div>
            <p className={Styles['percent-value']}>
              0%
            </p>
            <p>Completed</p>
          </div>
        </div>
        <div className={Styles['progress-update']}>
          <h3>CURRENT CHAPTER</h3>
          <p>NOT STARTED</p>
          <button
            type="button"
          >
            UPDATE&nbsp;PROGRESS
          </button>
        </div>
      </div>
      <ul className={Styles['mobile-controls']}>
        {bookControls}
      </ul>
    </div>
  );
};

Book.propTypes = {
  bookId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Book;
