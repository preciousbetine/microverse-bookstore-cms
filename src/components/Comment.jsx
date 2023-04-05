import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '@/redux/modal/modalSlice';
import { makeComment } from '@/redux/books/booksSlice';
import Styles from '@/styles/Modal.module.scss';

const Comment = () => {
  const dispatch = useDispatch();
  const { book } = useSelector((store) => store.modal);
  const { books } = useSelector((store) => store.books);
  const [bookComments, setBookComments] = useState([]);
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const usernameInput = React.createRef();

  useEffect(() => {
    const currentBook = books.find((item) => item.item_id === book);
    setBookComments(currentBook.comments);
  }, [book, books]);

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
};

export default Comment;