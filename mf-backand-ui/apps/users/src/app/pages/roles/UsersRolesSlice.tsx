import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppRootState } from 'libs/store';
import UsersService from 'apps/users/src/app/UsersService';
import { Role } from '../../models/Role';

export interface RolesInitState {
  isLoading: boolean;
  roles: any;
  permissions: any;
  error: any;
}

export const getAll = createAsyncThunk(
  'roles/getAllRolesAndPermissions',
  async (_token, thunkAPI) => {
    try {
      const data = await UsersService.getAllRolesAndPermissions();
      return {
        rolesAndPermissions: data,
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
  permissions: [],
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
    stopLoading: (state) => {
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.roles = action.payload.rolesAndPermissions.data.roles;
      state.permissions = action.payload.rolesAndPermissions.data.permissions;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(getAll.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAll.rejected, (state, action) => {
      state.roles = [];
      state.permissions = [];
      state.error = action.payload;
      state.isLoading = false;
    });

  },
});

export const { removeError, setLoading, stopLoading } = UsersRolesSlice.actions;
export const rolesSelectState = (state: AppRootState) => state.UsersRolesSlice;
const { reducer } = UsersRolesSlice;
export default reducer;
