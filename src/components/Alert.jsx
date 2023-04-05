import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '@/redux/modal/modalSlice';
import Styles from '@/styles/Modal.module.scss';

const Alert = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((store) => store.modal);

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
};

export default Alert;
