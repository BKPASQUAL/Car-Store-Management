import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Set up the base URL for development and production
const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? 'https://3.104.75.209:4002'  // Use full backend URL in production
  : '/api'; // Proxy baseUrl in development

// Initialize API service with base URL
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl, // Dynamic base URL based on environment
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;
