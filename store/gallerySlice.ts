import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { setGallery, setLoading } = gallerySlice.actions;
export default gallerySlice.reducer;
