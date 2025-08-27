import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface GalleryItem {
  _id: string;
  title: string;
  shortDescription: string;
  location: string;
  image: { url: string; publicId: string };
  createdAt: string;
  updatedAt: string;
}

interface GalleryState {
  items: GalleryItem[];
  loading: boolean;
}

const initialState: GalleryState = {
  items: [],
  loading: false,
};

// Async thunk to fetch gallery items
export const getGallery = createAsyncThunk(
  "gallery/getGallery",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      return data.data as GalleryItem[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setGallery(state, action: PayloadAction<GalleryItem[]>) {
      state.items = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGallery.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getGallery.fulfilled,
        (state, action: PayloadAction<GalleryItem[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(getGallery.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setGallery, setLoading } = gallerySlice.actions;
export default gallerySlice.reducer;
