import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    'Fiction',
    'Non-fiction',
    'Poetry',
    'Drama',
    'Biography',
    'History',
    'Business and economics',
    'Self help',
    'Philosophy',
  ],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
  },
});

export default categoriesSlice.reducer;
