import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Initialize an API service with the correct baseUrl for the proxy
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', // Proxy through Vite for development

    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    }
  }),
  endpoints: () => ({}),
});

export default api;
