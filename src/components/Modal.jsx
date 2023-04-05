import React from 'react';
import { useSelector } from 'react-redux';
import Features from '@/components/Features';
import Comment from '@/components/Comment';
import Alert from '@/components/Alert';
import UpdateChapter from './UpdateChapter';
import Styles from '@/styles/Modal.module.scss';

const Modal = () => {
  const { showing, message } = useSelector((store) => store.modal);

  return (
    showing && (
    <div className={Styles['modal-parent']}>
      <div className={Styles.modal}>
        {message === 'update' && <UpdateChapter />}
        {message === 'comment' && <Comment />}
        {message === 'features' && <Features />}
        {
          message !== 'update'
          && message !== 'comment'
          && message !== 'features'
          && <Alert />
        }
      </div>
    </div>

    )
  );
};

export default Modal;
