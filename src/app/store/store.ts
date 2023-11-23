import { configureStore } from "@reduxjs/toolkit";
import authModalSlice from "./slices/authModal";
import { type } from "os";

const store = configureStore({
  reducer: {
    authModal: authModalSlice.reducer,
  },
});

export default store;

export type RooState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
