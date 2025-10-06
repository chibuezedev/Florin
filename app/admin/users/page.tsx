import { mockUsers } from "@/lib/mock-data"
import { UserList } from "@/components/users/user-list"
import { Card } from "@/components/ui/card"
import { Users, GraduationCap, Briefcase, UserCheck } from "lucide-react"

export default function UsersPage() {
  const studentCount = mockUsers.filter((u) => u.role === "student").length
  const facultyCount = mockUsers.filter((u) => u.role === "faculty").length
  const staffCount = mockUsers.filter((u) => u.role === "staff").length

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <p className="mt-1 text-slate-400">View and manage all system users</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Users</p>
              <p className="text-2xl font-bold text-white">{mockUsers.length}</p>
            </div>
          </div>
        </Card>
        <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-500/10 p-3">
              <GraduationCap className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Students</p>
              <p className="text-2xl font-bold text-white">{studentCount}</p>
            </div>
          </div>
        </Card>
        <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-3">
              <UserCheck className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Faculty</p>
              <p className="text-2xl font-bold text-white">{facultyCount}</p>
            </div>
          </div>
        </Card>
        <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gold-500/10 p-3">
              <Briefcase className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Staff</p>
              <p className="text-2xl font-bold text-white">{staffCount}</p>
            </div>
          </div>
        </Card>
      </div>

      <UserList users={mockUsers} />
    </div>
  )
}
