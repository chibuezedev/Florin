import { Card } from "@/components/ui/card"
import type { Notification } from "@/lib/mock-data"
import { Bell, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface NotificationStatsProps {
  notifications: Notification[]
}

export function NotificationStats({ notifications }: NotificationStatsProps) {
  const unreadCount = notifications.filter((n) => !n.read).length
  const criticalCount = notifications.filter((n) => n.priority === "critical" && !n.read).length
  const securityCount = notifications.filter((n) => n.type === "security" && !n.read).length
  const todayCount = notifications.filter((n) => {
    const notifDate = new Date(n.timestamp)
    const today = new Date()
    return notifDate.toDateString() === today.toDateString()
  }).length

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gold-500/10 p-3">
            <Bell className="h-6 w-6 text-gold-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Unread</p>
            <p className="text-2xl font-bold text-white">{unreadCount}</p>
          </div>
        </div>
      </Card>
      <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-red-500/10 p-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Critical</p>
            <p className="text-2xl font-bold text-white">{criticalCount}</p>
          </div>
        </div>
      </Card>
      <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-orange-500/10 p-3">
            <CheckCircle className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Security</p>
            <p className="text-2xl font-bold text-white">{securityCount}</p>
          </div>
        </div>
      </Card>
      <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-3">
            <Clock className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Today</p>
            <p className="text-2xl font-bold text-white">{todayCount}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
