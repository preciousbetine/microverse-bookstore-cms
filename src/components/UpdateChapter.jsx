import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { updateBookChapter } from '@/redux/books/booksSlice';
import { hideModal } from '@/redux/modal/modalSlice';
import Styles from '@/styles/Modal.module.scss';

const UpdateChapter = () => {
  const [numChapters, setNumChapters] = useState(0);
  const { books } = useSelector((store) => store.books);
  const [bookChapter, setBookChapter] = useState(0);
  const chapterInput = React.createRef();
  const dispatch = useDispatch();
  const { message, book } = useSelector((store) => store.modal);

  const updateChapter = (e) => {
    e.preventDefault();
    dispatch(updateBookChapter({ book, bookChapter }));
  };

  useEffect(() => {
    const currentBook = books.find((item) => item.item_id === book);
    if (message === 'update') {
      setBookChapter(currentBook.chapter);
      setNumChapters(currentBook.numChapters);
    }
    chapterInput.current?.focus();
  }, []);

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
};

export default UpdateChapter;
