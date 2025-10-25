const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const dashboardService = {
  getDashboardData: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};
