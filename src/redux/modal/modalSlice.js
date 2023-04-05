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
    })
    ,
  },
});

export const { hideModal, showMessage, updateChapter } = modalSlice.actions;
export default modalSlice.reducer;
