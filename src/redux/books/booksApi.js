import axios from 'axios';

const appId = 'Q6jTtNnXCj37PkCXFZZe';
const apiBase = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi';

const getNextItemID = (books) => {
  // generate number of chapters - a book can have chapters 10 - 60
  const numChapters = Math.floor(Math.random() * (51)) + 10;

  // This function generates the id for a new book to be added
  if (books.length) {
    const lastBookId = books.slice(-1)[0].item_id.split('_')[0];
    const lastBookIndex = Number(lastBookId.substr(4));
    return `item${lastBookIndex + 1}_0_${numChapters}`;
  }
  return `item1_0_${numChapters}`;
};

export const getBooksFromAPI = async () => {
  const resp = await axios(`${apiBase}/apps/${appId}/books`);

  // Flatten the received array and sort it
  const books = Object.entries(resp.data)
    .map((entry) => ({
      item_id: entry[0].split('_')[0],
      author: entry[1][0].author,
      title: entry[1][0].title,
      category: entry[1][0].category,
      // progress: current_chapter / num_chapters * 100
      progress: Math.max((Number(entry[0].split('_')[1]) / Number(entry[0].split('_')[2])) * 100),
      chapter: Number(entry[0].split('_')[1]),
    }))
    .sort((a, b) => a.item_id.localeCompare(b.item_id, 'en', { numeric: true }));

  console.log(books);
  return books;
};

export const addBookAtAPI = async (bookInfo, books) => {
  const resp = await axios.post(
    `${apiBase}/apps/${appId}/books`,
    {
      item_id: getNextItemID(books),
      ...bookInfo,
    },
  );
  return resp.data;
};

export const deleteBookAtAPI = async (bookId) => {
  const resp = await axios.delete(`${apiBase}/apps/${appId}/books/${bookId}`);
  return resp.data;
};
