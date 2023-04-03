import axios from 'axios';

const appId = 'Q6jTtNnXCj37PkCXFZZe';
const apiBase = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi';

const getNextItemID = (books) => {
  // This function generates the id for a new book to be added
  if (books.length) {
    const lastBookId = books.slice(-1)[0].item_id;
    const lastBookIndex = Number(lastBookId.substr(4));
    return `item${lastBookIndex + 1}`;
  }
  return 'item1';
};

export const getBooksFromAPI = async () => {
  const resp = await axios(`${apiBase}/apps/${appId}/books`);
  const books = Object.entries(resp.data)
    .map((entry) => ({
      item_id: entry[0],
      author: entry[1][0].author,
      title: entry[1][0].title,
      category: entry[1][0].category,
    }))
    .sort((a, b) => a.item_id.localeCompare(b.item_id, 'en', { numeric: true }));

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
