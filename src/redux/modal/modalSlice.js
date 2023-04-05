import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showing: false,
  message: 'Message',
  book: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    hideModal: (state) => ({
      ...state,
      showing: !state.showing,
    }),
    showMessage: (state, { payload }) => ({
      ...state,
      message: payload,
      showing: true,
    }),
    updateChapter: (state, { payload }) => ({
      ...state,
      showing: true,
      message: 'update',
      book: payload,
    }),
    comment: (state, { payload }) => ({
      ...state,
      showing: true,
      message: 'comment',
      book: payload,
    }),
    showFeatures: (state) => ({
      ...state,
      message: 'features',
      showing: true,
    }),
  },
});

export const {
  hideModal,
  showMessage,
  updateChapter,
  showFeatures,
  comment,
} = modalSlice.actions;
export default modalSlice.reducer;
