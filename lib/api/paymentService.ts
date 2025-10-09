const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const paymentService = {
  getMyPayments: async (filters?: {
    status?: string;
    semester?: string;
    academicYear?: string;
  }) => {
    const params = new URLSearchParams(filters as any);
    const response = await fetch(
      `${API_BASE_URL}/payments/my-payments?${params}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.json();
  },

  getPayment: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/payments/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getPaymentSummary: async () => {
    const response = await fetch(`${API_BASE_URL}/payments/summary`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  initiatePayment: async (data: {
    paymentId: string;
    paymentMethod: string;
    channel?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/payments/initiate`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  verifyPayment: async (reference: string) => {
    const response = await fetch(
      `${API_BASE_URL}/payments/verify/${reference}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.json();
  },

  getReceipt: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/payments/receipt/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getPayments: async () => {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};
