import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockTransactions } from "@/lib/mock-data"
import { formatCurrency, formatRelativeTime, getStatusColor } from "@/lib/utils/format"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export function RecentTransactions() {
  const recentTransactions = mockTransactions.slice(0, 5)

  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    transaction.type === "tuition" || transaction.type === "grant"
                      ? "bg-emerald-500/10"
                      : "bg-blue-500/10"
                  }`}
                >
                  {transaction.type === "tuition" || transaction.type === "grant" ? (
                    <ArrowDownRight className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{transaction.userName}</p>
                  <p className="text-xs text-slate-400">{transaction.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{formatCurrency(transaction.amount)}</p>
                <div className="mt-1 flex items-center justify-end gap-2">
                  <Badge
                    variant="outline"
                    className={`border-0 text-xs ${getStatusColor(transaction.status)} bg-transparent`}
                  >
                    {transaction.status}
                  </Badge>
                  <span className="text-xs text-slate-500">{formatRelativeTime(transaction.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
