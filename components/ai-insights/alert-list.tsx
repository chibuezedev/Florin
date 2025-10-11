"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime, getThreatLevelColor } from "@/lib/utils/format";
import {
  AlertTriangle,
  Shield,
  Activity,
  Lock,
  CheckCircle,
  Eye,
} from "lucide-react";
import { useBiometrics } from "@/hooks/useBiometrics";

const alertIcons = {
  behavioral: Activity,
  access: Lock,
  transaction: AlertTriangle,
  login: Shield,
};

export function AlertList() {
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("active");
  const { securityAlerts, fetchSecurityAlerts, loading, error } =
    useBiometrics();

  useEffect(() => {
    fetchSecurityAlerts(filter);
  }, [filter]);

  const filteredAlerts = securityAlerts;

  if (loading) {
    return (
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-slate-400">
            Loading alerts...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-red-400">
            Error: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">
            Security Alerts
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-gold-500 text-navy-900 hover:bg-gold-600"
                  : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
              }
            >
              All
            </Button>
            <Button
              variant={filter === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("active")}
              className={
                filter === "active"
                  ? "bg-gold-500 text-navy-900 hover:bg-gold-600"
                  : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
              }
            >
              Active
            </Button>
            <Button
              variant={filter === "resolved" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("resolved")}
              className={
                filter === "resolved"
                  ? "bg-gold-500 text-navy-900 hover:bg-gold-600"
                  : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
              }
            >
              Resolved
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-slate-400">
              No {filter} alerts found
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const Icon = alertIcons[alert.type];
              return (
                <div
                  key={alert._id}
                  className="flex items-start gap-4 rounded-lg border border-slate-800 bg-slate-800/30 p-4"
                >
                  <div
                    className={`rounded-lg ${getThreatLevelColor(
                      alert.severity
                    )} p-2`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white">
                            {alert.userName}
                          </p>
                          <Badge
                            className={`${getThreatLevelColor(
                              alert.severity
                            )} border-0 text-xs uppercase`}
                          >
                            {alert.severity}
                          </Badge>
                          {alert.resolved && (
                            <Badge className="border-0 bg-emerald-500/10 text-xs text-emerald-400">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Resolved
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-slate-300">
                          {alert.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                          <span>Type: {alert.type}</span>
                          <span>•</span>
                          <span>Anomaly Score: {alert.anomalyScore}/100</span>
                          <span>•</span>
                          <span>{formatDateTime(alert.createdAt)}</span>
                        </div>
                        {alert.details &&
                          Object.keys(alert.details).length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {alert.details.typingRhythm && (
                                <Badge
                                  variant="outline"
                                  className="border-slate-700 bg-slate-800/50 text-xs text-slate-400"
                                >
                                  Typing: {alert.details.typingRhythm}%
                                </Badge>
                              )}
                              {alert.details.transactionFrequency && (
                                <Badge
                                  variant="outline"
                                  className="border-slate-700 bg-slate-800/50 text-xs text-slate-400"
                                >
                                  Frequency:{" "}
                                  {alert.details.transactionFrequency}x
                                </Badge>
                              )}
                              {alert.details.failedLogins && (
                                <Badge
                                  variant="outline"
                                  className="border-slate-700 bg-slate-800/50 text-xs text-slate-400"
                                >
                                  Failed Logins: {alert.details.failedLogins}
                                </Badge>
                              )}
                              {alert.details.unusualTime && (
                                <Badge
                                  variant="outline"
                                  className="border-slate-700 bg-slate-800/50 text-xs text-slate-400"
                                >
                                  Unusual Time
                                </Badge>
                              )}
                              {alert.details.locationAnomaly && (
                                <Badge
                                  variant="outline"
                                  className="border-slate-700 bg-slate-800/50 text-xs text-slate-400"
                                >
                                  Location Anomaly
                                </Badge>
                              )}
                              {alert.details.ipAddress && (
                                <Badge
                                  variant="outline"
                                  className="border-slate-700 bg-slate-800/50 text-xs text-slate-400"
                                >
                                  IP: {alert.details.ipAddress}
                                </Badge>
                              )}
                              {alert.details.deviceFingerprint && (
                                <Badge
                                  variant="outline"
                                  className="border-slate-700 bg-slate-800/50 text-xs text-slate-400"
                                >
                                  Device:{" "}
                                  {alert.details.deviceFingerprint.substring(
                                    0,
                                    8
                                  )}
                                  ...
                                </Badge>
                              )}
                            </div>
                          )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
