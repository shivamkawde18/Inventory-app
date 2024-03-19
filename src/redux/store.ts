import { configureStore } from "@reduxjs/toolkit";
import inventoryData from "./slices/inventoryData";
import modeSlice from "./slices/user";

export const store = configureStore({
  reducer: {
    inventoryData: inventoryData,
    mode: modeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
