"use client";

import Link from "next/link";
import {
  GraduationCap,
  Shield,
  ArrowRight,
  DollarSign,
  Lock,
  BarChart3,
  Users,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
        className="border-b border-black/10 backdrop-blur-xl bg-white/95 sticky top-0 z-50"
      >
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xl font-semibold text-black tracking-tight">
                UniFinance
              </span>
            </motion.div>
            <nav className="flex items-center gap-6">
              <Link
                href="/auth/student/login"
                className="text-sm text-black/60 hover:text-black transition-colors font-medium"
              >
                Login
              </Link>
              <Link href="/auth/admin/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-black/20 text-black hover:bg-black/5 bg-transparent font-medium cursor-pointer"
                >
                  Admin Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E9B63B]/10 border border-[#E9B63B]/30 mb-8"
          >
            <Sparkles className="h-4 w-4 text-[#E9B63B]" />
            <span className="text-sm font-medium text-black">
              AI-Powered Financial Security
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-black leading-[1.1] tracking-tight text-balance"
          >
            University Financial
            <br />
            Management
            <br />
            <span className="text-[#E9B63B]">Made Simple</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-black/60 leading-relaxed text-pretty"
          >
            A financial platform with AI-driven security monitoring for students and administrators
          </motion.p>
        </motion.div>

        {/* <motion.div
          className="mt-20 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={cardVariants}>
            <Link href="/auth/student/login" className="group block">
              <motion.div
                className="relative rounded-3xl p-8 md:p-10 bg-white border-2 border-black/10 shadow-lg shadow-black/5 overflow-hidden transition-all hover:shadow-xl hover:shadow-[#E9B63B]/20 hover:border-[#E9B63B]/30"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#E9B63B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E9B63B]/10 text-[#E9B63B] mb-6 shadow-lg shadow-[#E9B63B]/10"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <GraduationCap className="h-8 w-8" />
                  </motion.div>

                  <h3 className="text-3xl font-bold text-black mb-4 tracking-tight">
                    Student Portal
                  </h3>
                  <p className="text-black/60 mb-8 leading-relaxed text-pretty">
                    Access your payment history, view pending fees, and make
                    secure payments with ease
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-black">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E9B63B]/10">
                        <DollarSign className="h-4 w-4 text-[#E9B63B]" />
                      </div>
                      <span className="font-medium">View payment history</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-black">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E9B63B]/10">
                        <Lock className="h-4 w-4 text-[#E9B63B]" />
                      </div>
                      <span className="font-medium">
                        Secure payment processing
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-black">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E9B63B]/10">
                        <BarChart3 className="h-4 w-4 text-[#E9B63B]" />
                      </div>
                      <span className="font-medium">Track your finances</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#E9B63B] font-semibold group-hover:gap-3 transition-all">
                    <span>Access Student Portal</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div> */}

          {/* <motion.div variants={cardVariants}>
            <Link href="/auth/admin/login" className="group block">
              <motion.div
                className="relative rounded-3xl p-8 md:p-10 bg-black text-white border-2 border-black shadow-lg shadow-black/20 overflow-hidden transition-all hover:shadow-xl hover:shadow-[#E9B63B]/30"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#E9B63B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E9B63B]/20 text-[#E9B63B] mb-6 shadow-lg shadow-[#E9B63B]/20"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Shield className="h-8 w-8" />
                  </motion.div>

                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                    Uni Portal
                  </h3>
                  <p className="text-white/70 mb-8 leading-relaxed text-pretty">
                    Manage university finances, monitor transactions, and detect
                    security threats with AI
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-white">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E9B63B]/20">
                        <BarChart3 className="h-4 w-4 text-[#E9B63B]" />
                      </div>
                      <span className="font-medium">Financial analytics</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E9B63B]/20">
                        <Shield className="h-4 w-4 text-[#E9B63B]" />
                      </div>
                      <span className="font-medium">AI threat detection</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E9B63B]/20">
                        <Users className="h-4 w-4 text-[#E9B63B]" />
                      </div>
                      <span className="font-medium">Manage users</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#E9B63B] font-semibold group-hover:gap-3 transition-all">
                    <span>Access UI Portal</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div> */}
        {/* </motion.div> */}
      </section>
    </div>
  );
}
