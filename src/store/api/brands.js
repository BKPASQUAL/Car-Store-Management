import api from "./api";

export const brandApi = api.injectEndpoints({
  reducerPath: "brandApi",

  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => "/brands",
    }),

    addBrand: builder.mutation({
      query: (data) => {
        return {
          url: "/brands",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetAllBrandsQuery, useAddBrandMutation } = brandApi;
