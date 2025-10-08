"use client";
import { useState } from "react";
import {
  Settings,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Mail,
  Smartphone,
  Globe,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    paymentReminders: true,
    receiptNotifications: true,
    marketingEmails: false,
    twoFactorAuth: false,
    darkMode: true,
  });

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">
            Manage your account preferences and security
          </p>
        </div>

        {/* Notification Settings */}
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-amber-400" />
            Notification Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-white font-medium">Email Notifications</p>
                  <p className="text-sm text-slate-400">
                    Receive updates via email
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, emailNotifications: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-white font-medium">SMS Notifications</p>
                  <p className="text-sm text-slate-400">
                    Get text message alerts
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, smsNotifications: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-white font-medium">Payment Reminders</p>
                  <p className="text-sm text-slate-400">
                    Alerts for upcoming payments
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.paymentReminders}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, paymentReminders: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-white font-medium">
                    Receipt Notifications
                  </p>
                  <p className="text-sm text-slate-400">
                    Get notified when receipts are ready
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.receiptNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, receiptNotifications: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-white font-medium">Marketing Emails</p>
                  <p className="text-sm text-slate-400">
                    Promotional content and updates
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, marketingEmails: checked })
                }
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-400" />
            Security
          </h2>
          <div className="space-y-6">
            <div>
              <Label className="text-white mb-2">Change Password</Label>
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Current password"
                    className="bg-slate-800/50 border-white/10 text-white pr-10"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <Input
                  type="password"
                  placeholder="New password"
                  className="bg-slate-800/50 border-white/10 text-white"
                />
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  className="bg-slate-800/50 border-white/10 text-white"
                />
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                  <Lock className="h-4 w-4 mr-2" />
                  Update Password
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-white font-medium">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-slate-400">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, twoFactorAuth: checked })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5 text-amber-400" />
            Appearance
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.darkMode ? (
                <Moon className="h-5 w-5 text-slate-400" />
              ) : (
                <Sun className="h-5 w-5 text-slate-400" />
              )}
              <div>
                <p className="text-white font-medium">Dark Mode</p>
                <p className="text-sm text-slate-400">
                  Use dark theme across the app
                </p>
              </div>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, darkMode: checked })
              }
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 mt-6">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Danger Zone
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            Irreversible actions that affect your account
          </p>
          <Button
            variant="outline"
            className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
          >
            Deactivate Account
          </Button>
        </div>
      </div>
    </div>
  );
}
