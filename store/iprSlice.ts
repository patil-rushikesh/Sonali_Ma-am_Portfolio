import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

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

// Async thunks for each data type with correct endpoints
export const getPublicationData = createAsyncThunk(
  "ipr/getPublicationData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/publications");
      const data = await res.json();
      return data.data as Publication[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPatentData = createAsyncThunk(
  "ipr/getPatentData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/patents");
      const data = await res.json();
      return data.data as Patent[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCopyrightData = createAsyncThunk(
  "ipr/getCopyrightData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/copyrights");
      const data = await res.json();
      return data.data as Copyright[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getStartupData = createAsyncThunk(
  "ipr/getStartupData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/startups");
      const data = await res.json();
      return data.data as Startup[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getResearchGrantData = createAsyncThunk(
  "ipr/getResearchGrantData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/research-grants");
      const data = await res.json();
      return data.data as ResearchGrant[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(getPublicationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getPublicationData.fulfilled,
        (state, action: PayloadAction<Publication[]>) => {
          state.publicationData = action.payload;
          state.loading = false;
        }
      )
      .addCase(getPublicationData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getPatentData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getPatentData.fulfilled,
        (state, action: PayloadAction<Patent[]>) => {
          state.patentData = action.payload;
          state.loading = false;
        }
      )
      .addCase(getPatentData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCopyrightData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCopyrightData.fulfilled,
        (state, action: PayloadAction<Copyright[]>) => {
          state.copyrightData = action.payload;
          state.loading = false;
        }
      )
      .addCase(getCopyrightData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getStartupData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getStartupData.fulfilled,
        (state, action: PayloadAction<Startup[]>) => {
          state.startupData = action.payload;
          state.loading = false;
        }
      )
      .addCase(getStartupData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getResearchGrantData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getResearchGrantData.fulfilled,
        (state, action: PayloadAction<ResearchGrant[]>) => {
          state.researchGrantData = action.payload;
          state.loading = false;
        }
      )
      .addCase(getResearchGrantData.rejected, (state) => {
        state.loading = false;
      });
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
