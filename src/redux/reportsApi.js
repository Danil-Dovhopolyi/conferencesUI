import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
          url: `reports`,
          method: 'POST',
          body,
        };
      },
    }),
    deleteReport: build.mutation({
      query(id) {
        return {
          url: `reports/${id}`,
          method: 'DELETE',
        };
      },
    }),
    getReportById: build.query({
      query: (id) => `/reports/${id}`,
      headers: {
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
