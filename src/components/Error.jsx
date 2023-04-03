import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { clearBooksError } from '@/redux/books/booksSlice';
import Styles from '@/styles/Error.module.scss';

const Error = () => {
  const { error } = useSelector((store) => store.books);
  const dispatch = useDispatch();

  const clearError = () => {
    dispatch(clearBooksError());
  };

  return (
    <>
      {error && (
      <div className={Styles.error}>
        <div>
          {error}
        </div>
        <button type="button" onClick={clearError}>
          <FaTimes />
        </button>
      </div>
      )}
    </>
  );
};

export default Error;
