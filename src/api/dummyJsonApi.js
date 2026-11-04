import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const MOCK_API_BASE_URL = 'https://6ae9ba063d3dd3d37be58cb7.mockapi.io/api/v1';

export const dummyJsonApi = createApi({
  reducerPath: 'dummyApiJSON',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  tagTypes: ['Projects'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: credentials,
      }),
    }),
    getProjects: builder.query({
      query: () => `${MOCK_API_BASE_URL}/plots`,
      providesTags: ['Projects'],
    }),
    getProjectById: builder.query({
      query: (id) => `${MOCK_API_BASE_URL}/plots/${id}`
    })
  })
});

export const {
  useLoginMutation,
  useGetProjectsQuery,
  useGetProjectByIdQuery
} = dummyJsonApi;