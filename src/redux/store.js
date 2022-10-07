import { configureStore } from '@reduxjs/toolkit';
import { conferencesApi } from './conferencesApi';

export const store = configureStore({
  reducer: {
    [conferencesApi.reducerPath]: conferencesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(conferencesApi.middleware),
});
