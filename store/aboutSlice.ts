import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface ExperienceItem {
  _id?: string;
  position: string;
  shortDescription?: string;
  description?: string;
  startMonth?: number;
  startYear?: number;
  endMonth?: number;
  endYear?: number;
  currentlyWorking?: boolean;
}

interface AboutState {
  experience: ExperienceItem[] | null;
  loading: boolean;
}

const initialState: AboutState = {
  experience: null,
  loading: false,
};

// Async thunk to fetch experience from /api/getExperience
export const getExperience = createAsyncThunk(
  "about/getExperience",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/getExperience");
      const data = await res.json();
      return data.data as ExperienceItem[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setExperience(state, action: PayloadAction<ExperienceItem[]>) {
      state.experience = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getExperience.fulfilled,
        (state, action: PayloadAction<ExperienceItem[]>) => {
          state.experience = action.payload;
          state.loading = false;
        }
      )
      .addCase(getExperience.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setExperience, setLoading } = aboutSlice.actions;
export default aboutSlice.reducer;
