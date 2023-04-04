import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showing: false,
  message: 'Message',
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
  },
});

export const { hideModal, showMessage } = modalSlice.actions;
export default modalSlice.reducer;
