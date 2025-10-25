"use client";

import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { dashboardData, loading, error } = useDashboard();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };


  const stats = dashboardData?.summary;
  const monthlyData = dashboardData?.monthlyData || [];
  const departmentData = dashboardData?.departmentData || [];
  const recentTransactions = dashboardData?.recentTransactions || [];

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Dashboard Overview</h1>
          <p className="mt-2 text-slate-400">Insight and general overview</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                <DollarSign className="h-6 w-6 text-amber-400" />
              </div>
              <div className="flex items-center gap-1 text-sm text-emerald-400">
                <ArrowUpRight className="h-4 w-4" />
                <span>12.5%</span>
              </div>
            </div>
            <p className="mb-1 text-sm text-slate-400">Total Revenue</p>
            <p className="text-3xl font-bold text-white">
              {loading ? "..." : formatCurrency(stats?.totalRevenue)}
            </p>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <div className="flex items-center gap-1 text-sm text-emerald-400">
                <ArrowUpRight className="h-4 w-4" />
                <span>
                  {loading ? "..." : `${stats?.monthlyGrowthPercent || 0}%`}
                </span>
              </div>
            </div>
            <p className="mb-1 text-sm text-slate-400">Monthly Growth</p>
            <p className="text-3xl font-bold text-white">
              {loading ? "..." : formatCurrency(stats?.monthlyGrowth || 0)}
            </p>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div className="flex items-center gap-1 text-sm text-red-400">
                <ArrowDownRight className="h-4 w-4" />
                <span>
                  {loading ? "..." : `${stats?.securityAlerts || 0} Active`}
                </span>
              </div>
            </div>
            <p className="mb-1 text-sm text-slate-400">Security Alerts</p>
            <p className="text-3xl font-bold text-white">
              {loading ? "..." : stats?.securityAlerts || 0}
            </p>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div className="flex items-center gap-1 text-sm text-emerald-400">
                <ArrowUpRight className="h-4 w-4" />
                <span>
                  {loading ? "..." : `${stats?.activeUsers || 0} Active`}
                </span>
              </div>
            </div>
            <p className="mb-1 text-sm text-slate-400">Active Users</p>
            <p className="text-3xl font-bold text-white">
              {loading ? "..." : (stats?.activeUsers || 0).toLocaleString()}
            </p>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-3">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Revenue Growth</p>
                <p className="text-2xl font-bold text-emerald-400">+12.5%</p>
              </div>
            </div>
          </Card>
          <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-500/10 p-3">
                <TrendingDown className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Transaction Vol.</p>
                <p className="text-2xl font-bold text-red-400">-3.2%</p>
              </div>
            </div>
          </Card>
          <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/10 p-3">
                <DollarSign className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Avg Transaction</p>
                <p className="text-2xl font-bold text-white">₦8,327</p>
              </div>
            </div>
          </Card>
          <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-3">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">User Growth</p>
                <p className="text-2xl font-bold text-blue-400">+5.7%</p>
              </div>
            </div>
          </Card>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">
                Revenue & Transaction Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="month"
                    stroke="#94a3b8"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#94a3b8"
                    style={{ fontSize: "12px" }}
                    tickFormatter={(value) => `$${value / 1000000}M`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#94a3b8"
                    style={{ fontSize: "12px" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#f8fafc",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Revenue"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="transactions"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Transactions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">
                Revenue by Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="department"
                    stroke="#94a3b8"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    style={{ fontSize: "12px" }}
                    tickFormatter={(value) => `$${value / 1000}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#f8fafc",
                    }}
                    formatter={(value: number) => [
                      `$${(value / 1000).toFixed(0)}K`,
                      "Revenue",
                    ]}
                  />
                  <Bar dataKey="amount" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Quick Actions
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/admin/students">
              <Card className="group cursor-pointer border-slate-800 bg-slate-900/50 p-6 backdrop-blur transition-all hover:border-amber-500/30">
                <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-amber-400">
                  Student Payments
                </h3>
                <p className="text-sm text-slate-400">
                  Manage tuition and student fees
                </p>
              </Card>
            </Link>

            <Link href="/admin/faculty">
              <Card className="group cursor-pointer border-slate-800 bg-slate-900/50 p-6 backdrop-blur transition-all hover:border-amber-500/30">
                <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-amber-400">
                  Faculty Allocations
                </h3>
                <p className="text-sm text-slate-400">
                  Manage faculty payments
                </p>
              </Card>
            </Link>

            <Link href="/admin/ai-insights">
              <Card className="group cursor-pointer border-slate-800 bg-slate-900/50 p-6 backdrop-blur transition-all hover:border-amber-500/30">
                <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-amber-400">
                  AI Insights
                </h3>
                <p className="text-sm text-slate-400">View threat detection</p>
              </Card>
            </Link>
          </div>
        </div>

        <Card className="border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Recent Transactions
          </h3>
          <div className="space-y-4">
            {loading ? (
              <p className="text-slate-400 text-center py-4">Loading...</p>
            ) : recentTransactions.length === 0 ? (
              <p className="text-slate-400 text-center py-4">
                No recent transactions
              </p>
            ) : (
              recentTransactions.map((txn: any) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between border-b border-slate-800/50 py-3 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      Student Payment - {txn.studentId}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {txn.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-400">
                      ₦{txn.amount.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{txn.timeAgo}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
