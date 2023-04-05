import React from 'react';
import { useSelector } from 'react-redux';
import Features from '@/components/Features';
import Comment from '@/components/Comment';
import Alert from '@/components/Alert';
import UpdateChapter from './UpdateChapter';

const Modal = () => {
  const { showing, message } = useSelector((store) => store.modal);

  if (message === 'update' && showing) {
    return (
      <UpdateChapter />
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
