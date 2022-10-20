import { configureStore } from '@reduxjs/toolkit';
import { conferencesApi } from './conferencesApi';
import { reportsApi } from './reportsApi';

export const store = configureStore({
  reducer: {
    [conferencesApi.reducerPath]: conferencesApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      conferencesApi.middleware,
      reportsApi.middleware
    ),
});
