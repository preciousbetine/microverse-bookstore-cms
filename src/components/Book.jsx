import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { removeBook, editBook } from '@/redux/books/booksSlice';
import { showMessage, updateChapter } from '@/redux/modal/modalSlice';
import Styles from '@/styles/Book.module.scss';

const Book = ({
  bookId,
  title,
  author,
  category,
  progress,
  chapter,
  numChapters,
}) => {
  const dispatch = useDispatch();
  const progressBar = React.createRef();
  const { categories } = useSelector((store) => store.categories);

  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [categoryEdit, setCategoryEdit] = useState(category);
  const [authorEdit, setAuthorEdit] = useState(author);
  const [numChaptersEdit, setNumChaptersEdit] = useState(numChapters);

  const deleteThisBook = () => {
    dispatch(removeBook(bookId));
  };

  const saveBook = () => {
    const book = {
      item_id: `${bookId}_${(chapter > numChaptersEdit) ? numChaptersEdit : chapter}_${numChaptersEdit}`,
      title: titleEdit,
      author: authorEdit,
      category: categoryEdit,
    };
    setIsEditing(false);
    dispatch(editBook({ bookId, book }));
  };

  useEffect(() => {
    progressBar.current.style.background = `conic-gradient(
      #307bbe ${(progress * 3.6) + 2}deg,
      #379cf6 ${(progress * 3.6) + 2}deg,
      var(--secondary-color)
    )`;
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
        {
          !isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Edit
            </button>
          )
        }
        {
          isEditing && (
            <button
              type="button"
              onClick={saveBook}
              className={Styles['save-btn']}
            >
              Save
            </button>
          )
        }
      </li>
    </>
  );

  return (
    <div className={Styles.book}>
      <div className={Styles['book-description']}>
        <div>
          <div className={Styles.category}>
            {!isEditing && category}
            {isEditing && (
              <select
                className={Styles['category-select']}
                value={categoryEdit}
                onChange={(e) => { setCategoryEdit(e.target.value); }}
              >
                {
                  categories.map((category) => <option key={category}>{category}</option>)
                }
              </select>
            )}
          </div>
          <>
            {!isEditing && (
              <h2 className={Styles['book-title']}>{title}</h2>
            )}
            {isEditing && (
              <input
                placeholder="Book title"
                value={titleEdit}
                onChange={(e) => { setTitleEdit(e.target.value); }}
                className={Styles['title-input']}
                required
              />
            )}
          </>
          <>
            {!isEditing && (
              <div className={Styles.author}>{author}</div>
            )}
            {isEditing && (
              <input
                placeholder="Book author"
                value={authorEdit}
                onChange={(e) => { setAuthorEdit(e.target.value); }}
                className={Styles['author-input']}
                required
              />
            )}
          </>
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
              %
            </p>
            <p>Completed</p>
          </div>
        </div>
        <div className={Styles['progress-update']}>
          {
            !isEditing && (
              <>
                <h3>CURRENT CHAPTER</h3>
                <p>{chapter ? `CHAPTER ${chapter} / ${numChapters}` : 'NOT STARTED'}</p>
                <button
                  type="button"
                  onClick={() => dispatch(updateChapter(bookId))}
                >
                  UPDATE&nbsp;PROGRESS
                </button>
              </>
            )
          }
          {
            isEditing && (
              <>
                <h3>NUMBER OF CHAPTERS</h3>
                <input
                  type="number"
                  className={Styles['chapter-edit']}
                  min={0}
                  value={numChaptersEdit}
                  onChange={(e) => { setNumChaptersEdit(e.target.value); }}
                />
              </>
            )
          }
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
  chapter: PropTypes.number.isRequired,
  numChapters: PropTypes.number.isRequired,
};

export default Book;
