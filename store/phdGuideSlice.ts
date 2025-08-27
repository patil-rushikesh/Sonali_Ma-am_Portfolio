import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface PhdGuide {
  _id: string;
  supervisor: string;
  researchCenter: string;
  title: string;
  researchScholar: string;
  result: string;
  declaration: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface PhdGuideState {
  items: PhdGuide[];
  loading: boolean;
}

const initialState: PhdGuideState = {
  items: [],
  loading: false,
};

// Async thunk to fetch guides
export const getGuides = createAsyncThunk(
  "phdGuide/getGuides",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/phd-guide");
      const data = await res.json();
      return data.data as PhdGuide[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const phdGuideSlice = createSlice({
  name: "phdGuide",
  initialState,
  reducers: {
    setGuides(state, action: PayloadAction<PhdGuide[]>) {
      state.items = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGuides.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getGuides.fulfilled,
        (state, action: PayloadAction<PhdGuide[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(getGuides.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setGuides, setLoading } = phdGuideSlice.actions;
export default phdGuideSlice.reducer;
