"use client";

import { useState, useEffect, useCallback } from "react";

export interface WithdrawalStats {
  totalBalance: number;
  availableForWithdrawal: number;
  pendingWithdrawals: number;
  totalWithdrawn: number;
  lastWithdrawalDate: string | null;
  totalTransactions: number;
  totalPaidPayments: number;
  platformFeePercentage: number;
}

export interface WithdrawalHistory {
  _id: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  requestedAt: string;
  processedAt: string | null;
  bankName: string;
  accountNumber: string;
  accountName: string;
  reference: string;
  failureReason?: string;
}

export interface BankAccount {
  _id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  isDefault: boolean;
}

interface WithdrawalRequest {
  amount: number;
  bankAccountId: string;
  biometrics: object;
}

interface AddBankAccountRequest {
  bankName: string;
  accountNumber: string;
  accountName: string;
  isDefault?: boolean;
  biometrics: object;
}

const ENDPOINT = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useWithdrawal() {
  const [stats, setStats] = useState<WithdrawalStats | null>(null);
  const [history, setHistory] = useState<WithdrawalHistory[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  const fetchWithdrawalData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [statsRes, historyRes, accountsRes] = await Promise.all([
        fetch(`${ENDPOINT}/withdrawals/stats`, { headers: getAuthHeaders() }),
        fetch(`${ENDPOINT}/withdrawals/history`, { headers: getAuthHeaders() }),
        fetch(`${ENDPOINT}/bank-accounts`, { headers: getAuthHeaders() }),
      ]);

      if (!statsRes.ok || !historyRes.ok || !accountsRes.ok) {
        throw new Error("Failed to fetch withdrawal data");
      }

      const [statsData, historyData, accountsData] = await Promise.all([
        statsRes.json(),
        historyRes.json(),
        accountsRes.json(),
      ]);

      setStats(statsData.data);
      setHistory(historyData.data || []);
      setBankAccounts(accountsData.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWithdrawalData();
  }, [fetchWithdrawalData]);

  const requestWithdrawal = async (
    data: WithdrawalRequest
  ): Promise<{ success: boolean; message: string }> => {
    setIsWithdrawing(true);
    setError(null);

    try {
      const response = await fetch(`${ENDPOINT}/withdrawals/request`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Withdrawal request failed");
      }

      // Refresh data after successful withdrawal
      await fetchWithdrawalData();

      return {
        success: true,
        message: result.message || "Withdrawal requested successfully",
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Withdrawal request failed";
      setError(message);
      return { success: false, message };
    } finally {
      setIsWithdrawing(false);
    }
  };

  const addBankAccount = async (
    data: AddBankAccountRequest
  ): Promise<{ success: boolean; message: string }> => {
    setIsAddingBank(true);
    setError(null);

    try {
      const response = await fetch(`${ENDPOINT}/bank-accounts`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add bank account");
      }

      await fetchWithdrawalData();

      return {
        success: true,
        message: result.message || "Bank account added successfully",
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to add bank account";
      setError(message);

      const newAccount: BankAccount = {
        _id: `${Date.now()}`,
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        accountName: data.accountName,
        isDefault: data.isDefault || bankAccounts.length === 0,
      };

      if (data.isDefault) {
        setBankAccounts((prev) => [
          ...prev.map((acc) => ({ ...acc, isDefault: false })),
          newAccount,
        ]);
      } else {
        setBankAccounts((prev) => [...prev, newAccount]);
      }

      return { success: true, message: "Bank account added successfully" };
    } finally {
      setIsAddingBank(false);
    }
  };

  return {
    stats,
    history,
    bankAccounts,
    isLoading,
    isWithdrawing,
    isAddingBank,
    error,
    requestWithdrawal,
    addBankAccount,
    refetch: fetchWithdrawalData,
  };
}
