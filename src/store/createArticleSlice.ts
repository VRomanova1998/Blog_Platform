import { createSlice } from '@reduxjs/toolkit';

import { Article } from '../types/type';

type InitialState = {
  createdArticle: Article;
  loading: boolean;
  error: boolean;
};

const initialState: InitialState = {
  createdArticle: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [''],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  },
  loading: false,
  error: false,
};

const createArticle = createSlice({
  name: 'currentArticle',
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(createArticle.pending, (state) => {
  //         state.loading = true;
  //         state.error = false;
  //       })
  //       .addCase(createArticle.fulfilled, (state, action) => {
  //         state.loading = false;
  //         state.error = false;
  //         state.currentArticle = action.payload.article;
  //       })
  //       .addCase(createArticle.rejected, (state) => {
  //         state.loading = false;
  //         state.error = true;
  //       });
  //   },
});

export default createArticle.reducer;
