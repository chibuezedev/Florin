"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Loader2, AlertCircle } from "lucide-react";
import { useBiometrics } from "@/hooks/useBiometrics";


export function AnomalyChart() {

  const { fetchAnomalyData, anomalyData, loading, error } =
  useBiometrics();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-slate-700 bg-slate-800 p-3 shadow-lg">
          <p className="text-xs text-slate-400">{payload[0].payload.time}</p>
          <p className="text-sm font-semibold text-amber-400">
            Avg: {payload[0].value}
          </p>
          {payload[0].payload.maxScore && (
            <p className="text-xs text-red-400">
              Max: {payload[0].payload.maxScore}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardContent className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardContent className="flex items-center justify-center gap-2 py-32 text-red-400">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </CardContent>
      </Card>
    );
  }

  if (anomalyData.length === 0) {
    return (
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            Anomaly Score Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="py-12 text-center text-slate-400">
          No anomaly data available yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-white">
          Anomaly Score Timeline
        </CardTitle>
        <button
          onClick={fetchAnomalyData}
          className="text-xs text-slate-400 hover:text-white"
        >
          Refresh
        </button>
      </CardHeader>
      <CardContent className="pb-6">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={anomalyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: "12px" }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="avgScore"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ fill: "#f59e0b", r: 4 }}
              name="Average Score"
            />
            <Line
              type="monotone"
              dataKey="maxScore"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: "#ef4444", r: 3 }}
              strokeDasharray="5 5"
              name="Max Score"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-800/50 p-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-sm text-slate-400">Normal (0-40)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="text-sm text-slate-400">Elevated (41-70)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-sm text-slate-400">Critical (71-100)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
