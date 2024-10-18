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
  }),
});

export const { useGetAllCarsQuery, useAddCarMutation, useDeleteCarMutation } =
  carStoreApi;
