import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  paragraph: string;
  image: { url: string; publicId: string };
  createdAt: string;
  updatedAt: string;
}

interface TestimonialsState {
  items: Testimonial[];
  loading: boolean;
}

const initialState: TestimonialsState = {
  items: [],
  loading: false,
};

// Async thunk to fetch testimonials
export const getTestimonials = createAsyncThunk(
  "testimonials/getTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      return data.data as Testimonial[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    setTestimonials(state, action: PayloadAction<Testimonial[]>) {
      state.items = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getTestimonials.fulfilled,
        (state, action: PayloadAction<Testimonial[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(getTestimonials.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setTestimonials, setLoading } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
