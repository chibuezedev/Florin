"use client";

import { useCallback, useState, useEffect, ReactNode } from "react";
import { biometricTracker } from "@/lib/biometricTracker";
import { biometricsService } from "@/lib/api/biometricsService";

type AnomalyDataPoint = {
  time: string;
  avgScore: number;
  maxScore: number;
};

type Alert = {
  _id: string;
  userId: string;
  userName: string;
  email: string;
  type: "behavioral" | "access" | "transaction" | "login";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  anomalyScore: number;
  resolved: boolean;
  createdAt: string;
  resolvedAt?: string;
  notes?: string;
  details: {
    typingRhythm: any;
    transactionFrequency: any;
    failedLogins: any;
    unusualTime: any;
    locationAnomaly: any;
    ipAddress: any;
    deviceFingerprint: any;
  };
};

export function useBiometrics() {
  const [biometrics, setBiometrics] = useState<any>(null);
  const [anomalyData, setAnomalyData] = useState<AnomalyDataPoint[]>([]);
  const [securityAlerts, setSecurityAlerts] = useState<Alert[]>([]);
  const [alertFilter, setAlertFilter] = useState<"active" | "resolved" | "all">(
    "active"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const collectBiometricData = useCallback(() => {
    return biometricTracker.collectData();
  }, []);

  const sendBiometricData = useCallback(
    async (endpoint: string, additionalData?: any) => {
      const biometrics = biometricTracker.collectData();

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
          },
          body: JSON.stringify({
            ...additionalData,
            biometrics,
          }),
        });

        return await response.json();
      } catch (error) {
        console.error("Failed to send biometric data:", error);
        throw error;
      }
    },
    []
  );

  const fetchBiometrics = async () => {
    try {
      setLoading(true);
      const result = await biometricsService.getBiometrics();
      if (result.success) {
        setBiometrics(result.data);
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    return dateString.split(" ")[1];
  };

  const fetchAnomalyData = async () => {
    try {
      setLoading(true);

      const result = await biometricsService.getAnomalyData();

      if (result.success) {
        const transformedData = result.data.map((item: any) => ({
          time: formatTime(item._id),
          avgScore: Math.round(item.avgScore),
          maxScore: Math.round(item.maxScore),
        }));
        setAnomalyData(transformedData);
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSecurityAlerts = async (
    filter?: "active" | "resolved" | "all",
    userId?: string | null
  ) => {
    try {
      setLoading(true);

      const filterToUse = filter || alertFilter;
      const result = await biometricsService.getSecurityAlerts(
        filterToUse,
        userId
      );

      if (result.success) {
        setSecurityAlerts(result.data);
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resolveAlert = async (alertId: string, notes?: string) => {
    try {
      setLoading(true);
      const result = await biometricsService.resolveAlert(alertId, notes);

      if (result.success) {
        await fetchSecurityAlerts();
        setError(null);
        return result;
      } else {
        setError(result.message);
        return result;
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changeAlertFilter = (filter: "active" | "resolved" | "all") => {
    setAlertFilter(filter);
    fetchSecurityAlerts(filter);
  };

  useEffect(() => {
    fetchBiometrics();
  }, []);

  useEffect(() => {
    fetchAnomalyData();
  }, []);

  useEffect(() => {
    fetchSecurityAlerts();
  }, []);

  return {
    collectBiometricData,
    sendBiometricData,
    biometrics,
    loading,
    error,
    refetch: fetchBiometrics,
    anomalyData,
    fetchAnomalyData,
    securityAlerts,
    fetchSecurityAlerts,
    resolveAlert,
    alertFilter,
    changeAlertFilter,
  };
}
