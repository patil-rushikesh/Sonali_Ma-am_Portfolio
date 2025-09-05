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
    let isMounted = true;
    if (loadingRef.current) {
      gsap.fromTo(
        loadingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    // Track loading for all requests
    let finished = 0;
    const total = 11;
    setLoading(true);

    const requests = [
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
    ];

    requests.forEach((req) => {
      Promise.resolve(req).finally(() => {
        finished += 1;
        // Animate counter as requests finish
        setCounter(Math.round((finished / total) * 100));
        if (finished === total && isMounted) {
          // Animate loading out
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
        }
      });
    });

    return () => {
      isMounted = false;
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
