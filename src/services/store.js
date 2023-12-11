import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import userSlice from "./Toolkit/user.slice";

const persistConfig = {
  key: "otherRoot",
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    users: userPersistedReducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
