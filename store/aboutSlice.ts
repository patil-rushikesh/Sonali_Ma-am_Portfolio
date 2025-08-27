import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { setExperience, setLoading } = aboutSlice.actions;
export default aboutSlice.reducer;
