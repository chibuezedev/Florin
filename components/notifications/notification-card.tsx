import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Notification } from "@/lib/mock-data"
import { formatRelativeTime } from "@/lib/utils/format"
import { AlertTriangle, DollarSign, Settings, User, ExternalLink } from "lucide-react"

interface NotificationCardProps {
  notification: Notification
  onMarkAsRead?: (id: string) => void
}

const notificationIcons = {
  security: AlertTriangle,
  payment: DollarSign,
  system: Settings,
  user: User,
}

const priorityColors = {
  critical: "border-red-500/50 bg-red-950/30",
  high: "border-orange-500/50 bg-orange-950/30",
  medium: "border-amber-500/50 bg-amber-950/30",
  low: "border-slate-700 bg-slate-800/30",
}

const priorityBadgeColors = {
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  low: "bg-slate-500/10 text-slate-400 border-slate-500/20",
}

const typeColors = {
  security: "bg-red-500/10 text-red-400",
  payment: "bg-emerald-500/10 text-emerald-400",
  system: "bg-blue-500/10 text-blue-400",
  user: "bg-purple-500/10 text-purple-400",
}

export function NotificationCard({ notification, onMarkAsRead }: NotificationCardProps) {
  const Icon = notificationIcons[notification.type]

  return (
    <div
      className={`rounded-lg border p-4 ${priorityColors[notification.priority]} ${!notification.read ? "border-l-4" : ""}`}
    >
      <div className="flex items-start gap-4">
        <div className={`rounded-lg ${typeColors[notification.type]} p-2`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{notification.title}</h3>
                {!notification.read && <div className="h-2 w-2 rounded-full bg-gold-500" />}
              </div>
              <p className="mt-1 text-sm text-slate-300">{notification.message}</p>
              <div className="mt-3 flex items-center gap-3">
                <Badge className={`border capitalize ${priorityBadgeColors[notification.priority]}`}>
                  {notification.priority}
                </Badge>
                <Badge variant="outline" className="border-slate-700 bg-slate-800/50 text-xs capitalize text-slate-400">
                  {notification.type}
                </Badge>
                <span className="text-xs text-slate-500">{formatRelativeTime(notification.timestamp)}</span>
              </div>
            </div>
          </div>
          {notification.actionUrl && (
            <div className="mt-3">
              <Link href={notification.actionUrl}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  View Details
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
