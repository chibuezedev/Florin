"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockNotifications } from "@/lib/mock-data"
import { NotificationCard } from "@/components/notifications/notification-card"
import { NotificationFilters } from "@/components/notifications/notification-filters"
import { NotificationStats } from "@/components/notifications/notification-stats"
import { CheckCheck, Trash2 } from "lucide-react"

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all")
  const [notifications, setNotifications] = useState(mockNotifications)

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.read
    return notification.type === filter
  })

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const handleClearAll = () => {
    setNotifications(notifications.filter((n) => !n.read))
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="mt-1 text-slate-400">Stay updated with security alerts and system events</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Read
          </Button>
        </div>
      </div>

      <NotificationStats notifications={notifications} />

      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white">All Notifications</CardTitle>
            <NotificationFilters activeFilter={filter} onFilterChange={setFilter} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-slate-400">No notifications found</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
