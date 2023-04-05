import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '@/redux/modal/modalSlice';
import { makeComment, updateBookChapter } from '@/redux/books/booksSlice';
import Styles from '@/styles/Modal.module.scss';

const Modal = () => {
  const dispatch = useDispatch();
  const { showing, message, book } = useSelector((store) => store.modal);
  const { books } = useSelector((store) => store.books);
  const [bookChapter, setBookChapter] = useState(0);
  const [numChapters, setNumChapters] = useState(0);
  const [bookComments, setBookComments] = useState([]);
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const chapterInput = React.createRef();
  const usernameInput = React.createRef();

  useEffect(() => {
    if (showing) {
      const currentBook = books.find((item) => item.item_id === book);
      if (message === 'update') {
        setBookChapter(currentBook.chapter);
        setNumChapters(currentBook.numChapters);
      }
      if (message === 'comment') {
        setBookComments(currentBook.comments);
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
    const postComment = (e) => {
      e.preventDefault();
      dispatch(makeComment({ bookId: book, username, comment }));
      setComment('');
      setUsername('');
    };

    return (
      <div className={Styles['modal-parent']}>
        <div className={Styles.modal}>
          <div className={Styles['modal-header']}>
            <h2>Comments</h2>
            <button
              type="button"
              onClick={() => dispatch(hideModal())}
            >
              <FaTimes />
            </button>
          </div>
          <ul className={Styles.comment}>
            {bookComments.map(({ username, comment, timestamp }) => (
              <li key={timestamp}>
                <span className={Styles['comment-timestamp']}>
                  {(new Date(JSON.parse(timestamp))).getDate()}
                  /
                  {(new Date(JSON.parse(timestamp))).getMonth() + 1}
                  /
                  {(new Date(JSON.parse(timestamp))).getFullYear()}
                  {' '}
                  {(new Date(JSON.parse(timestamp))).getHours()}
                  :
                  {(new Date(JSON.parse(timestamp))).getMinutes()}
                </span>
                <p className={Styles['comment-username']}>{username}</p>
                <p className={Styles['comment-body']}>{comment}</p>
              </li>
            ))}
          </ul>
          <form className={Styles['comment-form']} onSubmit={postComment}>
            <input
              className={Styles['username-input']}
              ref={usernameInput}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name..."
            />
            <input
              className={Styles['comment-input']}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment..."
            />
            <button type="submit">
              <AiOutlineSend />
            </button>
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
