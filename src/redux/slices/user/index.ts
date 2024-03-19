import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  initialState: {
    mode: "admin",
  },
  name: "mode",

  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "admin" ? "user" : "admin";
    },
  },
});
export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
