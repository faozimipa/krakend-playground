import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppRootState } from 'libs/store';

import AuthService from 'libs/services/authService';
const dataUser = localStorage.getItem('user');
const user = dataUser ? JSON.parse(dataUser) : null;
export interface Credential {
  email: string;
  password: string;
}

export interface InitState {
  isLoggedIn: boolean;
  userRoles: Array<String>;
  userPermissions: Array<String>;
  isLoading: boolean;
  user: any;
  error: any;
}
export interface MyError {
  message: string;
  status: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async (credential: Credential, thunkAPI) => {
    try {
      const data = await AuthService.login(
        credential.email,
        credential.password
      );
      return { user: data.user, userRoles: data.roles, userPermissions:data.permissions };
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

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout();
});

export const removeErrorData = createAsyncThunk(
  'auth/removeerror',
  async () => {
    return true;
  }
);

// let initialState: InitState;

const initialState: InitState = user
  ? {
      isLoggedIn: false,
      userRoles: [],
      userPermissions: [],
      isLoading: false,
      user: user,
      error: null,
    }
  : {
      isLoggedIn: false,
      userRoles: [],
      userPermissions: [],
      isLoading: false,
      user: null,
      error: null,
    };

const authSlice = createSlice({
  name: 'auth',
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
    builder.addCase(login.fulfilled, (state, action) => {
      state.userRoles = action.payload.userRoles;
      state.userPermissions = action.payload.userPermissions;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(removeErrorData.fulfilled, (state) => {
      state.error = null;
      state.isLoading = false;
    });
  },
});

export const { removeError, setLoading } = authSlice.actions;
export const selectState = (state: AppRootState) => state.authReducer;
const { reducer } = authSlice;
export default reducer;
