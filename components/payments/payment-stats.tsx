import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils/format"
import type { Transaction } from "@/lib/types"

interface PaymentStatsProps {
  transactions: Transaction[]
}

export function PaymentStats({ transactions }: PaymentStatsProps) {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0)
  const completed = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)
  const pending = transactions.filter((t) => t.status === "pending").reduce((sum, t) => sum + t.amount, 0)
  const flagged = transactions.filter((t) => t.status === "flagged").length

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
        <p className="text-sm text-slate-400">Total Amount</p>
        <p className="mt-2 text-2xl font-bold text-white">{formatCurrency(total)}</p>
      </Card>
      <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
        <p className="text-sm text-slate-400">Completed</p>
        <p className="mt-2 text-2xl font-bold text-emerald-400">{formatCurrency(completed)}</p>
      </Card>
      <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
        <p className="text-sm text-slate-400">Pending</p>
        <p className="mt-2 text-2xl font-bold text-amber-400">{formatCurrency(pending)}</p>
      </Card>
      <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
        <p className="text-sm text-slate-400">Flagged</p>
        <p className="mt-2 text-2xl font-bold text-orange-400">{flagged}</p>
      </Card>
    </div>
  )
}
