"use client";
import { useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mockTransactions = [
  {
    id: "1",
    type: "credit",
    description: "Wallet Top-up",
    amount: 50000,
    date: "2024-02-10",
    balance: 125000,
  },
  {
    id: "2",
    type: "debit",
    description: "Tuition Payment",
    amount: 250000,
    date: "2024-02-08",
    balance: 75000,
  },
  {
    id: "3",
    type: "credit",
    description: "Refund - Library Fee",
    amount: 5000,
    date: "2024-02-05",
    balance: 325000,
  },
  {
    id: "4",
    type: "debit",
    description: "Accommodation Fee",
    amount: 80000,
    date: "2024-02-01",
    balance: 320000,
  },
];

export default function WalletPage() {
  const [walletBalance] = useState(125000);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Wallet</h1>
          <p className="text-slate-400">
            Manage your wallet balance and transactions
          </p>
        </div>

        {/* Wallet Card */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-amber-100 text-sm">Available Balance</p>
                  <h2 className="text-4xl font-bold text-white">
                    ₦{walletBalance.toLocaleString()}
                  </h2>
                </div>
              </div>
              <Button className="bg-white text-amber-700 hover:bg-amber-50 font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                Top Up
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-emerald-300" />
                  <span className="text-xs text-amber-100">Total Received</span>
                </div>
                <p className="text-xl font-bold text-white">₦55,000</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="h-4 w-4 text-red-300" />
                  <span className="text-xs text-amber-100">Total Spent</span>
                </div>
                <p className="text-xl font-bold text-white">₦330,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button className="bg-slate-900/50 border border-white/10 rounded-xl p-6 hover:bg-slate-900/70 transition-all backdrop-blur-sm group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                <Plus className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold mb-1">Add Money</h3>
                <p className="text-sm text-slate-400">Top up your wallet</p>
              </div>
            </div>
          </button>

          <button className="bg-slate-900/50 border border-white/10 rounded-xl p-6 hover:bg-slate-900/70 transition-all backdrop-blur-sm group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                <CreditCard className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold mb-1">Make Payment</h3>
                <p className="text-sm text-slate-400">Pay fees directly</p>
              </div>
            </div>
          </button>

          <button className="bg-slate-900/50 border border-white/10 rounded-xl p-6 hover:bg-slate-900/70 transition-all backdrop-blur-sm group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                <DollarSign className="h-6 w-6 text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold mb-1">
                  Request Refund
                </h3>
                <p className="text-sm text-slate-400">Submit a request</p>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">
              Recent Transactions
            </h3>
          </div>
          <div className="divide-y divide-white/5">
            {mockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="px-6 py-4 hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        transaction.type === "credit"
                          ? "bg-emerald-500/10"
                          : "bg-red-500/10"
                      }`}
                    >
                      {transaction.type === "credit" ? (
                        <ArrowDownRight className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(transaction.date).toLocaleDateString()} •
                        Balance: ₦{transaction.balance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${
                        transaction.type === "credit"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.type === "credit" ? "+" : "-"}₦
                      {transaction.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
