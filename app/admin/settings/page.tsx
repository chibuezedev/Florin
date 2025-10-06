import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bell, Shield, User, Database } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-slate-400">Manage your system preferences and security settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gold-400" />
              <CardTitle className="text-lg font-semibold text-white">Profile Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">
                Full Name
              </Label>
              <Input id="name" defaultValue="Admin User" className="border-slate-700 bg-slate-800 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="admin@university.edu"
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <Button className="bg-gold-500 text-navy-900 hover:bg-gold-600">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-gold-400" />
              <CardTitle className="text-lg font-semibold text-white">Notification Preferences</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Security Alerts</p>
                <p className="text-sm text-slate-400">Receive alerts for security threats</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Payment Notifications</p>
                <p className="text-sm text-slate-400">Get notified about payments</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">System Updates</p>
                <p className="text-sm text-slate-400">Receive system maintenance alerts</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gold-400" />
              <CardTitle className="text-lg font-semibold text-white">Security Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Two-Factor Authentication</p>
                <p className="text-sm text-slate-400">Add an extra layer of security</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Biometric Monitoring</p>
                <p className="text-sm text-slate-400">Enable behavioral analysis</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Session Timeout</p>
                <p className="text-sm text-slate-400">Auto-logout after inactivity</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-gold-400" />
              <CardTitle className="text-lg font-semibold text-white">Data & Privacy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Data Retention</p>
                <p className="text-sm text-slate-400">Keep logs for 90 days</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Analytics Tracking</p>
                <p className="text-sm text-slate-400">Help improve the system</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button
              variant="outline"
              className="w-full border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              Export My Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
