import { mockTransactions, mockUsers } from "@/lib/mock-data"
import { PaymentTable } from "@/components/payments/payment-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, DollarSign } from "lucide-react"

export default function StaffPage() {
  const staffUsers = mockUsers.filter((u) => u.role === "staff")
  const staffTransactions = mockTransactions.filter((t) => {
    const user = mockUsers.find((u) => u.id === t.userId)
    return user?.role === "staff"
  })

  const totalStaffPayments = staffTransactions.reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Staff Management</h1>
        <p className="mt-1 text-slate-400">Manage staff accounts and related transactions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Staff</p>
              <p className="text-2xl font-bold text-white">{staffUsers.length}</p>
            </div>
          </div>
        </Card>
        <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-3">
              <Briefcase className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Active Transactions</p>
              <p className="text-2xl font-bold text-white">{staffTransactions.length}</p>
            </div>
          </div>
        </Card>
        <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gold-500/10 p-3">
              <DollarSign className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Payments</p>
              <p className="text-2xl font-bold text-white">${(totalStaffPayments / 1000).toFixed(1)}K</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Staff Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {staffUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/30 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-lg font-semibold text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-slate-400">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-300">{user.department}</p>
                  <p className="text-xs text-slate-500">ID: {user.employeeId}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <PaymentTable transactions={staffTransactions} title="Staff Transactions" />
    </div>
  )
}
