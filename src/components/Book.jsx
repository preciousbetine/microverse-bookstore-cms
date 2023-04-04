import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeBook } from '@/redux/books/booksSlice';
import { showMessage } from '@/redux/modal/modalSlice';
import Styles from '@/styles/Book.module.scss';

const Book = ({
  bookId,
  title,
  author,
  category,
  progress,
}) => {
  const dispatch = useDispatch();
  const progressBar = React.createRef();

  const deleteThisBook = () => {
    dispatch(removeBook(bookId));
  };

  useEffect(() => {
    let progressValue = 0;
    const progressEndValue = progress;
    const speed = 10;

    const progressTimer = setInterval(() => {
      progressValue += 1;
      progressBar.current.style.background = `conic-gradient(
        #307bbe ${progress * 3.6}deg,
        #379cf6 ${(progress * 3.6)}deg,
        var(--secondary-color)
      )`;
      if (progressValue === progressEndValue) clearInterval(progressTimer);
    }, speed);
  }, [progress, progressBar]);

  const bookControls = (
    <>
      <li>
        <button
          type="button"
          onClick={() => dispatch(showMessage('Feature not implemented yet'))}
        >
          Comments
        </button>
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
        <button
          type="button"
          onClick={() => dispatch(showMessage('Feature not implemented yet'))}
        >
          Edit
        </button>
      </li>
    </>
  );

  return (
    <div className={Styles.book}>
      <div className={Styles['book-description']}>
        <div>
          <div className={Styles.category}>{category}</div>
          <h2 className={Styles['book-title']}>{title}</h2>
          <span className={Styles.author}>{author}</span>
        </div>
        <ul className={Styles['desktop-controls']}>
          {bookControls}
        </ul>
      </div>
      <div className={Styles['reading-progress']}>
        <div className={Styles['percent-complete']}>
          <div
            ref={progressBar}
            className={Styles['progress-display']}
          />
          <div>
            <p className={Styles['percent-value']}>
              {progress}
              {' '}
              %
            </p>
            <p>Completed</p>
          </div>
        </div>
        <div className={Styles['progress-update']}>
          <h3>CURRENT CHAPTER</h3>
          <p>CHAPTER 17</p>
          <button
            type="button"
            onClick={() => dispatch(showMessage('Feature not implemented yet'))}
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
  progress: PropTypes.number.isRequired,
};

export default Book;
