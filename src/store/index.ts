import { configureStore } from '@reduxjs/toolkit';

import articleReducer from './articlesSlice';
import currentArticleReducer from './currentArticleSlice';

const store = configureStore({
  reducer: {
    article: articleReducer,
    currentArticle: currentArticleReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
