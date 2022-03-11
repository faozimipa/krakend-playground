import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppRootState } from 'libs/store';
import UsersService from './UsersService';

export interface InitState {
  isLoading: boolean;
  users: any;
  error: any;
}

export const getAll = createAsyncThunk(
  'usersData/getAll', 
async (_token,thunkAPI) => {
  try {
    const data = await UsersService.getAll();
    return {
      users: data,
    };
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState: InitState = {
  isLoading: false,
  users: [],
  error: null,
};

const UsersDataSlice = createSlice({
  name: 'usersData',
  initialState,
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.users = action.payload.users.data;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(getAll.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAll.rejected, (state, action) => {
      state.users = [];
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { removeError, setLoading } = UsersDataSlice.actions;
export const selectState = (state: AppRootState) => state.UsersDataSlice;
const { reducer } = UsersDataSlice;
export default reducer;
