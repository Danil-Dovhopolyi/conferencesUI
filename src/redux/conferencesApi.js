import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const conferencesApi = createApi({
  reducerPath: 'conferencesApi',
  tagTypes: ['Conferences'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),

  endpoints: (build) => ({
    getConferences: build.query({
      query: () => '/conferences',
    }),
    addConference: build.mutation({
      query: (body) => ({
        url: 'conferences',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Conferences', id: 'LIST' }],
    }),
    deleteConferences: build.mutation({
      query: (id) => ({
        url: `conferences/${id}`,
        method: 'DELETE',
        headers: {},
      }),
      invalidatesTags: [{ type: 'Conferences', id: 'LIST' }],
    }),
    getConferenceById: build.query({
      query: (id) => `/conferences/${id}`,
    }),
    updateConference: build.mutation({
      query: (id, body) => ({
        url: `conferences/${id}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useGetConferencesQuery,
  useAddConferenceMutation,
  useDeleteConferencesMutation,
  useGetConferenceByIdQuery,
  useUpdateConferenceMutation,
} = conferencesApi;
