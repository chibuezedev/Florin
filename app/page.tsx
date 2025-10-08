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
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
        className="border-b border-border/40 backdrop-blur-xl bg-background/80 sticky top-0 z-50"
      >
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/20">
                <GraduationCap className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground tracking-tight">
                UniFinance
              </span>
            </motion.div>
            <nav className="flex items-center gap-6">
              <Link
                href="/auth/student/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Login
              </Link>
              <Link href="/auth/admin/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border/60 text-foreground hover:bg-secondary/80 bg-transparent font-medium"
                >
                  Uni Portal
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
          >
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground">
              AI-Powered Financial Security
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-foreground leading-[1.1] tracking-tight text-balance"
          >
            University Financial
            <br />
            Management
            <br />
            <span className="text-accent">Made Simple</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty"
          >
            A comprehensive financial platform with AI-driven security
            monitoring for students and administrators
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-20 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={cardVariants}>
            <Link href="/auth/student/login" className="group block">
              <motion.div
                className="relative rounded-3xl p-8 md:p-10 bg-card border border-border/50 shadow-lg shadow-black/5 overflow-hidden transition-all hover:shadow-xl hover:shadow-accent/10"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-6 shadow-lg shadow-accent/10"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <GraduationCap className="h-8 w-8" />
                  </motion.div>

                  <h3 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                    Student Portal
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed text-pretty">
                    Access your payment history, view pending fees, and make
                    secure payments with ease
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                        <DollarSign className="h-4 w-4 text-accent" />
                      </div>
                      <span className="font-medium">View payment history</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                        <Lock className="h-4 w-4 text-accent" />
                      </div>
                      <span className="font-medium">
                        Secure payment processing
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                        <BarChart3 className="h-4 w-4 text-accent" />
                      </div>
                      <span className="font-medium">Track your finances</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                    <span>Access Student Portal</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Link href="/auth/admin/login" className="group block">
              <motion.div
                className="relative rounded-3xl p-8 md:p-10 bg-card border border-border/50 shadow-lg shadow-black/5 overflow-hidden transition-all hover:shadow-xl hover:shadow-chart-2/10"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-chart-2/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-chart-2/10 text-chart-2 mb-6 shadow-lg shadow-chart-2/10"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Shield className="h-8 w-8" />
                  </motion.div>

                  <h3 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                    Uni Portal
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed text-pretty">
                    Manage university finances, monitor transactions, and detect
                    security threats with AI
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-2/10">
                        <BarChart3 className="h-4 w-4 text-chart-2" />
                      </div>
                      <span className="font-medium">Financial analytics</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-2/10">
                        <Shield className="h-4 w-4 text-chart-2" />
                      </div>
                      <span className="font-medium">AI threat detection</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-2/10">
                        <Users className="h-4 w-4 text-chart-2" />
                      </div>
                      <span className="font-medium">Manage users</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-chart-2 font-semibold group-hover:gap-3 transition-all">
                    <span>Access UI Portal</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
