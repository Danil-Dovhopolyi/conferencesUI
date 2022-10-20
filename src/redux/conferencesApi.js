import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const conferencesApi = createApi({
  reducerPath: 'conferencesApi',
  tagTypes: ['Conferences'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().token;
    console.log(token);

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
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
          headers: {},
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
      headers: {
        'Content-Type': 'application/json',
      },
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
