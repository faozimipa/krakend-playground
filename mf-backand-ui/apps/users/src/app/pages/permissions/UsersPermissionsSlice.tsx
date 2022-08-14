import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppRootState } from 'libs/store';
import UsersService from 'apps/users/src/app/UsersService';

export interface PermissionsInitState {
  isLoading: boolean;
  permissions: any;
  error: any;
}

export const getAll = createAsyncThunk(
  'permissions/getAll',
  async (_token, thunkAPI) => {
    try {
      const data = await UsersService.getAllPermissions();
      return {
        permissions: data,
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

const initialState: PermissionsInitState = {
  isLoading: false,
  permissions: [],
  error: null,
};

const UsersPermissionsSlice = createSlice({
  name: 'usersPermissions',
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
      state.permissions = action.payload.permissions.data;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(getAll.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAll.rejected, (state, action) => {
      state.permissions = [];
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { removeError, setLoading } = UsersPermissionsSlice.actions;
export const selectState = (state: AppRootState) => state.UsersPermissionsSlice;
const { reducer } = UsersPermissionsSlice;
export default reducer;
