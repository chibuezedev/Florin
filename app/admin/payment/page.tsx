"use client";

import { useState } from "react";
import {
  DollarSign,
  Users,
  Calendar,
  FileText,
  Building2,
  GraduationCap,
  Save,
  X,
  CheckCircle2,
  Clock,
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { usePayouts } from "@/hooks/usePayments";
import {
  DEPARTMENTS,
  FACULTIES,
  LEVELS,
  PAYMENT_TYPES,
} from "@/lib/utils/payment";
import { useToast } from "@/hooks/use-toast";
import { biometricTracker } from "@/lib/biometricTracker";

export default function CreatePaymentPage() {
  const [title, setTitle] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [semester, setSemester] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [targetType, setTargetType] = useState<string>("all");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedFaculties, setSelectedFaculties] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const { toast } = useToast();
  const biometrics = biometricTracker.collectData();
  const { createdPayments, isLoading, isCreating, createPayment } =
    usePayouts();

  const handleDepartmentToggle = (dept: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const handleFacultyToggle = (faculty: string) => {
    setSelectedFaculties((prev) =>
      prev.includes(faculty)
        ? prev.filter((f) => f !== faculty)
        : [...prev, faculty]
    );
  };

  const handleLevelToggle = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleCreatePayment = async () => {
    if (!title || !paymentType || !amount || !dueDate) {
      toast({
        title: "Validation Error",
        description:
          "Please fill in all required fields (Title, Payment Type, Amount, Due Date)",
        variant: "destructive",
      });
      return;
    }

    try {
      const paymentData = {
        title,
        description,
        amount: Number.parseFloat(amount),
        paymentType,
        semester: semester || "First Semester",
        academicYear: academicYear || "2024/2025",
        dueDate,
        targetType: targetType as "all" | "department" | "faculty" | "level",
        departments:
          targetType === "department" ? selectedDepartments : undefined,
        faculties: targetType === "faculty" ? selectedFaculties : undefined,
        levels: targetType === "level" ? selectedLevels : undefined,
        notes,
        biometrics,
      };

      await createPayment(paymentData);

      toast({
        title: "Payment Created",
        description: `${title} has been successfully created.`,
      });

      // Reset form
      setTitle("");
      setPaymentType("");
      setDescription("");
      setAmount("");
      setSemester("");
      setAcademicYear("");
      setDueDate("");
      setNotes("");
      setTargetType("all");
      setSelectedDepartments([]);
      setSelectedFaculties([]);
      setSelectedLevels([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setTitle("");
    setPaymentType("");
    setDescription("");
    setAmount("");
    setSemester("");
    setAcademicYear("");
    setDueDate("");
    setNotes("");
    setTargetType("all");
    setSelectedDepartments([]);
    setSelectedFaculties([]);
    setSelectedLevels([]);
  };

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
    });
  };

  const getPaymentTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      tuition: "Tuition Fee",
      accommodation: "Accommodation",
      registration: "Registration",
      library: "Library Fee",
      laboratory: "Laboratory Fee",
      medical: "Medical Fee",
      sports: "Sports Fee",
      examination: "Examination Fee",
      other: "Other",
    };
    return typeMap[type] || type;
  };

  const calculateExpectedRevenue = () => {
    const amountNum = Number.parseFloat(amount) || 0;
    if (targetType === "all") {
      return amountNum * 167;
    } else if (targetType === "department") {
      return amountNum * selectedDepartments.length * 1247;
    } else if (targetType === "faculty") {
      return amountNum * selectedFaculties.length * 2000;
    } else if (targetType === "level") {
      return amountNum * selectedLevels.length * 2500;
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Create Payment Request
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Configure and assign payments to students
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white"
              onClick={handleCancel}
              disabled={isCreating}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              className="bg-amber-500 text-slate-950 hover:bg-amber-400"
              onClick={handleCreatePayment}
              disabled={isCreating}
            >
              <Save className="mr-2 h-4 w-4" />
              {isCreating ? "Creating..." : "Create Payment"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <FileText className="h-5 w-5 text-amber-400" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-slate-300">
                      Payment Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., First Semester Tuition"
                      className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentType" className="text-slate-300">
                      Payment Type
                    </Label>
                    <Select value={paymentType} onValueChange={setPaymentType}>
                      <SelectTrigger className="border-slate-700 bg-slate-900 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="border-slate-700 bg-slate-900">
                        {PAYMENT_TYPES.map((type) => (
                          <SelectItem
                            key={type.value}
                            value={type.value}
                            className="text-white focus:bg-slate-800 focus:text-white"
                          >
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide details about this payment..."
                    className="min-h-[100px] border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-slate-300">
                      Amount (₦)
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        className="border-slate-700 bg-slate-900 pl-9 text-white placeholder:text-slate-500"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester" className="text-slate-300">
                      Semester
                    </Label>
                    <Select value={semester} onValueChange={setSemester}>
                      <SelectTrigger className="border-slate-700 bg-slate-900 text-white">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent className="border-slate-700 bg-slate-900">
                        <SelectItem
                          value="First Semester"
                          className="text-white focus:bg-slate-800 focus:text-white"
                        >
                          First Semester
                        </SelectItem>
                        <SelectItem
                          value="Second Semester"
                          className="text-white focus:bg-slate-800 focus:text-white"
                        >
                          Second Semester
                        </SelectItem>
                        <SelectItem
                          value="Summer"
                          className="text-white focus:bg-slate-800 focus:text-white"
                        >
                          Summer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academicYear" className="text-slate-300">
                      Academic Year
                    </Label>
                    <Input
                      id="academicYear"
                      placeholder="2024/2025"
                      className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                      value={academicYear}
                      onChange={(e) => setAcademicYear(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="text-slate-300">
                    Due Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <Input
                      id="dueDate"
                      type="date"
                      className="border-slate-700 bg-slate-900 pl-9 text-white"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <Users className="h-5 w-5 text-blue-400" />
                  Target Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="targetType" className="text-slate-300">
                    Apply To
                  </Label>
                  <Select value={targetType} onValueChange={setTargetType}>
                    <SelectTrigger className="border-slate-700 bg-slate-900 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-slate-700 bg-slate-900">
                      <SelectItem
                        value="all"
                        className="text-white focus:bg-slate-800 focus:text-white"
                      >
                        All Students
                      </SelectItem>
                      <SelectItem
                        value="department"
                        className="text-white focus:bg-slate-800 focus:text-white"
                      >
                        Specific Departments
                      </SelectItem>
                      <SelectItem
                        value="faculty"
                        className="text-white focus:bg-slate-800 focus:text-white"
                      >
                        Specific Faculties
                      </SelectItem>
                      <SelectItem
                        value="level"
                        className="text-white focus:bg-slate-800 focus:text-white"
                      >
                        Specific Levels
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {targetType === "department" && (
                  <div className="space-y-3">
                    <Label className="text-slate-300">Select Departments</Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {DEPARTMENTS.map((dept) => (
                        <div
                          key={dept}
                          className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-900 p-3"
                        >
                          <Checkbox
                            id={dept}
                            checked={selectedDepartments.includes(dept)}
                            onCheckedChange={() => handleDepartmentToggle(dept)}
                            className="border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                          />
                          <label
                            htmlFor={dept}
                            className="text-sm text-slate-300 cursor-pointer flex-1"
                          >
                            {dept}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {targetType === "faculty" && (
                  <div className="space-y-3">
                    <Label className="text-slate-300">Select Faculties</Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {FACULTIES.map((faculty) => (
                        <div
                          key={faculty}
                          className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-900 p-3"
                        >
                          <Checkbox
                            id={faculty}
                            checked={selectedFaculties.includes(faculty)}
                            onCheckedChange={() => handleFacultyToggle(faculty)}
                            className="border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                          />
                          <label
                            htmlFor={faculty}
                            className="text-sm text-slate-300 cursor-pointer flex-1"
                          >
                            {faculty}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {targetType === "level" && (
                  <div className="space-y-3">
                    <Label className="text-slate-300">Select Levels</Label>
                    <div className="grid gap-3 grid-cols-4">
                      {LEVELS.map((level) => (
                        <div
                          key={level}
                          className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-900 p-3"
                        >
                          <Checkbox
                            id={level}
                            checked={selectedLevels.includes(level)}
                            onCheckedChange={() => handleLevelToggle(level)}
                            className="border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                          />
                          <label
                            htmlFor={level}
                            className="text-sm text-slate-300 cursor-pointer flex-1"
                          >
                            {level}L
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg text-white">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-slate-900 p-3">
                    <span className="text-sm text-slate-400">Target Type</span>
                    <span className="text-sm font-medium text-white capitalize">
                      {targetType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-900 p-3">
                    <span className="text-sm text-slate-400">
                      Selected Count
                    </span>
                    <span className="text-sm font-medium text-amber-400">
                      {targetType === "department"
                        ? selectedDepartments.length
                        : targetType === "faculty"
                        ? selectedFaculties.length
                        : targetType === "level"
                        ? selectedLevels.length
                        : "All"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-900 p-3">
                    <span className="text-sm text-slate-400">
                      Est. Students
                    </span>
                    <span className="text-sm font-medium text-blue-400">
                      ~1,247
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <Building2 className="h-5 w-5 text-emerald-400" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg bg-emerald-500/10 p-3">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-xs font-medium">Active Students</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-white">167</p>
                </div>
                <div className="rounded-lg bg-amber-500/10 p-3">
                  <div className="flex items-center gap-2 text-amber-400">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-xs font-medium">
                      Expected Revenue
                    </span>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-white">
                    {formatCurrency(calculateExpectedRevenue())}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-slate-300">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional information..."
                    className="min-h-[80px] border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <FileText className="h-6 w-6 text-amber-400" />
                Created Payments
              </CardTitle>
              <Badge
                variant="outline"
                className="border-slate-700 bg-slate-900 text-slate-300"
              >
                {createdPayments.length} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-amber-500" />
                  <p className="mt-4 text-sm text-slate-400">
                    Loading payments...
                  </p>
                </div>
              </div>
            ) : createdPayments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-slate-700" />
                <p className="mt-4 text-sm text-slate-400">
                  No payments created yet
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Create your first payment above to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {createdPayments.map((payment) => (
                  <Card
                    key={payment._id}
                    className="border-slate-800 bg-slate-900"
                  >
                    <CardContent className="p-4">
                      <div className="grid gap-4 md:grid-cols-[1fr,auto]">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-white">
                                  {payment.title}
                                </h3>
                                <Badge
                                  variant="outline"
                                  className={
                                    payment.isActive
                                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                                      : "border-slate-600 bg-slate-800 text-slate-400"
                                  }
                                >
                                  {payment.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <p className="mt-1 text-sm text-slate-400">
                                {payment.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-amber-400">
                                {formatCurrency(payment.amount)}
                              </p>
                              <p className="text-xs text-slate-500">
                                {getPaymentTypeLabel(payment.paymentType)}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge
                              variant="outline"
                              className="border-slate-700 bg-slate-800 text-slate-300"
                            >
                              <Calendar className="mr-1 h-3 w-3" />
                              {payment.semester}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-slate-700 bg-slate-800 text-slate-300"
                            >
                              {payment.academicYear}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-slate-700 bg-slate-800 text-slate-300"
                            >
                              Due: {formatDate(payment.dueDate)}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-blue-500/50 bg-blue-500/10 text-blue-400"
                            >
                              <Users className="mr-1 h-3 w-3" />
                              {payment.targetType === "all"
                                ? "All Students"
                                : payment.targetType === "department"
                                ? `${payment.departments?.length || 0} Dept(s)`
                                : payment.targetType === "faculty"
                                ? `${payment.faculties?.length || 0} Faculty(s)`
                                : `${payment.levels?.length || 0} Level(s)`}
                            </Badge>
                          </div>

                          {payment.targetType !== "all" && (
                            <div className="flex flex-wrap gap-1">
                              {payment.departments?.map((dept) => (
                                <Badge
                                  key={dept}
                                  variant="outline"
                                  className="border-slate-700 bg-slate-800/50 text-xs text-slate-400"
                                >
                                  {dept}
                                </Badge>
                              ))}
                              {payment.faculties?.map((faculty) => (
                                <Badge
                                  key={faculty}
                                  variant="outline"
                                  className="border-slate-700 bg-slate-800/50 text-xs text-slate-400"
                                >
                                  {faculty}
                                </Badge>
                              ))}
                              {payment.levels?.map((level) => (
                                <Badge
                                  key={level}
                                  variant="outline"
                                  className="border-slate-700 bg-slate-800/50 text-xs text-slate-400"
                                >
                                  {level}L
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 md:min-w-[200px]">
                          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                            <div className="flex items-center gap-2 text-emerald-400">
                              <CheckCircle2 className="h-4 w-4" />
                              <span className="text-xs font-medium">Paid</span>
                            </div>
                            <div className="mt-1 flex items-baseline gap-2">
                              <p className="text-2xl font-bold text-white">
                                {payment.paidCount || 0}
                              </p>
                              <span className="text-xs text-slate-500">
                                / {payment.appliedToCount || 0}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-slate-400">
                              {payment.appliedToCount > 0
                                ? `${Math.round(
                                    ((payment.paidCount || 0) /
                                      payment.appliedToCount) *
                                      100
                                  )}%`
                                : "0%"}
                            </p>
                          </div>

                          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                            <div className="flex items-center gap-2 text-amber-400">
                              <Clock className="h-4 w-4" />
                              <span className="text-xs font-medium">
                                Pending
                              </span>
                            </div>
                            <div className="mt-1 flex items-baseline gap-2">
                              <p className="text-2xl font-bold text-white">
                                {payment.pendingCount || 0}
                              </p>
                            </div>
                            <p className="mt-1 text-xs text-slate-400">
                              {formatCurrency(
                                (payment.pendingCount || 0) * payment.amount
                              )}
                            </p>
                          </div>

                          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                            <div className="flex items-center gap-2 text-blue-400">
                              <DollarSign className="h-4 w-4" />
                              <span className="text-xs font-medium">
                                Revenue
                              </span>
                            </div>
                            <p className="mt-1 text-lg font-bold text-white">
                              {formatCurrency(
                                (payment.paidCount || 0) * payment.amount
                              )}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              of{" "}
                              {formatCurrency(
                                payment.totalExpectedRevenue || 0
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
