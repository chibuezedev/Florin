"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBiometrics } from "@/hooks/useBiometrics";
import {
  Activity,
  Clock,
  Mouse,
  Fingerprint,
  LogIn,
  Mail,
  Smartphone,
  Loader2,
  AlertCircle,
} from "lucide-react";

export function BiometricMonitor() {
  const { biometrics, loading, error, refetch } = useBiometrics();

  if (loading) {
    return (
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardContent className="flex items-center justify-center gap-2 py-12 text-red-400">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </CardContent>
      </Card>
    );
  }

  if (!biometrics || biometrics.length === 0) {
    return (
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardContent className="py-12 text-center text-slate-400">
          No biometric data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-white">
          Behavioral Biometrics
        </CardTitle>
        <button
          onClick={refetch}
          className="text-xs text-slate-400 hover:text-white"
        >
          Refresh
        </button>
      </CardHeader>
      <CardContent>
        <div className="max-h-[335px] space-y-6 overflow-y-auto">
          {biometrics.map((data: any) => {
            const logonPattern = Math.round(
              data.logonPattern?.locationConsistency || 0
            );
            const typingSpeed = data.typingSpeed?.wpm || 0;
            const mouseDynamics =
              Math.round(data.mouseDynamics?.velocity * 100) || 0;
            const emailContext = data.emailContext?.subjectComplexity || 50;
            const touchGesture =
              Math.round(data.touchGesture?.pressure * 100) || 0;
            const sessionDuration = Math.round(
              (data.logonPattern?.loginDuration || 0) / 60000
            );

            return (
              <div
                key={data._id}
                className="space-y-4 rounded-lg border border-slate-800 bg-slate-800/30 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">
                      {data.userId?.name || "Unknown User"}
                    </p>
                    <p className="text-xs text-slate-400">{data.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Fingerprint className="h-3 w-3" />
                      {data.deviceFingerprint.slice(0, 16)}...
                    </div>
                    <div
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        data.riskLevel === "low"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : data.riskLevel === "medium"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {data.riskLevel.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Logon Pattern */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <LogIn className="h-4 w-4" />
                      Logon Pattern
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full ${
                            logonPattern > 70
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                              : "bg-gradient-to-r from-amber-500 to-amber-400"
                          }`}
                          style={{ width: `${logonPattern}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {logonPattern}%
                      </span>
                    </div>
                  </div>

                  {/* Typing Speed */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Activity className="h-4 w-4" />
                      Typing Speed
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                          style={{ width: `${Math.min(typingSpeed, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {typingSpeed} WPM
                      </span>
                    </div>
                  </div>

                  {/* Mouse Dynamics */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Mouse className="h-4 w-4" />
                      Mouse Dynamics
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full ${
                            mouseDynamics > 70
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                              : "bg-gradient-to-r from-amber-500 to-amber-400"
                          }`}
                          style={{ width: `${mouseDynamics}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {mouseDynamics}%
                      </span>
                    </div>
                  </div>

                  {/* Email Context */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Mail className="h-4 w-4" />
                      Email Context
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full ${
                            emailContext > 70
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                              : "bg-gradient-to-r from-amber-500 to-amber-400"
                          }`}
                          style={{ width: `${emailContext}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {emailContext}%
                      </span>
                    </div>
                  </div>

                  {/* Touch Gesture */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Smartphone className="h-4 w-4" />
                      Touch Gesture
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full ${
                            touchGesture > 70
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                              : "bg-gradient-to-r from-amber-500 to-amber-400"
                          }`}
                          style={{ width: `${touchGesture}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {touchGesture}%
                      </span>
                    </div>
                  </div>

                  {/* Session Duration */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Clock className="h-4 w-4" />
                      Session Duration
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
                          style={{
                            width: `${Math.min(
                              (sessionDuration / 180) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {sessionDuration}m
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-slate-500">Access Details:</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-md bg-slate-800 px-2 py-1 text-slate-300">
                      Anomaly Score: {data.anomalyScore}
                    </div>
                    <div className="rounded-md bg-slate-800 px-2 py-1 text-slate-300">
                      Login: {new Date(data.createdAt).toLocaleTimeString()}
                    </div>
                    <div className="rounded-md bg-slate-800 px-2 py-1 text-slate-300">
                      IP: {data.ipAddress}
                    </div>
                    <div className="rounded-md bg-slate-800 px-2 py-1 text-slate-300">
                      Day:{" "}
                      {
                        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                          data.logonPattern.dayOfWeek
                        ]
                      }
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
