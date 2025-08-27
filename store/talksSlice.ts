import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

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

// Async thunk to fetch talks
export const getTalks = createAsyncThunk(
  "talks/getTalks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/talks");
      const data = await res.json();
      return data.data as Talk[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(getTalks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTalks.fulfilled, (state, action: PayloadAction<Talk[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getTalks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setTalks, setLoading } = talksSlice.actions;
export default talksSlice.reducer;
