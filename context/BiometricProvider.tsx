"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { biometricTracker } from "@/lib/biometricTracker";

const BiometricContext = createContext<typeof biometricTracker | null>(null);

export function BiometricProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Start tracking when app mounts
    biometricTracker.startTracking();

    // Cleanup on unmount
    return () => {
      biometricTracker.stopTracking();
    };
  }, []);

  return (
    <BiometricContext.Provider value={biometricTracker}>
      {children}
    </BiometricContext.Provider>
  );
}

export function useBiometricContext() {
  const context = useContext(BiometricContext);
  if (!context) {
    throw new Error(
      "useBiometricContext must be used within BiometricProvider"
    );
  }
  return context;
}
