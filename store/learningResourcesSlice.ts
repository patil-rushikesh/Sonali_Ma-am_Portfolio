import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { setResources, setLoading } = learningResourcesSlice.actions;
export default learningResourcesSlice.reducer;
