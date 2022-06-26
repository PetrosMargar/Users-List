import { configureStore } from '@reduxjs/toolkit';
import usersListReducer from './usersListSlice';

export const store = configureStore({
  reducer: {
    usersList: usersListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
