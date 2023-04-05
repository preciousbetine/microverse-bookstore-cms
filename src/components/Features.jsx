import React from 'react';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { hideModal } from '@/redux/modal/modalSlice';
import Styles from '@/styles/Modal.module.scss';

const Features = () => {
  const dispatch = useDispatch();

  return (
    <>
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
        <li>Comment feature: users can leave feedback.</li>
      </ul>
    </>
  );
};

export default Features;
