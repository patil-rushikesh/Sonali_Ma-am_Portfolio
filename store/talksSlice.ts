import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Talk {
  _id: string;
  name: string;
  description: string;
  referenceLink: string;
  image: { url: string; publicId: string };
  createdAt: string;
  updatedAt: string;
}

interface TalksState {
  items: Talk[];
  loading: boolean;
}

const initialState: TalksState = {
  items: [],
  loading: false,
};

const talksSlice = createSlice({
  name: "talks",
  initialState,
  reducers: {
    setTalks(state, action: PayloadAction<Talk[]>) {
      state.items = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setTalks, setLoading } = talksSlice.actions;
export default talksSlice.reducer;
