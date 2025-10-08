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

export default function StudentLoginPage() {
  const router = useRouter();
  const { login, error, isLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    regNumber: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const credentials = {
      studentId: formData.regNumber,
      password: formData.password,
    };

    const success = await login(credentials);

    if (success) {
      localStorage.setItem("studentRegNumber", formData.regNumber);
      router.push("/student/dashboard");
    }
    setLoading(false);
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
              Student Login
            </h1>
            <p className="text-slate-400 text-sm">
              Enter your credentials to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
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
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-navy-700 bg-navy-800/50"
                />
                <span>Remember me</span>
              </label>
              <Link
                href="/student/forgot-password"
                className="text-gold-400 hover:text-gold-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold"
            >
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-400">
            {"Don't have an account? "}
            <Link
              href="/auth/student/signup"
              className="text-gold-400 hover:text-gold-300 font-medium transition-colors"
            >
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
