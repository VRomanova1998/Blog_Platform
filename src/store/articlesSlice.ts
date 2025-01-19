import { createSlice } from '@reduxjs/toolkit';

import { getArticlesList } from '../helper';
import { Article } from '../types/type';

type InitialState = {
  articles: Article[];
  loading: boolean;
  error: boolean;
  currentPage: number;
  summaryPages: number;
};

const initialState: InitialState = {
  articles: [],
  loading: false,
  error: false,
  currentPage: 1,
  summaryPages: 1,
};

const articlesData = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changePage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticlesList.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getArticlesList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.articles = action.payload.articles;
        state.summaryPages = action.payload.articlesCount / 5;
      })
      .addCase(getArticlesList.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default articlesData.reducer;

export const { changePage } = articlesData.actions;
