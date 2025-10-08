"use client";
import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  DollarSign,
  Calendar,
  Trash2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mockNotifications = [
  {
    id: "1",
    type: "payment",
    title: "Payment Successful",
    message:
      "Your tuition fee payment of ₦250,000 has been processed successfully.",
    date: "2024-02-10T10:30:00",
    read: false,
    icon: CheckCircle2,
    color: "emerald",
  },
  {
    id: "2",
    type: "reminder",
    title: "Payment Due Soon",
    message:
      "Laboratory fee of ₦15,000 is due in 3 days. Please make payment to avoid late fees.",
    date: "2024-02-09T14:20:00",
    read: false,
    icon: AlertCircle,
    color: "amber",
  },
  {
    id: "3",
    type: "info",
    title: "New Receipt Available",
    message:
      "Your receipt for accommodation fee is now available for download.",
    date: "2024-02-08T09:15:00",
    read: true,
    icon: Info,
    color: "blue",
  },
  {
    id: "4",
    type: "payment",
    title: "Wallet Top-up Confirmed",
    message: "₦50,000 has been added to your wallet successfully.",
    date: "2024-02-07T16:45:00",
    read: true,
    icon: DollarSign,
    color: "emerald",
  },
  {
    id: "5",
    type: "reminder",
    title: "Academic Calendar Update",
    message:
      "Second semester payment deadline has been extended to March 15, 2024.",
    date: "2024-02-06T11:00:00",
    read: true,
    icon: Calendar,
    color: "blue",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: "bg-emerald-500/10 text-emerald-400",
      amber: "bg-amber-500/10 text-amber-400",
      blue: "bg-blue-500/10 text-blue-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-sm font-semibold rounded-full border border-amber-500/30">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-slate-400">
            Stay updated with your payment activities
          </p>
        </div>

        {/* Actions Bar */}
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={
                  filter === "all"
                    ? "bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                    : "bg-slate-800/50 border-white/10 text-white hover:bg-slate-800"
                }
              >
                All ({notifications.length})
              </Button>
              <Button
                size="sm"
                variant={filter === "unread" ? "default" : "outline"}
                onClick={() => setFilter("unread")}
                className={
                  filter === "unread"
                    ? "bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                    : "bg-slate-800/50 border-white/10 text-white hover:bg-slate-800"
                }
              >
                Unread ({unreadCount})
              </Button>
            </div>
            {unreadCount > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={markAllAsRead}
                className="bg-slate-800/50 border-white/10 text-white hover:bg-slate-800"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-12 text-center backdrop-blur-sm">
              <Bell className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                No notifications
              </h3>
              <p className="text-slate-400">
                {filter === "unread"
                  ? "You're all caught up!"
                  : "You don't have any notifications yet."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`bg-slate-900/50 border rounded-xl p-5 backdrop-blur-sm transition-all hover:border-white/20 ${
                    notification.read
                      ? "border-white/10"
                      : "border-amber-500/30 bg-amber-500/5"
                  }`}
                >
                  <div className="flex gap-4">
                    <div
                      className={`p-3 rounded-lg ${getColorClasses(
                        notification.color
                      )} flex-shrink-0`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-white font-semibold">
                          {notification.title}
                        </h3>
                        <span className="text-xs text-slate-400 whitespace-nowrap">
                          {new Date(notification.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mb-3">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                            className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 h-8 text-xs"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Mark as read
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 text-xs"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
