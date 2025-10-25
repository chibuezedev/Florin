"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  FileText,
  User,
  Bell,
  Settings,
  LogOut,
  CreditCard,
  History,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  // { name: "Make Payment", href: "/student/payments", icon: CreditCard },
  { name: "Payment History", href: "/student/history", icon: History },
  { name: "My Wallet", href: "/student/wallet", icon: Wallet },
  { name: "Receipts", href: "/student/receipts", icon: FileText },
  { name: "My Profile", href: "/student/profile", icon: User },
  // { name: "Notifications", href: "/student/notifications", icon: Bell },
  { name: "Settings", href: "/student/settings", icon: Settings },
];

export function StudentSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-slate-900/95 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-900">
            U
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">UniFinance</h1>
            <p className="text-xs text-slate-400">Student Portal</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-400 border border-amber-500/20"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "ST"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-white">
                {user?.name || "Student"}
              </p>
              <p className="truncate text-xs text-slate-400">
                {user?.studentId || "ID: N/A"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-md hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
          <div className="rounded-lg bg-slate-800/50 border border-white/5 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Level</span>
              <span className="font-semibold text-amber-400">
                {user?.level || "100"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-slate-400">Status</span>
              <span className="font-semibold text-emerald-400">Active</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
