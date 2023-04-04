import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Book from '@/components/Book.jsx';
import NewBookForm from '@/components/NewBookForm';
import Error from '@/components/Error';
import Styles from '@/styles/Home.module.scss';
import { fetchBooks } from '@/redux/books/booksSlice';

const Home = () => {
  const { books } = useSelector((store) => store.books);
  const dispatch = useDispatch();

  const allBooks = [...books].reverse().map((book) => (
    <Book
      bookId={book.item_id}
      key={book.item_id}
      title={book.title}
      author={book.author}
      category={book.category}
    />
  ));

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <>
      <Error />
      {
        (allBooks.length > 0) && (
          <div className={Styles.books}>
            {allBooks}
          </div>
        )
      }
      {
        (allBooks.length === 0) && (
          <div className={Styles['no-book']}>
            No book available
          </div>
        )
      }
      <NewBookForm />
    </>
  );
};

export default Home;
