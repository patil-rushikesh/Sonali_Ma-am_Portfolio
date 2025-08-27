import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { setGuides, setLoading } = phdGuideSlice.actions;
export default phdGuideSlice.reducer;
