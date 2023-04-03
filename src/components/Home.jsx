import { useSelector } from 'react-redux';
import Book from '@/components/Book.jsx';
import NewBookForm from '@/components/NewBookForm';
import Styles from '@/styles/Home.module.scss';

const Home = () => {
  const { books } = useSelector((store) => store.books);

  const allBooks = books.map((book) => (
    <Book
      bookId={book.item_id}
      key={book.item_id}
      title={book.title}
      author={book.author}
    />
  ));

  return (
    <>
      <div className={Styles.books}>
        {allBooks}
      </div>
      <NewBookForm />
    </>
  );
};

export default Home;
