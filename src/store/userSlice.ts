import { createSlice } from '@reduxjs/toolkit';

import { get, getUserProfile, registerUser, updateCurrentUser } from '../helper';

type InitialState = {
  userProfile: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
    email: string;
    token: string;
  };
  loading: boolean;
  error: boolean;
  isLogin: boolean | null;
  errorMessage: string | null;
};

const initialState: InitialState = {
  userProfile: { username: '', bio: '', image: '', following: false, email: '', token: '' },
  loading: false,
  error: false,
  isLogin: null,
  errorMessage: '',
};

const userLogIn = createSlice({
  name: 'userLogIn',
  initialState,
  reducers: {
    logOut(state) {
      state.userProfile = { username: '', bio: '', image: '', following: false, email: '', token: '' };
      state.isLogin = false;
      localStorage.clear();
    },
    clearError(state) {
      state.error = false;
      state.errorMessage = '';
      // if (state.userProfile.errors?.username) {
      //   state.userProfile.errors.username = false;
      // }
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
    builder
      .addCase(get.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(get.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.error = false;
        state.userProfile = {
          ...state.userProfile,
          username: action.payload.username,
          image: action.payload.image,
          bio: action.payload.bio,
          email: action.payload.email,
        };
        state.isLogin = true;
      })
      .addCase(get.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.isLogin = false;
      });
    builder
      .addCase(updateCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userProfile = {
          ...state.userProfile,
          username: action.payload.username,
          image: action.payload.image,
          bio: action.payload.bio,
          email: action.payload.email,
        };
        // state.userProfile = { ...action.payload };
        state.isLogin = true;
      })
      .addCase(updateCurrentUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
        //state.isLogin = false;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userProfile = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
        state.isLogin = false;
        if (action.error.message) {
          state.errorMessage = action.error.message;
        }

        // if (state.userProfile.errors?.username) {
        //   state.userProfile.errors.username = true;
        // }
      });
  },
});

export default userLogIn.reducer;

export const { logOut, clearError } = userLogIn.actions;

// type InitialState = {
//   userProfile: {
//     username?: string;
//     bio?: string;
//     image?: string;
//     following?: boolean;
//     email?: string;
//     token?: string;
//   };
//   loading: boolean;
//   error: boolean;
//   isLogin: boolean | null;
// };

// const initialState: InitialState = {
//   userProfile: JSON.parse(localStorage.getItem('user')) || {},
//   // userProfile: {},
//   loading: false,
//   error: false,
//   isLogin: localStorage.getItem('user') ? true : false,
//   // isLogin: null,
// };

// const userLogIn = createSlice({
//   name: 'userLogIn',
//   initialState,
//   reducers: {
//     logOut(state) {
//       state.userProfile = {};
//       localStorage.removeItem('user');
//       state.isLogin = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = false;
//       })
//       .addCase(getUserProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = false;
//         // state.userProfile = {
//         //   ...state.userProfile,
//         //   ...action.payload,
//         // };
//         state.userProfile = action.payload;
//         state.isLogin = localStorage.getItem('user') ? true : false;
//         // state.isLogin = true;
//       })
//       .addCase(getUserProfile.rejected, (state) => {
//         state.loading = false;
//         state.error = true;
//         state.isLogin = false;
//       });
//     builder
//       .addCase(get.pending, (state) => {
//         state.loading = true;
//         state.error = false;
//       })
//       .addCase(get.fulfilled, (state, action) => {
//         console.log(action.payload);
//         state.loading = false;
//         state.error = false;
//         state.userProfile = {
//           ...state.userProfile,
//           username: action.payload.username,
//           image: action.payload.image,
//           bio: action.payload.bio,
//           email: action.payload.email,
//         };
//         state.isLogin = localStorage.getItem('user') ? true : false;
//         // state.isLogin = true;
//       })
//       .addCase(get.rejected, (state) => {
//         state.loading = false;
//         state.error = true;
//         // state.isLogin = false;
//       });
//     builder
//       .addCase(updateCurrentUser.pending, (state) => {
//         state.loading = true;
//         state.error = false;
//       })
//       .addCase(updateCurrentUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = false;
//         state.userProfile = {
//           ...state.userProfile,
//           username: action.payload.username,
//           image: action.payload.image,
//           bio: action.payload.bio,
//           email: action.payload.email,
//         };
//         // state.userProfile = { ...action.payload };
//         state.isLogin = localStorage.getItem('user') ? true : false;
//         // state.isLogin = true;
//       })
//       .addCase(updateCurrentUser.rejected, (state) => {
//         state.loading = false;
//         state.error = true;
//         // state.isLogin = false;
//       });
//   },
// });

// export default userLogIn.reducer;

// export const { logOut } = userLogIn.actions;
