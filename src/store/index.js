import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import todoReducer from "./slices/todoSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only auth will be persisted
};

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer, // Add the todos reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
