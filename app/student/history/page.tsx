"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  DollarSign,
} from "lucide-react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePayments } from "../../../hooks/usePayments";

export default function PaymentHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { payments, count } = usePayments(
    statusFilter === "all" ? {} : { status: statusFilter }
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
      case "pending":
        return <Clock className="h-5 w-5 text-amber-400" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      failed: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return styles[status as keyof typeof styles] || "";
  };

  function formatCurrency(amount: number) {
    return `₦${amount.toLocaleString("en-NG")}`;
  }

  const totalPaid = (payments: any[]) => {
    const total = payments.reduce((acc: number, payment: any) => {
      if (payment.status === "paid") {
        return acc + payment.amount;
      }
      return acc;
    }, 0);
    return formatCurrency(Math.floor(total));
  };

  const totalPending = (payments: any[]) => {
    const total = payments.reduce((acc: number, payment: any) => {
      if (payment.status === "pending") {
        return acc + payment.amount;
      }
      return acc;
    }, 0);
    return formatCurrency(Math.floor(total));
  };

    const handleDownload = (receipt: any) => {
      const doc = new jsPDF();
  
      doc.setFontSize(20);
      doc.text("Payment Receipt", 105, 20, { align: "center" });
  
      doc.setFontSize(12);
      doc.text(`Transaction Number: ${receipt.transactionReference}`, 20, 40);
      doc.text(`Student: ${receipt.studentId?.name || "N/A"}`, 20, 50);
      doc.text(`Amount Paid: ₦${receipt.amount.toLocaleString()}`, 20, 60);
      doc.text(`Description: ${receipt.description}`, 20, 70);
      doc.text(
        `Date: ${new Date(receipt.paidDate).toLocaleDateString()}`,
        20,
        80
      );
      doc.text(`Payment Status: ${receipt.status || "N/A"}`, 20, 90);
  
      doc.text("Thank you for your payment.", 20, 110);
  
      doc.save(`${receipt.receiptNumber}.pdf`);
    };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Payment History
          </h1>
          <p className="text-slate-400">
            View and track all your payment transactions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              </div>
              <span className="text-xs text-slate-400">This Year</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {totalPaid(payments)}
            </h3>
            <p className="text-sm text-slate-400">Total Paid</p>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <Clock className="h-6 w-6 text-amber-400" />
              </div>
              <span className="text-xs text-slate-400">Outstanding</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {totalPending(payments)}
            </h3>
            <p className="text-sm text-slate-400">Pending Payments</p>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-xs text-slate-400">All Time</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{count}</h3>
            <p className="text-sm text-slate-400">Total Transactions</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search by description or reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 bg-slate-800/50 border-white/10 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="bg-slate-800/50 border-white/10 text-white hover:bg-slate-800"
            >
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Payment List */}
        <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-white/10">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                    Description
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                    Reference
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                    Amount
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {payments.map((payment: any) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        {new Date(payment.updatedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {payment.description}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {payment.semester} • {payment.academicYear}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                        {payment.transactionReference}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-white">
                        ₦{payment.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusBadge(
                            payment.status
                          )}`}
                        >
                          {payment.status.charAt(0).toUpperCase() +
                            payment.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        onClick={() => handleDownload(payment)}
                        size="sm"
                        variant="ghost"
                        className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
