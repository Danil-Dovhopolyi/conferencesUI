import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
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
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
            'Content-Type': 'application/json',
          },
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
