import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("fetchData", async () => {
  try {
    const response = await fetch(
      "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch inventory data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    return null;
  }
});
const inventoryData = createSlice({
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  name: "inventoryData",
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.map((item) => ({ ...item, visible: true }));
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isError = true;
      });
  },
  reducers: {
    toggleVisibility: (state, action) => {
      const selectedName = action.payload;
      const selectedItem = state?.data?.find(
        (item) => item.name === selectedName
      );
      if (selectedItem) {
        selectedItem.visible = !selectedItem.visible;
      }
    },

    update: (state, action) => {
      const { name, category, value, quantity, price } = action.payload;
      if (state.data) {
        const updatedData = state.data.map((item) =>
          item.name === name
            ? { ...item, category, value, quantity, price }
            : item
        );
        state.data = updatedData;
      }
    },

    remove: (state, action) => {
      const { name } = action.payload;
      if (state.data) {
        const updatedData = state.data?.filter((item) => item.name !== name);
        state.data = updatedData;
      }
    },
  },
});
export const { update, remove, toggleVisibility } = inventoryData.actions;
export default inventoryData.reducer;
