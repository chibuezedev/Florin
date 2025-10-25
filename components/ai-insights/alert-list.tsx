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
  X,
  TrendingUp,
  TrendingDown,
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
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { securityAlerts, fetchSecurityAlerts, loading, error } =
    useBiometrics();

  useEffect(() => {
    fetchSecurityAlerts(filter);
  }, [filter]);

  const filteredAlerts = securityAlerts;

  const handleViewDetails = (alert: any) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlert(null);
  };

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
    <>
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
                        <div className="flex-1">
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
                            {alert.prediction && (
                              <Badge
                                className={`border-0 text-xs ${
                                  alert.prediction === "anomaly"
                                    ? "bg-red-500/10 text-red-400"
                                    : "bg-blue-500/10 text-blue-400"
                                }`}
                              >
                                {alert.prediction}
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
                            {alert.confidence !== undefined && (
                              <>
                                <span>•</span>
                                <span>Confidence: {alert.confidence}%</span>
                              </>
                            )}
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
                          onClick={() => handleViewDetails(alert)}
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

      {/* Alert Details Modal */}
      {isModalOpen && selectedAlert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-slate-800 bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-lg ${getThreatLevelColor(
                    selectedAlert.severity || null
                  )} p-2`}
                >
                  {alertIcons[selectedAlert.type] &&
                    (() => {
                      const Icon = alertIcons[selectedAlert.type];
                      return <Icon className="h-5 w-5" />;
                    })()}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Alert Details
                  </h2>
                  <p className="text-sm text-slate-400">
                    Comprehensive information about this security alert
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6 p-6">
              {/* User Information */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  User Information
                </h3>
                <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-800/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Name:</span>
                    <span className="font-medium text-white">
                      {selectedAlert.userName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Email:</span>
                    <span className="font-medium text-white">
                      {selectedAlert.email}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">User ID:</span>
                    <span className="font-mono text-xs text-slate-300">
                      {selectedAlert.userId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Alert Summary */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Alert Summary
                </h3>
                <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-800/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Type:</span>
                    <Badge className="border-slate-700 bg-slate-700/50 text-white">
                      {selectedAlert.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Severity:</span>
                    <Badge
                      className={`${getThreatLevelColor(
                        selectedAlert.severity
                      )} border-0 uppercase`}
                    >
                      {selectedAlert.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Status:</span>
                    <Badge
                      className={
                        selectedAlert.resolved
                          ? "border-0 bg-emerald-500/10 text-emerald-400"
                          : "border-0 bg-orange-500/10 text-orange-400"
                      }
                    >
                      {selectedAlert.resolved ? "Resolved" : "Active"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Created:</span>
                    <span className="text-sm text-white">
                      {formatDateTime(selectedAlert.createdAt)}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {selectedAlert.description}
                </p>
              </div>

              {/* ML Model Prediction */}
              {selectedAlert.prediction && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    ML Model Analysis
                  </h3>
                  <div className="space-y-3 rounded-lg border border-slate-800 bg-slate-800/30 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        Prediction:
                      </span>
                      <Badge
                        className={`border-0 ${
                          selectedAlert.prediction === "anomaly"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {selectedAlert.prediction}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        Anomaly Score:
                      </span>
                      <span className="font-semibold text-white">
                        {selectedAlert.anomalyScore.toFixed(2)}/100
                      </span>
                    </div>
                    {selectedAlert.confidence !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">
                          Confidence:
                        </span>
                        <span className="font-semibold text-white">
                          {selectedAlert.confidence.toFixed(2)}%
                        </span>
                      </div>
                    )}
                    {selectedAlert.explanation && (
                      <div className="mt-3 rounded border border-slate-700 bg-slate-900/50 p-3">
                        <p className="text-xs leading-relaxed text-slate-300">
                          {selectedAlert.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Feature Importance */}
              {selectedAlert.featureImportance &&
                selectedAlert.featureImportance.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Feature Importance (Top 5)
                    </h3>
                    <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4">
                      <div className="space-y-3">
                        {selectedAlert.featureImportance
                          .slice(0, 5)
                          .map((feature: any, index: any) => (
                            <div key={index} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs capitalize text-slate-400">
                                  {feature.feature.replace(/_/g, " ")}
                                </span>
                                <span className="flex items-center gap-1 text-xs font-medium text-white">
                                  {feature.importance > 0 ? (
                                    <TrendingUp className="h-3 w-3 text-red-400" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3 text-green-400" />
                                  )}
                                  {Math.abs(feature.importance).toFixed(6)}
                                </span>
                              </div>
                              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                                <div
                                  className={`h-full ${
                                    feature.importance > 0
                                      ? "bg-red-500"
                                      : "bg-green-500"
                                  }`}
                                  style={{
                                    width: `${Math.min(
                                      feature.absImportance * 100000,
                                      100
                                    )}%`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                      <p className="mt-3 text-xs text-slate-500">
                        Red indicates risk-increasing factors, green indicates
                        risk-decreasing factors
                      </p>
                    </div>
                  </div>
                )}

              {/* Additional Details */}
              {selectedAlert.details &&
                Object.keys(selectedAlert.details).length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Additional Details
                    </h3>
                    <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-800/30 p-4">
                      {Object.entries(selectedAlert.details).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between border-b border-slate-700/50 py-2 last:border-0"
                          >
                            <span className="text-sm capitalize text-slate-400">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>
                            <span className="font-medium text-white">
                              {typeof value === "boolean"
                                ? value
                                  ? "Yes"
                                  : "No"
                                : String(value)}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Alert ID */}
              <div className="rounded-lg border border-slate-700 bg-slate-800/20 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Alert ID:</span>
                  <span className="font-mono text-xs text-slate-400">
                    {selectedAlert._id}
                  </span>
                </div>
                {selectedAlert.biometricDataId && (
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Biometric Data ID:
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {selectedAlert.biometricDataId}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
