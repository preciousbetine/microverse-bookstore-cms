import { useSelector } from 'react-redux';
import Book from '@/components/Book.jsx';
import NewBookForm from '@/components/NewBookForm';
import Error from '@/components/Error';
import Styles from '@/styles/Home.module.scss';

const Home = () => {
  const { books } = useSelector((store) => store.books);

  const allBooks = [...books].reverse().map((book) => (
    <Book
      bookId={book.item_id}
      key={book.item_id}
      title={book.title}
      author={book.author}
      category={book.category}
    />
  ));

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
