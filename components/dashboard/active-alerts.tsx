import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockAIAlerts } from "@/lib/mock-data"
import { formatRelativeTime, getThreatLevelColor } from "@/lib/utils/format"
import { AlertTriangle, Shield, Activity, Lock } from "lucide-react"

const alertIcons = {
  behavioral: Activity,
  access: Lock,
  transaction: AlertTriangle,
  login: Shield,
}

export function ActiveAlerts() {
  const activeAlerts = mockAIAlerts.filter((alert) => !alert.resolved).slice(0, 4)

  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Active Security Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeAlerts.map((alert) => {
            const Icon = alertIcons[alert.type]
            return (
              <div
                key={alert.id}
                className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-800/30 p-4"
              >
                <div className={`rounded-lg ${getThreatLevelColor(alert.severity)} p-2`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-white">{alert.userName}</p>
                      <p className="mt-1 text-xs text-slate-400">{alert.description}</p>
                    </div>
                    <Badge className={`${getThreatLevelColor(alert.severity)} border-0 text-xs`}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                    <span>Score: {alert.anomalyScore}</span>
                    <span>{formatRelativeTime(alert.timestamp)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
