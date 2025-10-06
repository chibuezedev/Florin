"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CreditCard, Building2, Smartphone, CheckCircle2, Shield, Lock } from "lucide-react"
import { mockStudentPayments, mockStudentProfiles } from "@/lib/mock-data"
import { formatCurrency, formatDate } from "@/lib/utils/format"

export default function PaymentPage() {
  const params = useParams()
  const router = useRouter()
  const [step, setStep] = useState<"details" | "method" | "processing" | "success">("details")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "ussd" | null>(null)

  const payment = mockStudentPayments.find((p) => p.id === params.id)
  const student = mockStudentProfiles[0]

  if (!payment) {
    return <div>Payment not found</div>
  }

  const handlePayment = () => {
    setStep("processing")
    setTimeout(() => {
      setStep("success")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/student/dashboard"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-sm text-slate-300">Secure Payment</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === "details" && (
          <div className="space-y-6">
            {/* Payment Details */}
            <div className="rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400">Description</span>
                  <span className="text-white font-medium">{payment.description}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400">Semester</span>
                  <span className="text-white font-medium">
                    {payment.semester} {payment.academicYear}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400">Due Date</span>
                  <span className="text-white font-medium">{formatDate(payment.dueDate)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400">Student Name</span>
                  <span className="text-white font-medium">{student.name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400">Registration Number</span>
                  <span className="text-white font-medium">{student.regNumber}</span>
                </div>
                <div className="flex justify-between py-4 mt-4">
                  <span className="text-xl font-bold text-white">Total Amount</span>
                  <span className="text-3xl font-bold text-amber-400">{formatCurrency(payment.amount)}</span>
                </div>
              </div>

              <button
                onClick={() => setStep("method")}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/25"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {step === "method" && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-2">Select Payment Method</h2>
              <p className="text-slate-400 mb-8">Choose how you'd like to pay</p>

              <div className="space-y-4 mb-8">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    paymentMethod === "card"
                      ? "border-amber-500 bg-amber-500/10"
                      : "border-white/10 bg-slate-800/50 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        paymentMethod === "card" ? "bg-amber-500/20" : "bg-slate-700"
                      }`}
                    >
                      <CreditCard
                        className={`w-6 h-6 ${paymentMethod === "card" ? "text-amber-400" : "text-slate-400"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">Card Payment</h3>
                      <p className="text-sm text-slate-400">Pay with debit or credit card</p>
                    </div>
                    {paymentMethod === "card" && <CheckCircle2 className="w-6 h-6 text-amber-400" />}
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("bank")}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    paymentMethod === "bank"
                      ? "border-amber-500 bg-amber-500/10"
                      : "border-white/10 bg-slate-800/50 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        paymentMethod === "bank" ? "bg-amber-500/20" : "bg-slate-700"
                      }`}
                    >
                      <Building2
                        className={`w-6 h-6 ${paymentMethod === "bank" ? "text-amber-400" : "text-slate-400"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">Bank Transfer</h3>
                      <p className="text-sm text-slate-400">Direct bank transfer</p>
                    </div>
                    {paymentMethod === "bank" && <CheckCircle2 className="w-6 h-6 text-amber-400" />}
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("ussd")}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    paymentMethod === "ussd"
                      ? "border-amber-500 bg-amber-500/10"
                      : "border-white/10 bg-slate-800/50 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        paymentMethod === "ussd" ? "bg-amber-500/20" : "bg-slate-700"
                      }`}
                    >
                      <Smartphone
                        className={`w-6 h-6 ${paymentMethod === "ussd" ? "text-amber-400" : "text-slate-400"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">USSD Payment</h3>
                      <p className="text-sm text-slate-400">Pay using USSD code</p>
                    </div>
                    {paymentMethod === "ussd" && <CheckCircle2 className="w-6 h-6 text-amber-400" />}
                  </div>
                </button>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep("details")}
                  className="flex-1 py-4 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-all duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  disabled={!paymentMethod}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Pay
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <div className="flex gap-3">
                <Lock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-300 mb-1">Secure Payment</p>
                  <p className="text-xs text-blue-200/70">
                    Your payment information is encrypted and secure. We use industry-standard security measures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 p-12">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CreditCard className="w-10 h-10 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Processing Payment</h2>
              <p className="text-slate-400">Please wait while we process your payment...</p>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 p-12">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
              <p className="text-slate-400 mb-8">Your payment has been processed successfully</p>

              <div className="bg-slate-800/50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amount Paid</span>
                    <span className="text-white font-semibold">{formatCurrency(payment.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reference</span>
                    <span className="text-white font-mono">PAY-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date</span>
                    <span className="text-white">{formatDate(new Date().toISOString())}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => router.push("/student/dashboard")}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/25"
                >
                  Back to Dashboard
                </button>
                <button className="px-8 py-3 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-all duration-300">
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
