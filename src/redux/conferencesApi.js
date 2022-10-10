import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const conferencesApi = createApi({
  reducerPath: 'conferencesApi',
  tagTypes: ['Conferences'],
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
      invalidatesTags: [{ type: 'Conferences', id: 'LIST' }],
    }),
    deleteConferences: build.mutation({
      query: (id) => ({
        url: `conferences/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Conferences', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetConferencesQuery,
  useAddConferenceMutation,
  useDeleteConferencesMutation,
} = conferencesApi;
