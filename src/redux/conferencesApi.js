import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const conferencesApi = createApi({
  reducerPath: 'conferencesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  endpoints: (build) => ({
    getConferences: build.query({
      query: () => 'conferences',
    }),
    addConference: build.mutation({
      query: (body) => ({
        url: 'conferences',
        merthod: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetConferencesQuery, useAddConferenceMutation } =
  conferencesApi;
