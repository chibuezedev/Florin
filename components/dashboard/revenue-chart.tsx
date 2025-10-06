"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const chartData = [
  { month: "Jul", revenue: 2100000, transactions: 280 },
  { month: "Aug", revenue: 2350000, transactions: 310 },
  { month: "Sep", revenue: 2650000, transactions: 295 },
  { month: "Oct", revenue: 2400000, transactions: 320 },
  { month: "Nov", revenue: 2550000, transactions: 305 },
  { month: "Dec", revenue: 2750000, transactions: 330 },
  { month: "Jan", revenue: 2847500, transactions: 342 },
]

export function RevenueChart() {
  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} tickFormatter={(value) => `$${value / 1000000}M`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#f8fafc",
              }}
              formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, "Revenue"]}
            />
            <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
