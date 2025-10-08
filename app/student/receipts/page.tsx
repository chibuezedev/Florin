"use client";
import { useState } from "react";
import { Download, Eye, FileText, Search, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockReceipts = [
  {
    id: "1",
    receiptNumber: "RCP-2024-001",
    description: "Tuition Fee - First Semester",
    amount: 250000,
    date: "2024-01-15",
    semester: "First Semester",
    academicYear: "2023/2024",
    downloadCount: 3,
  },
  {
    id: "2",
    receiptNumber: "RCP-2024-002",
    description: "Accommodation Fee",
    amount: 80000,
    date: "2024-01-20",
    semester: "First Semester",
    academicYear: "2023/2024",
    downloadCount: 1,
  },
  {
    id: "3",
    receiptNumber: "RCP-2024-003",
    description: "Library Fee",
    amount: 5000,
    date: "2024-01-18",
    semester: "First Semester",
    academicYear: "2023/2024",
    downloadCount: 2,
  },
  {
    id: "4",
    receiptNumber: "RCP-2024-004",
    description: "Medical Fee",
    amount: 10000,
    date: "2024-01-22",
    semester: "First Semester",
    academicYear: "2023/2024",
    downloadCount: 0,
  },
];

export default function ReceiptsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Receipts</h1>
          <p className="text-slate-400">
            Download and manage your payment receipts
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <FileText className="h-6 w-6 text-amber-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">12</h3>
            <p className="text-sm text-slate-400">Total Receipts</p>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">₦345,000</h3>
            <p className="text-sm text-slate-400">Total Amount</p>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Download className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">18</h3>
            <p className="text-sm text-slate-400">Total Downloads</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search receipts by number or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <Button
              variant="outline"
              className="bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20"
            >
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>
        </div>

        {/* Receipts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockReceipts.map((receipt) => (
            <div
              key={receipt.id}
              className="bg-slate-900/50 border border-white/10 rounded-xl p-6 hover:border-amber-500/30 transition-all backdrop-blur-sm group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                  <FileText className="h-6 w-6 text-amber-400" />
                </div>
                <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                  Downloaded {receipt.downloadCount}x
                </span>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {receipt.description}
                </h3>
                <code className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                  {receipt.receiptNumber}
                </code>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Amount</span>
                  <span className="font-semibold text-white">
                    ₦{receipt.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Date</span>
                  <span className="text-slate-300">
                    {new Date(receipt.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Period</span>
                  <span className="text-slate-300">{receipt.semester}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-slate-800/50 border-white/10 text-white hover:bg-slate-800"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
