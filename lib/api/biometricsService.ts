const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const biometricsService = {
  getBiometrics: async () => {
    const response = await fetch(`${API_BASE_URL}/biometrics`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getAnomalyData: async () => {
    const response = await fetch(
      `${API_BASE_URL}/biometrics/anomalies/timeline`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.json();
  },

  getSecurityAlerts: async (filter = "active", userId?: string | null) => {
    const params = new URLSearchParams();
    if (filter) params.append("filter", filter);
    if (userId) params.append("userId", userId);

    const queryString = params.toString();
    const url = `${API_BASE_URL}/alerts${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  resolveAlert: async (alertId: string, notes = "") => {
    const response = await fetch(`${API_BASE_URL}/alerts/${alertId}/resolve`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ notes }),
    });
    return response.json();
  },

  getAlertById: async (alertId: string) => {
    const response = await fetch(`${API_BASE_URL}/alerts/${alertId}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};
