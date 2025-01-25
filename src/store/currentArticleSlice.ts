import { createSlice } from '@reduxjs/toolkit';

import { getOneArticle } from '../helper';
import { Article } from '../types/type';

type InitialState = {
  currentArticle: Article;
  loading: boolean;
  error: boolean;
};

const initialState: InitialState = {
  currentArticle: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
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
    isFullArticle: true,
  },
  loading: false,
  error: false,
};

const currentArticle = createSlice({
  name: 'currentArticle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOneArticle.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getOneArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.currentArticle = action.payload.article;
      })
      .addCase(getOneArticle.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default currentArticle.reducer;
