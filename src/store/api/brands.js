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

    getBrandById: builder.query({
      query: (brandId) => `/brands/${brandId}`,
    }),

    updatebrand: builder.mutation({
        query: ({ id, inputData }) => {
          return {
            url: `brands/${id}`,
            method: "PATCH",
            body: inputData,
          };
        },
      })
  }),
});

export const {
  useGetAllBrandsQuery,
  useAddBrandMutation,
  useGetBrandByIdQuery,
  useUpdatebrandMutation
} = brandApi;
