import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface LearningResource {
  _id: string;
  title: string;
  description: string;
  type: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

interface LearningResourcesState {
  items: LearningResource[];
  loading: boolean;
}

const initialState: LearningResourcesState = {
  items: [],
  loading: false,
};

// Async thunk to fetch learning resources
export const getResources = createAsyncThunk(
  "learningResources/getResources",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/learning-resources");
      const data = await res.json();
      return data.data as LearningResource[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const learningResourcesSlice = createSlice({
  name: "learningResources",
  initialState,
  reducers: {
    setResources(state, action: PayloadAction<LearningResource[]>) {
      state.items = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResources.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getResources.fulfilled,
        (state, action: PayloadAction<LearningResource[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(getResources.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setResources, setLoading } = learningResourcesSlice.actions;
export default learningResourcesSlice.reducer;
