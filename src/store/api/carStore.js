import api from "./api";

export const carStoreApi = api.injectEndpoints({
  reducerPath: "carStoreApi",

  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => "/cars",
    }),

    addCar: builder.mutation({
      query: (data) => {
        return {
          url: "/cars",
          method: "POST",
          body: data,
        };
      },
    }),

    deleteCar: builder.mutation({
      query: (vehicleId) => ({
        url: `cars/${vehicleId}`,
        method: "DELETE",
      }),
    }),

    getCardataById: builder.query({
      query: (vehicleId) => `cars/${vehicleId}`,
    }),

    updateCar: builder.mutation({
      query: ({ id, inputData }) => {
        return {
          url: `cars/${id}`,
          method: "PATCH",
          body: inputData,
        };
      },
    }),

    getCarsCount: builder.query({
      query: () => "/cars/brandsCarCount",
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useAddCarMutation,
  useDeleteCarMutation,
  useGetCardataByIdQuery,
  useUpdateCarMutation,
  useGetCarsCountQuery,
} = carStoreApi;
