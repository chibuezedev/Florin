"use client";

import { useAllPayments } from "@/hooks/usePayments";
import { PaymentTable } from "@/components/payments/payment-table";
import { PaymentStats } from "@/components/payments/payment-stats";

export default function StudentsPage() {
  const { payments, loading, error } = useAllPayments();

  const studentTransactions = payments.filter(
    (payment: any) => 
      payment.paymentType === "tuition" || 
      payment.paymentType === "accommodation" ||
      payment.paymentType === "registration" ||
      payment.paymentType === "library" ||
      payment.paymentType === "laboratory" ||
      payment.paymentType === "sports" ||
      payment.paymentType === "examination"
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading payments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className="text-slate-400">Error loading payments: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Student Payments</h1>
        <p className="mt-1 text-slate-400">
          Manage tuition fees and student service payments
        </p>
      </div>

      <PaymentStats transactions={studentTransactions} />
      <PaymentTable 
        transactions={studentTransactions} 
        title="All Student Transactions" 
      />
    </div>
  );
}