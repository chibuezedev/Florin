import { Card } from "@/components/ui/card"
import { mockAIAlerts } from "@/lib/mock-data"
import { AlertTriangle, Shield, Activity, CheckCircle } from "lucide-react"

export function ThreatOverview() {
  const activeAlerts = mockAIAlerts.filter((a) => !a.resolved)
  const criticalAlerts = activeAlerts.filter((a) => a.severity === "critical").length
  const highAlerts = activeAlerts.filter((a) => a.severity === "high").length
  const mediumAlerts = activeAlerts.filter((a) => a.severity === "medium").length
  const resolvedToday = mockAIAlerts.filter((a) => a.resolved).length

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="border-red-900/50 bg-gradient-to-br from-red-950/50 to-slate-900/50 p-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-red-500/20 p-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Critical Threats</p>
            <p className="text-2xl font-bold text-red-400">{criticalAlerts}</p>
          </div>
        </div>
      </Card>
      <Card className="border-orange-900/50 bg-gradient-to-br from-orange-950/50 to-slate-900/50 p-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-orange-500/20 p-3">
            <Shield className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">High Priority</p>
            <p className="text-2xl font-bold text-orange-400">{highAlerts}</p>
          </div>
        </div>
      </Card>
      <Card className="border-amber-900/50 bg-gradient-to-br from-amber-950/50 to-slate-900/50 p-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-amber-500/20 p-3">
            <Activity className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Medium Priority</p>
            <p className="text-2xl font-bold text-amber-400">{mediumAlerts}</p>
          </div>
        </div>
      </Card>
      <Card className="border-emerald-900/50 bg-gradient-to-br from-emerald-950/50 to-slate-900/50 p-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-500/20 p-3">
            <CheckCircle className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Resolved Today</p>
            <p className="text-2xl font-bold text-emerald-400">{resolvedToday}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
