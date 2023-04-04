import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from '@/redux/modal/modalSlice';
import Styles from '@/styles/Categories.module.scss';
import { checkStatus } from '@/redux/categories/categoriesSlice';

function Categories() {
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.categories);

  return (
    <div className={Styles.categories}>
      <button
        type="button"
        onClick={() => {
          dispatch(checkStatus());
          dispatch(showMessage(status));
        }}
      >
        Check status
      </button>
    </div>
  );
}

export default Categories;
