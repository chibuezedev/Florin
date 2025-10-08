"use client";

import type React from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { StudentSidebar } from "@/components/layout/studentSidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/student/login");
    } else if (!isLoading && user && user.role !== "student") {
      router.push("/unauthorized");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== "student") {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <StudentSidebar />
      <div className="flex flex-1 flex-col overflow-hidden pl-64">
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
