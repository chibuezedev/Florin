"use client";

import useSWR from "swr";
import { useState, useEffect } from "react";
import { paymentService } from "../lib/api/paymentService";
import { Transaction, Receipt } from "../lib/types";
import { Payment, CreatePaymentData } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

  return { payments, loading, error, count: payments.length };
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

export const useAllPayments = () => {
  const [payments, setPayments] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const result = await paymentService.getPayments();
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
  }, []);

  return { payments, loading, error };
};

export const useAllReceipts = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        setLoading(true);
        const result = await paymentService.getReceipts();
        if (result.success) {
          setReceipts(result.data);
        } else {
          setError(result.message);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  return { receipts, loading, error };
};

export const usePayouts = () => {
  const [createdPayments, setCreatedPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data, error, mutate } = useSWR<Payment[]>("/api/payouts", fetcher);
  const [isCreating, setIsCreating] = useState(false);

  const fetchCreatedPayments = async () => {
    try {
      setIsLoading(true);
      const response = await paymentService.getPayouts();
      if (response.success) {
        setCreatedPayments(response.data);
      } else {
        console.error("Error fetching payouts:", response.message);
      }
    } catch (error) {
      console.error("Error fetching payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPayment = async (paymentData: CreatePaymentData) => {
    setIsCreating(true);
    try {
      const response = await paymentService.createPayment(paymentData);

      const newPayment = await response.data;

      return newPayment;
    } catch (error) {
      console.error("Error creating payment:", error);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    fetchCreatedPayments();
  }, []);

  return {
    createdPayments,
    isLoading,
    isError: error,
    isCreating,
    createPayment,
    mutate,
  };
};
