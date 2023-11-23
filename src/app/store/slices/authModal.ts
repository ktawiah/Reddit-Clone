import { createSlice } from "@reduxjs/toolkit";

const authModalSlice = createSlice({
  name: "Auth Modal",
  initialState: { isOpen: false },
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const authModalActions = authModalSlice.actions;

export default authModalSlice;
