"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  Briefcase,
  Shield,
  Bell,
  Settings,
  LogOut,
  UserCircle,
  Wallet,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Manage Payment", href: "/admin/payment", icon: Wallet },
  { name: "Threat Detection", href: "/admin/ai-insights", icon: Shield },
  { name: "Students", href: "/admin/students", icon: GraduationCap },
  { name: "Faculty", href: "/admin/faculty", icon: Users },
  { name: "Departments", href: "/admin/departments", icon: Building2 },
  { name: "Staff", href: "/admin/staff", icon: Briefcase },
  { name: "Users", href: "/admin/users", icon: UserCircle },
  { name: "Notifications", href: "/admin/notifications", icon: Bell },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800 bg-navy-900">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-6">
          <div>
            <h1 className="text-lg font-semibold text-white">UniFinance</h1>
            <p className="text-xs text-slate-400">Uni Portal</p>
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
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gold-500/10 text-gold-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "AU"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-white">
                {user?.name || "Admin User"}
              </p>
              <p className="truncate text-xs text-slate-400">
                {user?.email || "N/A"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
