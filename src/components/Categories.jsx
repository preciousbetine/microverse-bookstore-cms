import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Book from '@/components/Book';
import Styles from '@/styles/Categories.module.scss';
import BookStyles from '@/styles/Home.module.scss';

function Categories() {
  const [currentCategory, setCategory] = useState(0);
  const { categories } = useSelector((store) => store.categories);
  const { books } = useSelector((store) => store.books);

  const allBooks = [...books]
    .filter(({ category }) => category === categories[currentCategory])
    .reverse()
    .map((book) => (
      <Book
        bookId={book.item_id}
        key={book.item_id}
        title={book.title}
        author={book.author}
        category={book.category}
        progress={book.progress}
        chapter={book.chapter}
        numChapters={book.numChapters}
        comments={book.comments}
      />
    ));

  return (
    <div className={Styles.categories}>
      <ul>
        {
          categories.map((category, index) => (
            <li key={category}>
              <button
                type="button"
                className={currentCategory === index ? Styles['selected-category'] : ''}
                onClick={() => setCategory(index)}
              >
                {category}
              </button>
            </li>
          ))
        }
      </ul>
      {
        (allBooks.length > 0) && (
          <div className={BookStyles.books}>
            {allBooks}
          </div>
        )
      }
      {
        (allBooks.length === 0) && (
          <div className={BookStyles['no-book']}>
            This category has no books
          </div>
        )
      }
    </div>
  );
}

export default Categories;
