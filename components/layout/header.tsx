"use client";

import { Bell, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-navy-900/95 backdrop-blur supports-[backdrop-filter]:bg-navy-900/80">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions, users, or alerts..."
              className="h-10 w-full rounded-lg border border-slate-700 bg-slate-800/50 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs text-white">
              3
            </Badge>
          </button>
        </div>
      </div>
    </header>
  );
}
