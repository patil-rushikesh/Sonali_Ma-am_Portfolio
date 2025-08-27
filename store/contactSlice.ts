import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactState {
  mapLoading: boolean;
}

const initialState: ContactState = {
  mapLoading: true,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.mapLoading = action.payload;
    },
  },
});

export const { setLoading } = contactSlice.actions;
export default contactSlice.reducer;
