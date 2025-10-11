import { ThreatOverview } from "@/components/ai-insights/threat-overview";
import { AlertList } from "@/components/ai-insights/alert-list";
import { BiometricMonitor } from "@/components/ai-insights/biometric-monitor";
import { AnomalyChart } from "@/components/ai-insights/anomaly-chart";

export default function AIInsightsPage() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">AI Security Insights</h1>
        <p className="mt-1 text-slate-400">
          Real-time insider threat detection and behavioral analysis
        </p>
      </div>

      <ThreatOverview />

      <div className="grid gap-6 lg:grid-cols-2 items-start">
        <AnomalyChart />
        <BiometricMonitor />
      </div>

      <AlertList />
    </div>
  );
}
