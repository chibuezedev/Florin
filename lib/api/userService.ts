const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const userService = {
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  updateProfile: async (data: {
    name?: string;
    department?: string;
    level?: string;
    program?: string;
    studentId?: string;
    employeeId?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  updatePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/users/profile/password`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  updateEmail: async (data: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/users/profile/email`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deactivateAccount: async (password: string) => {
    const response = await fetch(`${API_BASE_URL}/users/profile/deactivate`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ password }),
    });
    return response.json();
  },

  getAllUsers: async (filters?: {
    role?: string;
    department?: string;
    level?: string;
    isActive?: string;
    page?: number;
    limit?: number;
  }) => {
    const params = new URLSearchParams(filters as any);
    const response = await fetch(`${API_BASE_URL}/users?${params}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getUserById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  updateUser: async (
    id: string,
    data: {
      name?: string;
      email?: string;
      role?: string;
      department?: string;
      level?: string;
      program?: string;
      studentId?: string;
      employeeId?: string;
      isActive?: boolean;
    }
  ) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteUser: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};
