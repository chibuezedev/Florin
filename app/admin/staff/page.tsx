"use client";
import { useState } from "react";
import { useUsers } from "@/hooks/useUser";
import { useAllPayments } from "@/hooks/usePayments";
import { PaymentTable } from "@/components/payments/payment-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, DollarSign, Plus, X } from "lucide-react";

const ENDPOINT = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function StaffPage() {
  const { users, refetch } = useUsers();
  const staffUsers = users.filter((u) => u.role === "staff");
  const { payments } = useAllPayments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    employeeId: "",
    program: "",
  });
  const [error, setError] = useState<string | null>(null);

  const staffTransactions = payments.filter((t) => {
    const user = users.find((u) => u._id === t.userId);
    return user?.role === "staff";
  });

  const totalStaffPayments = staffTransactions.reduce(
    (sum, t) => sum + (t.amount || 0),
    0
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${ENDPOINT}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...formData,
          role: "staff",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsModalOpen(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          department: "",
          employeeId: "",
          program: "",
        });
        refetch();
      } else {
        setError(data.message || "Failed to create staff user");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Create staff error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Staff Management</h1>
          <p className="mt-1 text-slate-400">
            Manage staff accounts and related transactions
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-gold-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-600"
        >
          <Plus className="h-4 w-4" />
          Add Staff
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Staff</p>
              <p className="text-2xl font-bold text-white">
                {staffUsers.length}
              </p>
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
              <p className="text-2xl font-bold text-white">
                {staffTransactions.length}
              </p>
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
              <p className="text-2xl font-bold text-white">
                ${(totalStaffPayments / 1000).toFixed(1)}K
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            Staff Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {staffUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/30 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-lg font-semibold text-white">
                    {user.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-slate-400">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-300">
                    {user.department}
                  </p>
                  <p className="text-xs text-slate-500">
                    ID: {user.employeeId}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <PaymentTable
        transactions={staffTransactions}
        title="Staff Transactions"
      />

      {/* Create Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Add New Staff Member
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  placeholder="john.doe@university.edu"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Employee ID
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  placeholder="EMP001"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  placeholder="Finance"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Program/Unit
                </label>
                <input
                  type="text"
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  placeholder="Administrative Services"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-lg bg-gold-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
