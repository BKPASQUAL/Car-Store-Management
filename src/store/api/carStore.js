import api from "./api";

export const carStoreApi = api.injectEndpoints({
  reducerPath: "carStoreApi",

  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => "/cars",
    }),
  }),
});

export const { useGetAllCarsQuery } = carStoreApi;
