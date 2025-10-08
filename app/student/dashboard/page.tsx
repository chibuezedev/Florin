"use client";
import Link from "next/link";
import {
  CreditCard,
  Clock,
  CheckCircle2,
  TrendingUp,
  Calendar,
  FileText,
  Wallet,
  User,
  ArrowRight,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { useAuth } from "@/context/AuthContext";
import { usePaymentSummary } from "@/hooks/usePayments";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { summary, loading, error } = usePaymentSummary();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { totalPaid, totalPending, pendingPayments, recentTransactions } =
    summary;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name.split(" ")[0]}!
        </h2>
        <p className="text-slate-400">
          Bsc{" "}
          {user?.department
            ?.split(" ")
            .map((n) => n[0])
            .join("") || "ST"}{" "}
          • {user?.department} • Level {user?.level}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 p-6 hover:border-emerald-500/40 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full">
                Paid
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-1">Total Paid</p>
            <p className="text-3xl font-bold text-white">
              {formatCurrency(totalPaid)}
            </p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 p-6 hover:border-amber-500/40 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-xs font-medium text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full">
                Pending
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-1">Pending Payments</p>
            <p className="text-3xl font-bold text-white">
              {formatCurrency(totalPending)}
            </p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xs font-medium text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
                Total
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-1">Total Amount</p>
            <p className="text-3xl font-bold text-white">
              {formatCurrency(totalPaid + totalPending)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Pending Payments</h3>
              <span className="text-sm text-slate-400">
                {pendingPayments.length} items
              </span>
            </div>

            <div className="space-y-4">
              {pendingPayments.map((payment: any) => (
                <div
                  key={payment._id}
                  className="group relative overflow-hidden rounded-xl bg-slate-800/50 border border-white/5 p-4 hover:border-amber-500/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                          <CreditCard className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            {payment.description}
                          </h4>
                          <p className="text-sm text-slate-400">
                            {payment.semester} {payment.academicYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400 ml-13">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due: {formatDate(payment.dueDate)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-bold text-white mb-2">
                        {formatCurrency(payment.amount)}
                      </p>
                      <Link
                        href={`/student/payment/${payment._id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/25"
                      >
                        Pay Now
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {pendingPayments.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <p className="text-slate-400">No pending payments</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Recent Transactions
            </h3>
            <div className="space-y-3">
              {recentTransactions?.slice(0, 5).map((transaction: any) => (
                <div key={transaction._id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {transaction.reference}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatDate(transaction.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-emerald-400">
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/student/history"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-white/5 hover:border-blue-500/30 hover:bg-slate-800 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Wallet className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">Payment History</p>
                  <p className="text-xs text-slate-400">
                    View all transactions
                  </p>
                </div>
              </Link>

              <Link
                href="/student/receipts"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-white/5 hover:border-emerald-500/30 hover:bg-slate-800 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                  <FileText className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">Receipts</p>
                  <p className="text-xs text-slate-400">Download receipts</p>
                </div>
              </Link>

              <Link
                href="/student/profile"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-white/5 hover:border-purple-500/30 hover:bg-slate-800 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <User className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">My Profile</p>
                  <p className="text-xs text-slate-400">View & edit details</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
