import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Transaction } from "@/lib/types"
import { formatCurrency, formatDateTime, getStatusColor } from "@/lib/utils/format"
import { DollarSign } from "lucide-react"

interface PaymentHistoryProps {
  transactions: Transaction[]
}

export function PaymentHistory({ transactions }: PaymentHistoryProps) {
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0)
  const completedAmount = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)

  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">Payment History</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-right">
              <p className="text-slate-400">Total</p>
              <p className="font-semibold text-white">{formatCurrency(totalAmount)}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400">Completed</p>
              <p className="font-semibold text-emerald-400">{formatCurrency(completedAmount)}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="py-8 text-center text-slate-400">No payment history available</div>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/30 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gold-500/10 p-2">
                    <DollarSign className="h-5 w-5 text-gold-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{transaction.description}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                      <span className="capitalize">{transaction.type.replace("_", " ")}</span>
                      <span>•</span>
                      <span>{formatDateTime(transaction.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">{formatCurrency(transaction.amount)}</p>
                  <Badge
                    variant="outline"
                    className={`mt-1 border-0 ${getStatusColor(transaction.status)} bg-transparent text-xs capitalize`}
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
