import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { AccessLog } from "@/lib/types"
import { formatDateTime } from "@/lib/utils/format"
import { CheckCircle, XCircle, Shield } from "lucide-react"

interface AccessLogsProps {
  logs: AccessLog[]
}

export function AccessLogs({ logs }: AccessLogsProps) {
  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Access Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {logs.length === 0 ? (
            <div className="py-8 text-center text-slate-400">No access logs available</div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between rounded-lg border border-slate-800 bg-slate-800/30 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-lg p-2 ${log.success ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
                    {log.success ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">{log.action}</p>
                      {log.riskScore > 50 && (
                        <Badge className="border-0 bg-orange-500/10 text-xs text-orange-400">
                          <Shield className="mr-1 h-3 w-3" />
                          Risk: {log.riskScore}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{log.resource}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                      <span>{formatDateTime(log.timestamp)}</span>
                      <span>•</span>
                      <span className="font-mono">{log.ipAddress}</span>
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`border-0 text-xs ${log.success ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}
                >
                  {log.success ? "Success" : "Failed"}
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
