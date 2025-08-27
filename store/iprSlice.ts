import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Publication {
  _id: string;
  name: string;
  description: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  type: "journal" | "book";
}
interface Patent {
  _id: string;
  type: "International" | "National";
  title: string;
  date: string;
  status: string;
  number: string;
  createdAt: string;
  updatedAt: string;
}
interface Copyright {
  _id: string;
  title: string;
  diaryNumber: string;
  copyrightRegOf: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
interface Startup {
  _id: string;
  name: string;
  description: string;
  status?: string;
  image?: { url: string };
  createdAt: string;
  updatedAt: string;
}
interface ResearchGrant {
  _id: string;
  fundReceived: number;
  title: string;
  grantAgency: string;
  currency: string;
  startYear: number;
  endYear: number;
  createdAt: string;
  updatedAt: string;
}

interface IprState {
  publicationData: Publication[];
  patentData: Patent[];
  copyrightData: Copyright[];
  startupData: Startup[];
  researchGrantData: ResearchGrant[];
  loading: boolean;
}

const initialState: IprState = {
  publicationData: [],
  patentData: [],
  copyrightData: [],
  startupData: [],
  researchGrantData: [],
  loading: false,
};

const iprSlice = createSlice({
  name: "ipr",
  initialState,
  reducers: {
    setPublicationData(state, action: PayloadAction<Publication[]>) {
      state.publicationData = action.payload;
    },
    setPatentData(state, action: PayloadAction<Patent[]>) {
      state.patentData = action.payload;
    },
    setCopyrightData(state, action: PayloadAction<Copyright[]>) {
      state.copyrightData = action.payload;
    },
    setStartupData(state, action: PayloadAction<Startup[]>) {
      state.startupData = action.payload;
    },
    setResearchGrantData(state, action: PayloadAction<ResearchGrant[]>) {
      state.researchGrantData = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setPublicationData,
  setPatentData,
  setCopyrightData,
  setStartupData,
  setResearchGrantData,
  setLoading,
} = iprSlice.actions;
export default iprSlice.reducer;
