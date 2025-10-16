"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { User } from "@/lib/types"
import { Search, Eye } from "lucide-react"

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

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
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">All Users</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={roleFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setRoleFilter("all")}
              className={
                roleFilter === "all"
                  ? "bg-gold-500 text-navy-900 hover:bg-gold-600"
                  : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
              }
            >
              All
            </Button>
            <Button
              variant={roleFilter === "student" ? "default" : "outline"}
              size="sm"
              onClick={() => setRoleFilter("student")}
              className={
                roleFilter === "student"
                  ? "bg-gold-500 text-navy-900 hover:bg-gold-600"
                  : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
              }
            >
              Students
            </Button>
            <Button
              variant={roleFilter === "faculty" ? "default" : "outline"}
              size="sm"
              onClick={() => setRoleFilter("faculty")}
              className={
                roleFilter === "faculty"
                  ? "bg-gold-500 text-navy-900 hover:bg-gold-600"
                  : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
              }
            >
              Faculty
            </Button>
            <Button
              variant={roleFilter === "staff" ? "default" : "outline"}
              size="sm"
              onClick={() => setRoleFilter("staff")}
              className={
                roleFilter === "staff"
                  ? "bg-gold-500 text-navy-900 hover:bg-gold-600"
                  : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
              }
            >
              Staff
            </Button>
          </div>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by name, email, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-slate-700 bg-slate-800/50 pl-10 text-white placeholder-slate-400"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/30 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-lg font-semibold text-navy-900">
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
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <Badge className={`border ${getRoleBadgeColor(user.role)} capitalize`}>{user.role}</Badge>
                  {user.department && <p className="mt-1 text-xs text-slate-500">{user.department}</p>}
                </div>
                {/* <Link href={`/admin/users/${user._id}`}>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link> */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
