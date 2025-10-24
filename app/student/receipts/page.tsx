"use client";
import { useState } from "react";
import {
  Download,
  Eye,
  FileText,
  Search,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import jsPDF from "jspdf";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAllReceipts } from "@/hooks/usePayments";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ReceiptsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { receipts, loading, error } = useAllReceipts();

  const handleDownload = (receipt: any) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Payment Receipt", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Receipt Number: ${receipt.receiptNumber}`, 20, 40);
    doc.text(`Student: ${receipt.studentId?.name || "N/A"}`, 20, 50);
    doc.text(`Amount Paid: ₦${receipt.amount.toLocaleString()}`, 20, 60);
    doc.text(`Description: ${receipt.description}`, 20, 70);
    doc.text(
      `Date: ${new Date(receipt.paidDate).toLocaleDateString()}`,
      20,
      80
    );
    doc.text(`Payment Method: ${receipt.paymentMethod || "N/A"}`, 20, 90);

    doc.text("Thank you for your payment.", 20, 110);

    doc.save(`${receipt.receiptNumber}.pdf`);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-5xl mx-auto flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          <Alert className="bg-red-500/10 border-red-500/20">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-400">
              {error}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Receipts</h1>
          <p className="text-slate-400">
            Download and manage your payment receipts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <FileText className="h-6 w-6 text-amber-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{receipts.length}</h3>
            <p className="text-sm text-slate-400">Total Receipts</p>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{receipts.reduce((acc, receipt) => acc + receipt.amount, 0).toLocaleString()}</h3>
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
          {receipts.map((receipt) => (
            <div
              key={receipt.id}
              className="bg-slate-900/50 border border-white/10 rounded-xl p-6 hover:border-amber-500/30 transition-all backdrop-blur-sm group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                  <FileText className="h-6 w-6 text-amber-400" />
                </div>
                <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                  Downloaded {receipt.downloadCount || 0}x
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
                    {new Date(receipt.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Period</span>
                  <span className="text-slate-300">
                    {receipt.description.toLowerCase().includes("first")
                      ? "First Semester"
                      : receipt.description.toLowerCase().includes("second")
                      ? "Second Semester"
                      : receipt.semester}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleDownload(receipt)}
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
