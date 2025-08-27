"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Provider } from "react-redux"
import { store } from "@/store"
import { Navigation } from '@/components/navigation';
import gsap from "gsap";

const Maincomponent = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate loading in
    if (loadingRef.current) {
      gsap.fromTo(
        loadingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    // Counter animation
    let start = 0;
    const duration = 2; // seconds
    gsap.to({ val: start }, {
      val: 100,
      duration,
      ease: "power1.inOut",
      onUpdate: function () {
        setCounter(Math.round(this.targets()[0].val));
      },
      onComplete: () => {
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

    // Cleanup
    return () => {
      gsap.killTweensOf(loadingRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div
        ref={loadingRef}
        style={{
          display: 'flex',
          flexDirection: 'column', // Added for vertical stacking
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}
      >
        <img
          src="/professional-headshot.png" // <-- update this path as needed
          alt="Ma'am"
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: 24
          }}
        />
        <span style={{ fontSize: 32, fontWeight: 600 }}>{counter}%</span>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <div>
        <Navigation />
        {children}
      </div>
    </Provider>
  );
}

export default Maincomponent
