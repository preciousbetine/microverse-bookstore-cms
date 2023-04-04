import React from 'react';
import { useSelector } from 'react-redux';
import Styles from '@/styles/Loader.module.scss';

const Loader = () => {
  const { loading } = useSelector((store) => store.books);
  return (
    <>
      { loading && (
        <div className={Styles.loader}>
          <div className={Styles.spinner} />
        </div>
      ) }
    </>
  );
};

export default Loader;
