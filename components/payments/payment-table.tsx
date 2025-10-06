"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Transaction, PaymentType } from "@/lib/types";
import {
  formatCurrency,
  formatDateTime,
  getStatusColor,
} from "@/lib/utils/format";
import { Search, Filter, Download, Eye } from "lucide-react";

interface PaymentTableProps {
  transactions: Transaction[];
  title: string;
  type?: PaymentType;
}

export function PaymentTable({ transactions, title, type }: PaymentTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.reference?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !type || t.type === type;
    return matchesSearch && matchesType;
  });

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white">
              {title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by name, description, or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-slate-700 bg-slate-800/50 pl-10 text-white placeholder-slate-400"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 text-left text-sm text-slate-400">
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Reference</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-slate-800 text-sm last:border-0"
                  >
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-white">
                          {transaction.userName}
                        </p>
                        <p className="text-xs text-slate-400">
                          {transaction.department}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 text-slate-300">
                      {transaction.description}
                    </td>
                    <td className="py-4 font-semibold text-white">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="py-4">
                      <Badge
                        variant="outline"
                        className={`border-0 ${getStatusColor(
                          transaction.status
                        )} bg-transparent capitalize`}
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-slate-400">
                      {formatDateTime(transaction.date)}
                    </td>
                    <td className="py-4 font-mono text-xs text-slate-400">
                      {transaction.reference}
                    </td>
                    <td className="py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-slate-400 hover:text-white"
                        onClick={() => handleViewDetails(transaction)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTransactions.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-slate-400">No transactions found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="border-slate-800 bg-slate-900 text-white sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Transaction Details
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Complete information about this transaction
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Student Name</p>
                  <p className="font-medium">{selectedTransaction.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Department</p>
                  <p className="font-medium">
                    {selectedTransaction.department}
                  </p>
                </div>
              </div>

              {selectedTransaction.email && (
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="font-medium">{selectedTransaction.email}</p>
                </div>
              )}

              {selectedTransaction.phone && (
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="font-medium">{selectedTransaction.phone}</p>
                </div>
              )}

              <div className="border-t border-slate-800 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Transaction Type</p>
                    <p className="font-medium capitalize">
                      {selectedTransaction.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Amount</p>
                    <p className="text-lg font-semibold text-green-500">
                      {formatCurrency(selectedTransaction.amount)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-400">Description</p>
                <p className="font-medium">{selectedTransaction.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Status</p>
                  <Badge
                    variant="outline"
                    className={`border-0 ${getStatusColor(
                      selectedTransaction.status
                    )} bg-transparent capitalize`}
                  >
                    {selectedTransaction.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Date</p>
                  <p className="font-medium">
                    {formatDateTime(selectedTransaction.date)}
                  </p>
                </div>
              </div>

              {selectedTransaction.reference && (
                <div>
                  <p className="text-sm text-slate-400">Reference Number</p>
                  <p className="font-mono text-sm font-medium">
                    {selectedTransaction.reference}
                  </p>
                </div>
              )}

              {selectedTransaction.semester && (
                <div>
                  <p className="text-sm text-slate-400">Semester</p>
                  <p className="font-medium">{selectedTransaction.semester}</p>
                </div>
              )}

              {selectedTransaction.academicYear && (
                <div>
                  <p className="text-sm text-slate-400">Academic Year</p>
                  <p className="font-medium">
                    {selectedTransaction.academicYear}
                  </p>
                </div>
              )}

              {selectedTransaction.paymentMethod && (
                <div>
                  <p className="text-sm text-slate-400">Payment Method</p>
                  <p className="font-medium capitalize">
                    {selectedTransaction.paymentMethod}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
