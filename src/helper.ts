import { createAsyncThunk } from '@reduxjs/toolkit';

export const getArticlesList = createAsyncThunk('articles/articlesList', async (currentPage: number) => {
  try {
    const offset = 5 * (currentPage - 1);
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/?limit=5&offset=${offset}`);
    const json = await response.json();
    return json;
  } catch (err) {
    return Promise.reject(err);
  }
});

export const getOneArticle = createAsyncThunk('currentArticle/article', async (id?: string) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${id}`);
    const json = await response.json();
    return json;
  } catch (err) {
    return Promise.reject(err);
  }
});
