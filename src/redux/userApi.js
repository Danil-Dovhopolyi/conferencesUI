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
export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),

  endpoints: (build) => ({
    getCurrentUser: build.query({
      query() {
        return {
          url: `/user`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    updateUser: build.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/profile/${id}`,
          method: 'PUT',
          body,
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        };
      },
    }),
  }),
});

export const { useUpdateUserMutation, useGetCurrentUserQuery } = userApi;
