"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Navigation } from "@/components/navigation";
import gsap from "gsap";

import {
  getPublicationData,
  getPatentData,
  getCopyrightData,
  getStartupData,
  getResearchGrantData,
} from "@/store/iprSlice";
import { getExperience } from "@/store/aboutSlice";
import { getGallery } from "@/store/gallerySlice";
import { getResources } from "@/store/learningResourcesSlice";
import { getGuides } from "@/store/phdGuideSlice";
import { getTalks } from "@/store/talksSlice";
import { getTestimonials } from "@/store/testimonialsSlice";

import { useAppDispatch } from "@/store/hooks";

const DataLoader = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const loadingRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loadingRef.current) {
      gsap.fromTo(
        loadingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    Promise.all([
      dispatch(getPublicationData()),
      dispatch(getPatentData()),
      dispatch(getCopyrightData()),
      dispatch(getStartupData()),
      dispatch(getResearchGrantData()),
      dispatch(getExperience()),
      dispatch(getGallery()),
      dispatch(getResources()),
      dispatch(getGuides()),
      dispatch(getTalks()),
      dispatch(getTestimonials()),
    ]).then(() => {
      const state = store.getState();
      // console.log("Fetched Data:", {
      //   publicationData: state.ipr.publicationData,
      //   patentData: state.ipr.patentData,
      //   copyrightData: state.ipr.copyrightData,
      //   startupData: state.ipr.startupData,
      //   researchGrantData: state.ipr.researchGrantData,
      //   experience: state.about.experience,
      //   gallery: state.gallery.items,
      //   resources: state.learningResources.items,
      //   guides: state.phdGuide.items,
      //   talks: state.talks.items,
      //   testimonials: state.testimonials.items,
      // });

      // Animate counter
      gsap.to({ val: 0 }, {
        val: 100,
        duration: 2,
        ease: "power1.inOut",
        onUpdate: function () {
          setCounter(Math.round(this.targets()[0].val));
        },
        onComplete: () => {
          if (loadingRef.current) {
            gsap.to(loadingRef.current, {
              opacity: 0,
              y: -40,
              duration: 0.6,
              ease: "power2.in",
              onComplete: () => setLoading(false),
            });
          } else {
            setLoading(false);
          }
        },
      });
    });

    return () => {
      gsap.killTweensOf(loadingRef.current);
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div
        ref={loadingRef}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <img
          src="/professional-headshot.png"
          alt="Ma'am"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: 24,
          }}
        />
        <span style={{ fontSize: 32, fontWeight: 600 }}>{counter}%</span>
      </div>
    );
  }

      
  return <><Navigation />{children}</>;
};

const Maincomponent = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <DataLoader>{children}</DataLoader>
    </Provider>
  );
};

export default Maincomponent;
