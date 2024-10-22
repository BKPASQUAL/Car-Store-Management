import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.champikahardware.online/',
        // baseUrl: 'http://localhost:4003/',

        prepareHeaders: (headers) => {
            const accessToken = localStorage.getItem('accessToken'); 
            // console.log("hello "+accessToken)         
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`)
            }
            return headers;
        }
    }),
    endpoints: () => ({}),
});

export default api;
