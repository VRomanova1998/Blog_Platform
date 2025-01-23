import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import articleReducer from './articlesSlice';
import currentArticleReducer from './currentArticleSlice';
import userReducer from './userSlice';
import createArticlesReduser from './createArticleSlice';

const rootReducer = combineReducers({
  article: articleReducer,
  currentArticle: currentArticleReducer,
  user: userReducer,
  createArticle: createArticlesReduser,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// //import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// // import storage from 'redux-persist/lib/storage';

// import articleReducer from './articlesSlice';
// import currentArticleReducer from './currentArticleSlice';
// import userReducer from './userSlice';

// // const rootReducer = combineReducers({
// //   article: articleReducer,
// //   currentArticle: currentArticleReducer,
// //   user: userReducer,
// // });
// // const persistConfig = {
// //   key: 'root',
// //   storage,
// // };

// // const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = configureStore({
//   reducer: {
//     article: articleReducer,
//     currentArticle: currentArticleReducer,
//     user: userReducer,
//   },
//   //persistedReducer,
//   // middleware: (getDefaultMiddleware) =>
//   //   getDefaultMiddleware({
//   //     serializableCheck: {
//   //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//   //     },
//   //   }),
//   //
//   // },
// });

// export default store;

// // export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
