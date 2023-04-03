import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '@/redux/books/booksSlice';
import Styles from '@/styles/NewBookForm.module.scss';

const NewBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const titleInput = React.createRef();

  const { defaultCategory } = useSelector((store) => store.books);
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(addBook({
      title,
      author,
      category: defaultCategory,
    }));
    setTitle('');
    setAuthor('');
    titleInput.current.focus();
  };

  return (
    <div className={Styles['book-form-container']}>
      <h2>ADD NEW BOOK</h2>
      <form onSubmit={submitForm}>
        <input
          ref={titleInput}
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={Styles['title-input']}
          required
        />
        <input
          placeholder="Book author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={Styles['author-input']}
          required
        />
        <button type="submit">ADD BOOK</button>
      </form>
    </div>
  );
};

export default NewBookForm;
