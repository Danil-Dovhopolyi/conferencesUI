import { configureStore } from '@reduxjs/toolkit';
import { conferencesApi } from './conferencesApi';
import { reportsApi } from './reportsApi';
import { userApi } from './userApi';

export const store = configureStore({
  reducer: {
    [conferencesApi.reducerPath]: conferencesApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      conferencesApi.middleware,
      reportsApi.middleware,
      userApi.middleware
    ),
});
