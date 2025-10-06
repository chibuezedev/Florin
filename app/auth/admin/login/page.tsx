"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Shield, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      window.location.href = "/admin/dashboard";
    }
  };

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
            {/* <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500 mb-4">
              <Shield className="h-8 w-8 text-navy-950" />
            </div> */}
            <h1 className="text-2xl font-bold text-white mb-2">Uni Portal</h1>
            <p className="text-slate-400 text-sm">
              Sign in to access the management dashboard
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@university.edu"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
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
                href="/admin/forgot-password"
                className="text-gold-400 hover:text-gold-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold"
            >
              Sign In to Dashboard
            </Button>
          </form>
          <div className="mt-6 p-4 rounded-lg bg-gold-500/5 border border-gold-500/20">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-300 font-medium mb-1">
                  Secure Admin Access
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All admin sessions are monitored and logged. Unauthorized
                  access attempts will be reported.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-slate-500 mt-6">
          Need help? Contact IT Support at{" "}
          <a
            href="mailto:support@university.edu"
            className="text-gold-400 hover:text-gold-300"
          >
            support@university.edu
          </a>
        </p>
      </div>
    </div>
  );
}
