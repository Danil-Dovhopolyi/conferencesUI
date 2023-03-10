import { configureStore } from '@reduxjs/toolkit';
import { conferencesApi } from './conferencesApi';
import { default as reducer, actions } from 'redux-csrf';

export const store = configureStore({
  reducer: {
    [conferencesApi.reducerPath]: conferencesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(conferencesApi.middleware),
});
