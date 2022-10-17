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
      query(body) {
        return {
          url: `conferences`,
          method: 'POST',
          body,
        };
      },
    }),
    deleteConference: build.mutation({
      query(id) {
        return {
          url: `conferences/${id}`,
          method: 'DELETE',
        };
      },
    }),
    getConferenceById: build.query({
      query: (id) => `/conferences/${id}`,
    }),
    updateConference: build.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `conferences/${id}`,
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});

export const {
  useGetConferencesQuery,
  useAddConferenceMutation,
  useDeleteConferenceMutation,
  useGetConferenceByIdQuery,
  useUpdateConferenceMutation,
} = conferencesApi;
