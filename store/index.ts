import { configureStore } from "@reduxjs/toolkit";
import testimonialsReducer from "./testimonialsSlice";
import phdGuideReducer from "./phdGuideSlice";
import learningResourcesReducer from "./learningResourcesSlice";
import iprReducer from "./iprSlice";
import galleryReducer from "./gallerySlice";
import contactReducer from "./contactSlice";
import talksReducer from "./talksSlice";
import aboutReducer from "./aboutSlice";

export const store = configureStore({
  reducer: {
    testimonials: testimonialsReducer,
    phdGuide: phdGuideReducer,
    learningResources: learningResourcesReducer,
    ipr: iprReducer,
    gallery: galleryReducer,
    contact: contactReducer,
    talks: talksReducer,
    about: aboutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
