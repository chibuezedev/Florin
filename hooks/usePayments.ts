import { useState, useEffect } from "react";
import { paymentService } from "../lib/api/paymentService";

export const usePayments = (filters?: any) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const result = await paymentService.getMyPayments(filters);
        if (result.success) {
          setPayments(result.data);
        } else {
          setError(result.message);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [JSON.stringify(filters)]);

  return { payments, loading, error };
};

export const usePaymentSummary = () => {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const result = await paymentService.getPaymentSummary();
      if (result.success) {
        setSummary(result.data);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return { summary, loading, error, refetch: () => fetchSummary() };
};
