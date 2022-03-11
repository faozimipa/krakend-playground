import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppRootState } from 'libs/store';
import UsersService from 'apps/users/src/app/UsersService';
import { Role } from '../../models/Role';

export interface RolesInitState {
  isLoading: boolean;
  roles: any;
  error: any;
}

export const getAll = createAsyncThunk(
  'roles/getAll',
  async (_token, thunkAPI) => {
    try {
      const data = await UsersService.getAllRoles();
      return {
        roles: data,
      };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState: RolesInitState = {
  isLoading: false,
  roles: [],
  error: null,
};

const UsersRolesSlice = createSlice({
  name: 'usersRoles',
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
      state.roles = action.payload.roles.data;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(getAll.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAll.rejected, (state, action) => {
      state.roles = [];
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { removeError, setLoading } = UsersRolesSlice.actions;
export const selectState = (state: AppRootState) => state.UsersRolesSlice;
const { reducer } = UsersRolesSlice;
export default reducer;
