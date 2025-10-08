"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

const departments = [
  "Computer Science",
  "Engineering",
  "Business Administration",
  "Medicine",
  "Law",
  "Arts & Humanities",
  "Natural Sciences",
  "Social Sciences",
];

export default function StudentSignupPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    regNumber: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    const userData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: "student",
      department: formData.department,
      studentId: formData.regNumber,
    };

    const response = await register(userData);

    if (response) {
       router.push("/student/dashboard");
    } else {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to home</span>
        </Link>

        <div className="glass rounded-2xl p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Create Student Account
            </h1>
            <p className="text-slate-400 text-sm">
              Register to access your financial portal
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-300">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="bg-navy-800/50 border-navy-700 text-white placeholder:text-slate-500 focus:border-gold-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regNumber" className="text-slate-300">
                Registration Number
              </Label>
              <Input
                id="regNumber"
                type="text"
                placeholder="e.g., 2024/CS/001"
                value={formData.regNumber}
                onChange={(e) =>
                  setFormData({ ...formData, regNumber: e.target.value })
                }
                className="bg-navy-800/50 border-navy-700 text-white placeholder:text-slate-500 focus:border-gold-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@university.edu"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-navy-800/50 border-navy-700 text-white placeholder:text-slate-500 focus:border-gold-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-slate-300">
                Department
              </Label>
              <select
                id="department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="w-full rounded-lg bg-navy-800/50 border border-navy-700 text-white px-3 py-2 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                required
              >
                <option value="">Select your department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="bg-navy-800/50 border-navy-700 text-white placeholder:text-slate-500 focus:border-gold-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="bg-navy-800/50 border-navy-700 text-white placeholder:text-slate-500 focus:border-gold-500"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold"
            >
              Create Account
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/auth/student/login"
              className="text-gold-400 hover:text-gold-300 font-medium transition-colors"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
