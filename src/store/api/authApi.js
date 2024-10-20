import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use the same dynamic baseUrl for development and production
const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? 'https://3.104.75.209:4002'  // Use full backend URL in production
  : '/api'; // Proxy baseUrl in development

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl, // Dynamic base URL based on environment
  }),

  reducerPath: "authApi",
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data) => ({
        url: 'user/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
