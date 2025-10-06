import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change?: number
  icon: LucideIcon
  iconColor: string
}

export function StatCard({ title, value, change, icon: Icon, iconColor }: StatCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <Card className="border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              {isPositive && <TrendingUp className="h-4 w-4 text-emerald-500" />}
              {isNegative && <TrendingDown className="h-4 w-4 text-red-500" />}
              <span
                className={`text-sm font-medium ${isPositive ? "text-emerald-500" : isNegative ? "text-red-500" : "text-slate-400"}`}
              >
                {isPositive ? "+" : ""}
                {change}%
              </span>
              <span className="text-sm text-slate-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={`rounded-lg ${iconColor} p-3`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  )
}
