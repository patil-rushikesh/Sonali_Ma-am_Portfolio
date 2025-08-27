import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { setTestimonials, setLoading } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
