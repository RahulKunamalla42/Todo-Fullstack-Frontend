import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice"
import { authApi } from "./services/authApi";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]:authApi.reducer,
  },
  middleware: (mw) => mw().concat(authApi.middleware)
})