"use client";

import { useState } from "react";
import {
  DollarSign,
  Wallet,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building2,
  CreditCard,
  TrendingUp,
  RefreshCw,
  History,
  Loader2,
  X,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWithdrawal, type WithdrawalHistory } from "@/hooks/useWithdrawal";
import { useToast } from "@/hooks/use-toast";
import { biometricTracker } from "@/lib/biometricTracker";

const NIGERIAN_BANKS = [
  "Access Bank",
  "Citibank Nigeria",
  "Ecobank Nigeria",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank (FCMB)",
  "Globus Bank",
  "Guaranty Trust Bank (GTBank)",
  "Heritage Bank",
  "Keystone Bank",
  "Polaris Bank",
  "Providus Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "SunTrust Bank",
  "Titan Trust Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
];

export default function WithdrawalPage() {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedBankAccount, setSelectedBankAccount] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [newBankName, setNewBankName] = useState("");
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [newAccountName, setNewAccountName] = useState("");
  const [newBankIsDefault, setNewBankIsDefault] = useState(false);

  const {
    stats,
    history,
    bankAccounts,
    isLoading,
    isWithdrawing,
    isAddingBank,
    requestWithdrawal,
    addBankAccount,
    refetch,
  } = useWithdrawal();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusConfig = (status: WithdrawalHistory["status"]) => {
    const configs: Record<
      WithdrawalHistory["status"],
      { icon: any; color: string; bg: string; border: string; label: string }
    > = {
      pending: {
        icon: Clock,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        label: "Pending",
      },
      processing: {
        icon: Loader2,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        label: "Processing",
      },
      completed: {
        icon: CheckCircle2,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        label: "Completed",
      },
      failed: {
        icon: XCircle,
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        label: "Failed",
      },
      cancelled: {
        icon: XCircle,
        color: "text-slate-400",
        bg: "bg-slate-500/10",
        border: "border-slate-500/30",
        label: "Cancelled",
      },
    };
    return configs[status];
  };

  const handleWithdrawClick = () => {
    const amount = Number.parseFloat(withdrawAmount);

    if (!withdrawAmount || amount <= 0) {
      setErrorMessage("Please enter a valid withdrawal amount");
      setShowErrorModal(true);
      return;
    }

    if (!selectedBankAccount) {
      setErrorMessage("Please select a bank account for withdrawal");
      setShowErrorModal(true);
      return;
    }

    if (stats && amount > stats.availableForWithdrawal) {
      setErrorMessage(
        `Insufficient balance. Maximum available: ${formatCurrency(
          stats.availableForWithdrawal
        )}`
      );
      setShowErrorModal(true);
      return;
    }

    if (amount < 1000) {
      setErrorMessage("Minimum withdrawal amount is ₦1,000");
      setShowErrorModal(true);
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmWithdrawal = async () => {
    setShowConfirmModal(false);

    const biometrics = biometricTracker.collectData();

    const result = await requestWithdrawal({
      amount: Number.parseFloat(withdrawAmount),
      bankAccountId: selectedBankAccount,
      biometrics,
    });

    if (result.success) {
      setShowSuccessModal(true);
      setWithdrawAmount("");
      setSelectedBankAccount("");
    } else {
      setErrorMessage(result.message);
      setShowErrorModal(true);
    }
  };

  const handleQuickAmount = (amount: number) => {
    setWithdrawAmount(amount.toString());
  };

  const calculateFee = () => {
    const amount = Number.parseFloat(withdrawAmount) || 0;
    const feePercentage = stats?.platformFeePercentage || 1.5;
    return amount * (feePercentage / 100);
  };

  const calculateNetAmount = () => {
    const amount = Number.parseFloat(withdrawAmount) || 0;
    return amount - calculateFee();
  };

  const selectedBank = bankAccounts.find(
    (acc: any) => acc._id === selectedBankAccount
  );

  const handleAddBankAccount = async () => {
    if (!newBankName || !newAccountNumber || !newAccountName) {
      setErrorMessage("Please fill in all bank account details");
      setShowErrorModal(true);
      return;
    }
    const biometrics = biometricTracker.collectData();

    const result = await addBankAccount({
      bankName: newBankName,
      accountNumber: newAccountNumber,
      accountName: newAccountName,
      isDefault: newBankIsDefault,
      biometrics: biometrics,
    });

    if (result.success) {
      setShowAddBankModal(false);
      setNewBankName("");
      setNewAccountNumber("");
      setNewAccountName("");
      setNewBankIsDefault(false);
      refetch();
    } else {
      setErrorMessage(result.message);
      setShowErrorModal(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-amber-500" />
          <p className="mt-4 text-slate-400">Loading withdrawal data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Withdrawals</h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage your revenue and withdraw funds
            </p>
          </div>
          <Button
            variant="outline"
            className="border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
            onClick={() => refetch()}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-800 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-500/20 p-3">
                  <Wallet className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Total Balance</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(stats?.totalBalance || 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-gradient-to-br from-amber-500/10 to-amber-500/5 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-amber-500/20 p-3">
                  <DollarSign className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">
                    Available to Withdraw
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(stats?.availableForWithdrawal || 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-500/20 p-3">
                  <Clock className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Pending Withdrawals</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(stats?.pendingWithdrawals || 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-gradient-to-br from-slate-500/10 to-slate-500/5 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-slate-500/20 p-3">
                  <TrendingUp className="h-6 w-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Total Withdrawn</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(stats?.totalWithdrawn || 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Withdrawal Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <ArrowDownRight className="h-5 w-5 text-amber-400" />
                  Request Withdrawal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quick Amount Buttons */}
                <div className="space-y-2">
                  <Label className="text-slate-300">Quick Select</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {[500000, 1000000, 2500000, 5000000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        className={`border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer ${
                          withdrawAmount === amount.toString()
                            ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                            : "bg-slate-900/50"
                        }`}
                        onClick={() => handleQuickAmount(amount)}
                      >
                        {formatCurrency(amount)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-slate-300">
                    Withdrawal Amount (₦)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      className="border-slate-700 bg-slate-900 pl-9 text-white text-lg placeholder:text-slate-500"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    Available:{" "}
                    {formatCurrency(stats?.availableForWithdrawal || 0)}
                  </p>
                </div>

                {/* Bank Account Selection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bankAccount" className="text-slate-300">
                      Select Bank Account
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 cursor-pointer h-auto py-1 px-2"
                      onClick={() => setShowAddBankModal(true)}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Add New
                    </Button>
                  </div>
                  <Select
                    value={selectedBankAccount}
                    onValueChange={setSelectedBankAccount}
                  >
                    <SelectTrigger className="border-slate-700 bg-slate-900 text-white cursor-pointer">
                      <SelectValue placeholder="Choose bank account" />
                    </SelectTrigger>
                    <SelectContent className="border-slate-700 bg-slate-900">
                      {bankAccounts.length === 0 ? (
                        <div className="px-3 py-6 text-center">
                          <Building2 className="mx-auto h-8 w-8 text-slate-600 mb-2" />
                          <p className="text-sm text-slate-400">
                            No bank accounts yet
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 cursor-pointer"
                            onClick={() => setShowAddBankModal(true)}
                          >
                            <Plus className="mr-1 h-3 w-3" />
                            Add Bank Account
                          </Button>
                        </div>
                      ) : (
                        bankAccounts.map((account: any) => (
                          <SelectItem
                            key={account._id}
                            value={account._id}
                            className="text-white focus:bg-slate-800 focus:text-white"
                          >
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-slate-400" />
                              <span>{account.bankName}</span>
                              <span className="text-slate-500">
                                - {account.accountNumber}
                              </span>
                              {account.isDefault && (
                                <Badge className="ml-2 bg-amber-500/20 text-amber-400 text-xs">
                                  Default
                                </Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Fee Breakdown */}
                {withdrawAmount && Number.parseFloat(withdrawAmount) > 0 && (
                  <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 space-y-3">
                    <h4 className="text-sm font-medium text-slate-300">
                      Transaction Summary
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">
                          Withdrawal Amount
                        </span>
                        <span className="text-white">
                          {formatCurrency(
                            Number.parseFloat(withdrawAmount) || 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">
                          Platform Fee ({stats?.platformFeePercentage || 1.5}%)
                        </span>
                        <span className="text-red-400">
                          -{formatCurrency(calculateFee())}
                        </span>
                      </div>
                      <div className="border-t border-slate-700 pt-2 flex justify-between">
                        <span className="text-slate-300 font-medium">
                          You will receive
                        </span>
                        <span className="text-emerald-400 font-bold text-lg">
                          {formatCurrency(calculateNetAmount())}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Withdraw Button */}
                <Button
                  className="w-full bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer py-6 text-lg font-semibold"
                  onClick={handleWithdrawClick}
                  disabled={isWithdrawing}
                >
                  {isWithdrawing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="mr-2 h-5 w-5" />
                      Request Withdrawal
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <CreditCard className="h-5 w-5 text-blue-400" />
                  Account Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-slate-900 p-3">
                  <span className="text-sm text-slate-400">Paid Payments</span>
                  <span className="text-sm font-medium text-emerald-400">
                    {stats?.totalPaidPayments || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-900 p-3">
                  <span className="text-sm text-slate-400">
                    Total Transactions
                  </span>
                  <span className="text-sm font-medium text-blue-400">
                    {stats?.totalTransactions || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-900 p-3">
                  <span className="text-sm text-slate-400">
                    Last Withdrawal
                  </span>
                  <span className="text-sm font-medium text-white">
                    {stats?.lastWithdrawalDate
                      ? formatDate(stats.lastWithdrawalDate)
                      : "Never"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Bank Accounts */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg text-white">
                    <Building2 className="h-5 w-5 text-emerald-400" />
                    Bank Accounts
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 cursor-pointer h-8 w-8 p-0"
                    onClick={() => setShowAddBankModal(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {bankAccounts.length === 0 ? (
                  <div className="text-center py-6">
                    <div className="rounded-full bg-slate-800 p-4 w-fit mx-auto mb-3">
                      <Building2 className="h-8 w-8 text-slate-600" />
                    </div>
                    <p className="mt-4 font-medium text-slate-300">
                      No bank accounts added
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Your withdrawal requests will appear here
                    </p>
                  </div>
                ) : (
                  bankAccounts.map((account: any) => (
                    <div
                      key={account._id}
                      className="rounded-lg border border-slate-700 bg-slate-900 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">
                          {account.bankName}
                        </span>
                        {account.isDefault && (
                          <Badge className="bg-amber-500/20 text-amber-400 text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {account.accountNumber}
                      </p>
                      <p className="text-xs text-slate-500">
                        {account.accountName}
                      </p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Withdrawal History */}
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <History className="h-6 w-6 text-amber-400" />
                Withdrawal History
              </CardTitle>
              <Badge
                variant="outline"
                className="border-amber-500/30 bg-amber-500/10 text-amber-400"
              >
                {history.length} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 py-16">
                <div className="rounded-full bg-slate-800 p-4">
                  <History className="h-8 w-8 text-slate-600" />
                </div>
                <p className="mt-4 font-medium text-slate-300">
                  No withdrawal history
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Your withdrawal requests will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((withdrawal: any) => {
                  const statusConfig = getStatusConfig(withdrawal.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <Card
                      key={withdrawal._id}
                      className={`overflow-hidden border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/50 transition-all hover:border-slate-700`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div
                              className={`rounded-full p-2 ${statusConfig.bg} ${statusConfig.border} border`}
                            >
                              <StatusIcon
                                className={`h-5 w-5 ${statusConfig.color} ${
                                  withdrawal.status === "processing"
                                    ? "animate-spin"
                                    : ""
                                }`}
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white">
                                  {formatCurrency(withdrawal.amount)}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={`${statusConfig.bg} ${statusConfig.border} ${statusConfig.color}`}
                                >
                                  {statusConfig.label}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-400 mt-1">
                                {withdrawal.bankName} -{" "}
                                {withdrawal.accountNumber}
                              </p>
                              <p className="text-xs text-slate-500 mt-1">
                                Ref: {withdrawal.reference}
                              </p>
                              {withdrawal.failureReason && (
                                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  {withdrawal.failureReason}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-400">
                              Requested: {formatDate(withdrawal.requestedAt)}
                            </p>
                            {withdrawal.processedAt && (
                              <p className="text-xs text-slate-500">
                                Processed: {formatDate(withdrawal.processedAt)}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="border-slate-800 bg-slate-900 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <AlertCircle className="h-6 w-6 text-amber-400" />
              Confirm Withdrawal
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Please review your withdrawal details before confirming.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Amount</span>
                <span className="text-white font-semibold">
                  {formatCurrency(Number.parseFloat(withdrawAmount) || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Platform Fee</span>
                <span className="text-red-400">
                  -{formatCurrency(calculateFee())}
                </span>
              </div>
              <div className="border-t border-slate-700 pt-2 flex justify-between">
                <span className="text-slate-300">You will receive</span>
                <span className="text-emerald-400 font-bold">
                  {formatCurrency(calculateNetAmount())}
                </span>
              </div>
            </div>
            {selectedBank && (
              <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <p className="text-sm text-slate-400 mb-1">
                  Destination Account
                </p>
                <p className="text-white font-medium">
                  {selectedBank.bankName}
                </p>
                <p className="text-slate-400 text-sm">
                  {selectedBank.accountNumber}
                </p>
                <p className="text-slate-500 text-xs">
                  {selectedBank.accountName}
                </p>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white cursor-pointer"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer"
              onClick={handleConfirmWithdrawal}
              disabled={isWithdrawing}
            >
              {isWithdrawing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Withdrawal"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Error Modal */}
      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent className="border-red-500/30 bg-slate-900 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl text-red-400">
              <XCircle className="h-6 w-6" />
              Withdrawal Error
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-slate-300">{errorMessage}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-slate-700 text-white hover:bg-slate-600 cursor-pointer"
              onClick={() => setShowErrorModal(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="border-emerald-500/30 bg-slate-900 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
              Withdrawal Requested
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
              <p className="text-slate-300">
                Your withdrawal request has been submitted successfully and is
                being processed.
              </p>
              <p className="text-sm text-slate-400 mt-2">
                You will be notified once the funds are transferred to your
                account.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-emerald-500 text-slate-950 hover:bg-emerald-400 cursor-pointer"
              onClick={() => setShowSuccessModal(false)}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Bank Account Modal */}
      <Dialog open={showAddBankModal} onOpenChange={setShowAddBankModal}>
        <DialogContent className="border-slate-800 bg-slate-900 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Building2 className="h-6 w-6 text-emerald-400" />
              Add Bank Account
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter your bank account details for withdrawals.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Bank Name Select */}
            <div className="space-y-2">
              <Label htmlFor="newBankName" className="text-slate-300">
                Bank Name
              </Label>
              <Select value={newBankName} onValueChange={setNewBankName}>
                <SelectTrigger className="border-slate-700 bg-slate-800 text-white cursor-pointer">
                  <SelectValue placeholder="Select your bank" />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-900 max-h-60">
                  {NIGERIAN_BANKS.map((bank) => (
                    <SelectItem
                      key={bank}
                      value={bank}
                      className="text-white focus:bg-slate-800 focus:text-white cursor-pointer"
                    >
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Account Number */}
            <div className="space-y-2">
              <Label htmlFor="newAccountNumber" className="text-slate-300">
                Account Number
              </Label>
              <Input
                id="newAccountNumber"
                type="text"
                maxLength={10}
                placeholder="Enter 10-digit account number"
                className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                value={newAccountNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setNewAccountNumber(value);
                }}
              />
              <p className="text-xs text-slate-500">
                {newAccountNumber.length}/10 digits
              </p>
            </div>

            {/* Account Name */}
            <div className="space-y-2">
              <Label htmlFor="newAccountName" className="text-slate-300">
                Account Holder Name
              </Label>
              <Input
                id="newAccountName"
                type="text"
                placeholder="Enter account holder name"
                className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
              />
            </div>

            {/* Set as Default */}
            <div className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
              <Checkbox
                id="setDefault"
                checked={newBankIsDefault}
                onCheckedChange={(checked) =>
                  setNewBankIsDefault(checked as boolean)
                }
                className="border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
              />
              <label
                htmlFor="setDefault"
                className="text-sm text-slate-300 cursor-pointer flex-1"
              >
                Set as default withdrawal account
              </label>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white cursor-pointer"
              onClick={() => {
                setShowAddBankModal(false);
                setNewBankName("");
                setNewAccountNumber("");
                setNewAccountName("");
                setNewBankIsDefault(false);
              }}
              disabled={isAddingBank}
            >
              Cancel
            </Button>
            <Button
              className="bg-emerald-500 text-white hover:bg-emerald-400 cursor-pointer"
              onClick={handleAddBankAccount}
              disabled={isAddingBank}
            >
              {isAddingBank ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Account
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
