import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface UsersListState {
  data: any[];
  selectedUserIds: number[];
}

const initialState: UsersListState = {
  data: [],
  selectedUserIds: [],
};

export const usersListSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload;
    },
    addUser: (state, action) => {
      state.data.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const index = state.data.findIndex((user) => user.id === action.payload.id);
      state.data[index] = { ...state.data[index], ...action.payload };
    },
    setSelectedUserIds: (state, action) => {
      state.selectedUserIds = action.payload;
    }
  },
}
)

export const { setUsers, addUser, deleteUser, updateUser, setSelectedUserIds } = usersListSlice.actions;

export const selectUserList = (state: RootState) => state.usersList.data;
export const selectedUserIds = (state: RootState) => state.usersList.selectedUserIds;


export default usersListSlice.reducer;
