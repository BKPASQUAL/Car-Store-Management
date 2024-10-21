import api from "./api";

export const inquiriesApi = api.injectEndpoints({
  reducerPath: "inquiriesApi",

  endpoints: (builder) => ({
    getAllinquiries: builder.query({
      query: () => "/inquiries",
    }),

    markAsResponse: builder.mutation({
      query: ({ id }) => {
        return {
          url: `inquiries/${id}/response`,
          method: "PATCH",
        };
      },
    }),
  }),
});

export const { useGetAllinquiriesQuery, useMarkAsResponseMutation } =
  inquiriesApi;
