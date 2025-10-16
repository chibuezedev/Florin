import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/lib/types"
import { Mail, Calendar, Building2, Hash } from "lucide-react"
import { formatDate } from "@/lib/utils/format"

interface UserProfileCardProps {
  user: User
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "student":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "faculty":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20"
      case "staff":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      case "admin":
        return "bg-gold-500/10 text-gold-400 border-gold-500/20"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20"
    }
  }

  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-3xl font-bold text-navy-900">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <Badge className={`mt-2 border ${getRoleBadgeColor(user.role)} capitalize`}>{user.role}</Badge>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="h-4 w-4" />
                {user.email}
              </div>
              {user.department && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Building2 className="h-4 w-4" />
                  {user.department}
                </div>
              )}
              {user.studentId && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Hash className="h-4 w-4" />
                  Student ID: {user.studentId}
                </div>
              )}
              {user.employeeId && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Hash className="h-4 w-4" />
                  Employee ID: {user.employeeId}
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar className="h-4 w-4" />
                Joined {formatDate(user.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
