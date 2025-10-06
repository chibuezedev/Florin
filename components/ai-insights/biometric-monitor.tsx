"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockBiometricData } from "@/lib/mock-data"
import { Activity, Clock, Mouse, Fingerprint } from "lucide-react"

export function BiometricMonitor() {
  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Behavioral Biometrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockBiometricData.map((data) => (
            <div key={data.userId} className="space-y-4 rounded-lg border border-slate-800 bg-slate-800/30 p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-white">User ID: {data.userId}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Fingerprint className="h-3 w-3" />
                  {data.deviceFingerprint}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Activity className="h-4 w-4" />
                    Typing Speed
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                        style={{ width: `${(data.typingSpeed / 100) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white">{data.typingSpeed} WPM</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Activity className="h-4 w-4" />
                    Typing Rhythm
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full ${data.typingRhythm > 70 ? "bg-gradient-to-r from-emerald-500 to-emerald-400" : "bg-gradient-to-r from-amber-500 to-amber-400"}`}
                        style={{ width: `${data.typingRhythm}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white">{data.typingRhythm}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Mouse className="h-4 w-4" />
                    Mouse Pattern
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full ${data.mouseMovementPattern > 70 ? "bg-gradient-to-r from-emerald-500 to-emerald-400" : "bg-gradient-to-r from-amber-500 to-amber-400"}`}
                        style={{ width: `${data.mouseMovementPattern}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white">{data.mouseMovementPattern}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="h-4 w-4" />
                    Session Duration
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
                        style={{ width: `${(data.averageSessionDuration / 180) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white">{data.averageSessionDuration}m</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-slate-500">Access Patterns:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.accessTimePattern.map((time, idx) => (
                    <span key={idx} className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
