import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', // Proxy baseUrl for development
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
