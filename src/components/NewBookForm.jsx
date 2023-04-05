import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '@/redux/books/booksSlice';
import Styles from '@/styles/NewBookForm.module.scss';

const NewBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Fiction');
  const { categories } = useSelector((store) => store.categories);
  const titleInput = React.createRef();

  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(addBook({
      title,
      author,
      category,
      comments: [],
    }));
    setTitle('');
    setAuthor('');
    setCategory('Fiction');
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
        <select
          className={Styles['category-select']}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {
            categories.map((category) => <option key={category}>{category}</option>)
          }
        </select>
        <button type="submit">ADD BOOK</button>
      </form>
    </div>
  );
};

export default NewBookForm;
