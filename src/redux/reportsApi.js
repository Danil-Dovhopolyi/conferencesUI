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
export const reportsApi = createApi({
  reducerPath: 'reportsApi',
  tagTypes: ['Reports'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),

  endpoints: (build) => ({
    getReports: build.query({
      query: () => '/reports',
    }),
    addReport: build.mutation({
      query(body) {
        return {
          url: `/reports`,
          method: 'POST',
          body,
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    deleteReport: build.mutation({
      query(id) {
        return {
          url: `reports/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    getReportById: build.query({
      query: (id) => `/reports/${id}`,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
        'Content-Type': 'application/json',
      },
    }),
    updateReport: build.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `reports/${id}`,
          method: 'PUT',
          body,
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
            'Content-Type': 'application/json',
          },
        };
      },
    }),
  }),
});

export const {
  useAddReportMutation,
  useDeleteReportMutation,
  useGetReportByIdQuery,
  useGetReportsQuery,
  useUpdateReportMutation,
} = reportsApi;
