import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '@/redux/modal/modalSlice';
import { updateBookChapter } from '@/redux/books/booksSlice';
import Styles from '@/styles/Modal.module.scss';

const Modal = () => {
  const dispatch = useDispatch();
  const { showing, message, book } = useSelector((store) => store.modal);
  const { books } = useSelector((store) => store.books);
  const [bookChapter, setBookChapter] = useState(0);
  const [numChapters, setNumChapters] = useState(0);
  const chapterInput = React.createRef();

  useEffect(() => {
    if (message === 'update' && showing) {
      const currentBook = books.find((item) => item.item_id === book);
      setBookChapter(currentBook.chapter);
      setNumChapters(currentBook.numChapters);
    }
  }, [books, book, message, showing]);

  useEffect(() => {
    chapterInput.current?.focus();
  }, [chapterInput]);

  if (message === 'update' && showing) {
    const updateChapter = (e) => {
      e.preventDefault();
      dispatch(updateBookChapter({ book, bookChapter }));
    };

    return (
      <div className={Styles['modal-parent']}>
        <div className={Styles.modal}>
          <div className={Styles['modal-header']}>
            <h2>Update progress</h2>
            <button
              type="button"
              onClick={() => dispatch(hideModal())}
            >
              <FaTimes />
            </button>
          </div>
          <p>Enter current chapter</p>
          <form onSubmit={updateChapter}>
            <input
              ref={chapterInput}
              type="number"
              value={bookChapter}
              min={0}
              max={numChapters}
              onChange={(e) => setBookChapter(e.target.value.replace(/^0+/, ''))}
            />
            <button type="submit">UPDATE</button>
          </form>
        </div>
      </div>
    );
  }

  if (message === 'features' && showing) {
    return (
      <div className={Styles['modal-parent']}>
        <div className={Styles.modal}>
          <div className={Styles['modal-header']}>
            <h2>Features</h2>
            <button
              type="button"
              onClick={() => dispatch(hideModal())}
            >
              <FaTimes />
            </button>
          </div>
          <h3>
            Note: This is not a multi-user app.
            A single user can perform all the actions listed below.
          </h3>
          <ul>
            <li>Add books: users can add new books with relevant information.</li>
            <li>Remove books: users can delete books from the library.</li>
            <li>Edit books: users can modify book information.</li>
            <li>Set progress: users can update their reading progress.</li>
            <li>Show books by category: users can filter the library.</li>
            <li>Comment feature: users can leave feedback (currently not working).</li>
          </ul>
        </div>
      </div>
    );
  }

  if (showing) {
    return (
      <div className={Styles['modal-parent']}>
        <div className={Styles.modal}>
          <div className={Styles['modal-header']}>
            <h2>Alert</h2>
            <button
              type="button"
              onClick={() => dispatch(hideModal())}
            >
              <FaTimes />
            </button>
          </div>
          <span>{message}</span>
        </div>
      </div>
    );
  }

  return <></>;
};

export default Modal;
