import { mockTransactions } from "@/lib/mock-data"
import { PaymentTable } from "@/components/payments/payment-table"
import { PaymentStats } from "@/components/payments/payment-stats"

export default function DepartmentsPage() {
  const departmentTransactions = mockTransactions.filter((t) => t.type === "departmental" || t.type === "grant")

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Department Finances</h1>
        <p className="mt-1 text-slate-400">Manage departmental expenses and grant disbursements</p>
      </div>

      <PaymentStats transactions={departmentTransactions} />
      <PaymentTable transactions={departmentTransactions} title="All Department Transactions" />
    </div>
  )
}
