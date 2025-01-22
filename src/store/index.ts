import { configureStore } from '@reduxjs/toolkit';

import articleReducer from './articlesSlice';
import currentArticleReducer from './currentArticleSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    article: articleReducer,
    currentArticle: currentArticleReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
