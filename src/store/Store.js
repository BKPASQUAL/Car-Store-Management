import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import { authApi } from "./api/authApi";
import { carStoreApi } from "./api/carStore";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [carStoreApi.reducerPath]: carStoreApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      api.middleware,
      authApi.middleware,
      carStoreApi.middleware
    );
  },
});
