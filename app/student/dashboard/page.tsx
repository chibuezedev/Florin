"use client"

import { useState } from "react"
import Link from "next/link"
import {
  CreditCard,
  Clock,
  CheckCircle2,
  TrendingUp,
  Calendar,
  FileText,
  LogOut,
  Bell,
  User,
  Wallet,
} from "lucide-react"
import { mockStudentProfiles, mockStudentPayments } from "@/lib/mock-data"
import { formatCurrency, formatDate } from "@/lib/utils/format"

export default function StudentDashboard() {
  const [student] = useState(mockStudentProfiles[0])
  const payments = mockStudentPayments.filter((p) => p.studentId === student.id)
  const pendingPayments = payments.filter((p) => p.status === "pending")
  const completedPayments = payments.filter((p) => p.status === "paid")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-900">
                U
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Student Portal</h1>
                <p className="text-xs text-slate-400">{student.regNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
                <Bell className="w-5 h-5 text-slate-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{student.name}</p>
                  <p className="text-xs text-slate-400">{student.level}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {student.name.split(" ")[0]}!</h2>
          <p className="text-slate-400">
            {student.program} • {student.department}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <p className="text-3xl font-bold text-white">{formatCurrency(student.totalPaid)}</p>
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
              <p className="text-3xl font-bold text-white">{formatCurrency(student.totalPending)}</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-xs font-medium text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">Total</span>
              </div>
              <p className="text-sm text-slate-400 mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-white">
                {formatCurrency(student.totalPaid + student.totalPending)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Payments */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Pending Payments</h3>
                <span className="text-sm text-slate-400">{pendingPayments.length} items</span>
              </div>

              <div className="space-y-4">
                {pendingPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="group relative overflow-hidden rounded-xl bg-slate-800/50 border border-white/5 p-4 hover:border-amber-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-amber-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{payment.description}</h4>
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
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white mb-2">{formatCurrency(payment.amount)}</p>
                        <Link
                          href={`/student/payment/${payment.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/25"
                        >
                          Pay Now
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

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/student/payments"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-white/5 hover:border-blue-500/30 hover:bg-slate-800 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <Wallet className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">Payment History</p>
                    <p className="text-xs text-slate-400">View all transactions</p>
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
                  href="/"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-white/5 hover:border-red-500/30 hover:bg-slate-800 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                    <LogOut className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">Logout</p>
                    <p className="text-xs text-slate-400">Sign out of portal</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {completedPayments.slice(0, 3).map((payment) => (
                  <div key={payment.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{payment.description}</p>
                      <p className="text-xs text-slate-400">{formatDate(payment.paidDate!)}</p>
                    </div>
                    <p className="text-sm font-semibold text-emerald-400">{formatCurrency(payment.amount)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
