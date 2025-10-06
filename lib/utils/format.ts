export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return formatDate(dateString);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "completed":
      return "text-emerald-500";
    case "pending":
      return "text-amber-500";
    case "failed":
      return "text-red-500";
    case "flagged":
      return "text-orange-500";
    default:
      return "text-slate-500";
  }
}

export function getThreatLevelColor(level: string): string {
  switch (level) {
    case "low":
      return "text-blue-500 bg-blue-500/10";
    case "medium":
      return "text-amber-500 bg-amber-500/10";
    case "high":
      return "text-orange-500 bg-orange-500/10";
    case "critical":
      return "text-red-500 bg-red-500/10";
    default:
      return "text-slate-500 bg-slate-500/10";
  }
}
