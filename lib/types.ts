export type PaymentStatus = "completed" | "pending" | "failed" | "flagged";
export type UserRole = "student" | "faculty" | "staff" | "admin";
export type PaymentType =
  | "tuition"
  | "departmental"
  | "faculty_allocation"
  | "grant"
  | "student_services";
export type ThreatLevel = "low" | "medium" | "high" | "critical";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  studentId?: string;
  employeeId?: string;
  avatar?: string;
  createdAt: string;
}

export interface Payment {
  _id: string;
  title: string;
  description: string;
  amount: number;
  paymentType: string;
  targetType: string;
  departments?: string[];
  faculties?: string[];
  levels?: string[];
  semester: string;
  academicYear: string;
  dueDate: string;
  isActive: boolean;
  appliedToCount: number;
  totalExpectedRevenue: number;
  paidCount: number;
  pendingCount: number;
  createdAt: string;
}

export interface BiometricData {
  userId: string;
  typingSpeed: number; // words per minute
  typingRhythm: number; // consistency score 0-100
  mouseMovementPattern: number; // consistency score 0-100
  accessTimePattern: string[]; // typical access hours
  averageSessionDuration: number; // minutes
  deviceFingerprint: string;
  logonPattern: number; // consistency score 0-100
  mouseDynamics: number; // consistency score 0-100
  emailContext: number; // typical email language/context score 0-100
  touchGesture: number; // consistency score 0-100
}

export interface CreatePaymentData {
  title: string;
  description: string;
  amount: number;
  paymentType: string;
  semester: string;
  academicYear: string;
  dueDate: string;
  targetType: "all" | "department" | "faculty" | "level";
  departments?: string[];
  faculties?: string[];
  levels?: string[];
  notes?: string;
  biometrics: any;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  paymentType: PaymentType;
  status: PaymentStatus;
  date: string;
  description: string;
  department?: string;
  transactionReference?: string;
  email?: string;
  phone?: number;
  semester?: string;
  academicYear?: string;
  paymentMethod?: string;
  studentId: {
    _id: string;
    name: string;
    email: string;
    department: string;
    studentId: string;
  };
  createdAt: string;
}

export interface AIAlert {
  id: string;
  userId: string;
  userName: string;
  type: "behavioral" | "access" | "transaction" | "login";
  severity: ThreatLevel;
  description: string;
  timestamp: string;
  anomalyScore: number;
  prediction: string;
  details: {
    typingRhythm?: number;
    accessPattern?: string;
    transactionFrequency?: number;
    failedLogins?: number;
    unusualTime?: boolean;
    locationAnomaly?: boolean;
  };
  resolved: boolean;
}

export interface AccessLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  success: boolean;
  riskScore: number;
}

export interface DashboardStats {
  totalPayments: number;
  pendingTransactions: number;
  activeAlerts: number;
  totalUsers: number;
  monthlyRevenue: number;
  revenueChange: number;
  transactionVolume: number;
  volumeChange: number;
}

// Notification interface
export interface Notification {
  id: string;
  type: "security" | "payment" | "system" | "user";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high" | "critical";
  actionUrl?: string;
  userId?: string;
  userName?: string;
}

// Student-specific types
export interface StudentProfile {
  id: string;
  regNumber: string;
  name: string;
  email: string;
  department: string;
  program: string;
  level: string;
  avatar?: string;
  enrollmentDate: string;
  totalPaid: number;
  totalPending: number;
}

export interface StudentPayment {
  id: string;
  studentId: string;
  type:
    | "tuition"
    | "accommodation"
    | "library"
    | "medical"
    | "sports"
    | "exam"
    | "other";
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  paidDate?: string;
  semester: string;
  academicYear: string;
  description: string;
  reference?: string;
}

export interface PaymentItem {
  id: string;
  name: string;
  amount: number;
  type: StudentPayment["type"];
  dueDate: string;
  status: StudentPayment["status"];
  description: string;
}

export interface Receipt {
  id: string;
  paymentId: string;
  studentId: string;
  studentName: string;
  amountPaid: number;
  paymentType: PaymentType;
  dateOfPayment: string;
  receiptNumber: string;
  downloaded: boolean;
  downloadCount?: number;
  description: string;
  amount: number;
  createdAt: string;
  semester: string;
}
