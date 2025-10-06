import { mockTransactions } from "@/lib/mock-data"
import { PaymentTable } from "@/components/payments/payment-table"
import { PaymentStats } from "@/components/payments/payment-stats"

export default function FacultyPage() {
  const facultyTransactions = mockTransactions.filter((t) => t.type === "faculty_allocation")

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Faculty Allocations</h1>
        <p className="mt-1 text-slate-400">Manage faculty budgets and research allocations</p>
      </div>

      <PaymentStats transactions={facultyTransactions} />
      <PaymentTable transactions={facultyTransactions} title="All Faculty Transactions" type="faculty_allocation" />
    </div>
  )
}
