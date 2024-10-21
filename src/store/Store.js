import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import { authApi } from "./api/authApi";
import { carStoreApi } from "./api/carStore";
import { brandApi } from "./api/brands";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [carStoreApi.reducerPath]: carStoreApi.reducer,
    [brandApi.reducerPath]: carStoreApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      api.middleware,
      authApi.middleware,
      carStoreApi.middleware,
      brandApi.middleware
    );
  },
});
