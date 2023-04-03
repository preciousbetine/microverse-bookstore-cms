import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeBook } from '@/redux/books/booksSlice';
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

Book.propTypes = {
  bookId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Book;
