"use client"

import { Button } from "@/components/ui/button"

interface NotificationFiltersProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function NotificationFilters({ activeFilter, onFilterChange }: NotificationFiltersProps) {
  const filters = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "security", label: "Security" },
    { id: "payment", label: "Payment" },
    { id: "system", label: "System" },
    { id: "user", label: "User" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
          className={
            activeFilter === filter.id
              ? "bg-gold-500 text-navy-900 hover:bg-gold-600"
              : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
          }
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}
