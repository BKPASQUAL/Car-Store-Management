import api from "./api";

export const brandApi = api.injectEndpoints({
  reducerPath: "brandApi",

  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => "/brands",
    }),
  }),
});

export const { useGetAllBrandsQuery } = brandApi;
