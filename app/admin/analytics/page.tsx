"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";

const monthlyData = [
  { month: "Jul", revenue: 2100000, transactions: 280, users: 1180 },
  { month: "Aug", revenue: 2350000, transactions: 310, users: 1195 },
  { month: "Sep", revenue: 2650000, transactions: 295, users: 1210 },
  { month: "Oct", revenue: 2400000, transactions: 320, users: 1225 },
  { month: "Nov", revenue: 2550000, transactions: 305, users: 1235 },
  { month: "Dec", revenue: 2750000, transactions: 330, users: 1242 },
  { month: "Jan", revenue: 2847500, transactions: 342, users: 1247 },
];

const departmentData = [
  { department: "Computer Science", amount: 850000 },
  { department: "Engineering", amount: 720000 },
  { department: "Business", amount: 650000 },
  { department: "Mathematics", amount: 420000 },
  { department: "Arts", amount: 380000 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics & Reports</h1>
        <p className="mt-1 text-slate-400">
          Comprehensive financial and operational insights
        </p>
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
            <div className="rounded-lg bg-gold-500/10 p-3">
              <DollarSign className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Avg Transaction</p>
              <p className="text-2xl font-bold text-white">$8,327</p>
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

      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            Revenue & Transaction Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
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
  );
}
