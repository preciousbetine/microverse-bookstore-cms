import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeBook } from '@/redux/books/booksSlice';
import { showMessage } from '@/redux/modal/modalSlice';
import Styles from '@/styles/Book.module.scss';

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
        </ul>
      </div>
      <div className={Styles['reading-progress']}>
        <div className={Styles['percent-complete']}>
          <div className={Styles['progress-display']} />
          <div>
            <p className={Styles['percent-value']}>64%</p>
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
            UPDATE PROGRESS
          </button>
        </div>
      </div>
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
