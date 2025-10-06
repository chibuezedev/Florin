import { mockTransactions } from "@/lib/mock-data"
import { PaymentTable } from "@/components/payments/payment-table"
import { PaymentStats } from "@/components/payments/payment-stats"

export default function StudentsPage() {
  const studentTransactions = mockTransactions.filter((t) => t.type === "tuition" || t.type === "student_services")

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Student Payments</h1>
        <p className="mt-1 text-slate-400">Manage tuition fees and student service payments</p>
      </div>

      <PaymentStats transactions={studentTransactions} />
      <PaymentTable transactions={studentTransactions} title="All Student Transactions" />
    </div>
  )
}
