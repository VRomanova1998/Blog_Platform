import { createSlice } from '@reduxjs/toolkit';

import { getUserProfile } from '../helper';

type InitialState = {
  userProfile: {
    username?: string;
    bio?: string;
    image?: string;
    following?: boolean;
  };
  loading: boolean;
  error: boolean;
  isLogin: boolean | null;
};

const initialState: InitialState = {
  userProfile: {},
  loading: false,
  error: false,
  isLogin: null,
};

const userLogIn = createSlice({
  name: 'userLogIn',
  initialState,
  reducers: {
    logOut(state) {
      state.userProfile = {};
      state.isLogin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userProfile = action.payload;
        state.isLogin = true;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.isLogin = false;
      });
  },
});

export default userLogIn.reducer;

export const { logOut } = userLogIn.actions;
