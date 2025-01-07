import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import todoReducer from "./slices/todoSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

const todoPersistConfig = {
  key: "todos",
  storage,
  whitelist: ["todos"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    todos: persistReducer(todoPersistConfig, todoReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
