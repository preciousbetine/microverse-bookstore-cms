import React from 'react';
import { useSelector } from 'react-redux';
import Features from '@/components/Features';
import Alert from '@/components/Alert';
import Styles from '@/styles/Modal.module.scss';

const Modal = () => {
  const { showing, message } = useSelector((store) => store.modal);

  return (
    showing && (
    <div className={Styles['modal-parent']}>
      <div className={Styles.modal}>
        {message === 'features' && <Features />}
        {
          message !== 'features'
          && <Alert />
        }
      </div>
    </div>

    )
  );
};

export default Modal;
