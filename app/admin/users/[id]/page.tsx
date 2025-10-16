"use client";

import { mockAccessLogs } from "@/lib/mock-data";
import { useAllPayments } from "@/hooks/usePayments";
import { useUsers } from "@/hooks/useUser";
import { UserProfileCard } from "@/components/users/user-profile-card";
import { PaymentHistory } from "@/components/users/payment-history";
import { AccessLogs } from "@/components/users/access-logs";
import { notFound } from "next/navigation";

interface UserProfilePageProps {
  params: { id: string };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const { users } = useUsers();
  const { payments } = useAllPayments();

  const user = users.find((u) => u.id === params.id);

  if (!user) {
    notFound();
  }

  const userTransactions = payments.filter((t) => t.userId === user.id);
  const userAccessLogs = mockAccessLogs.filter((l) => l.userId === user.id);

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">User Profile</h1>
        <p className="mt-1 text-slate-400">
          Detailed information and activity logs
        </p>
      </div>

      <UserProfileCard user={user} />

      <div className="grid gap-6 lg:grid-cols-2">
        <PaymentHistory transactions={userTransactions} />
        <AccessLogs logs={userAccessLogs} />
      </div>
    </div>
  );
}
