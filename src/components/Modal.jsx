import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '@/redux/modal/modalSlice';
import { updateBookChapter } from '@/redux/books/booksSlice';
import Features from '@/components/Features';
import Comment from '@/components/Comment';
import Alert from '@/components/Alert';
import Styles from '@/styles/Modal.module.scss';

const Modal = () => {
  const dispatch = useDispatch();
  const { showing, message, book } = useSelector((store) => store.modal);
  const { books } = useSelector((store) => store.books);
  const [bookChapter, setBookChapter] = useState(0);
  const [numChapters, setNumChapters] = useState(0);
  const chapterInput = React.createRef();
  const usernameInput = React.createRef();

  useEffect(() => {
    if (showing) {
      const currentBook = books.find((item) => item.item_id === book);
      if (message === 'update') {
        setBookChapter(currentBook.chapter);
        setNumChapters(currentBook.numChapters);
      }
    }
  }, [books, book, message, showing]);

  useEffect(() => {
    chapterInput.current?.focus();
    usernameInput.current?.focus();
  }, []);

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

  if (message === 'comment' && showing) {
    return (
      <Comment />
    );
  }

  if (message === 'features' && showing) {
    return (
      <Features />
    );
  }

  if (showing) {
    return (
      <Alert />
    );
  }

  return <></>;
};

export default Modal;
