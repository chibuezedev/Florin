"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Shield,
  User,
  Database,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useUpdateProfile, useProfile } from "@/hooks/useUser";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const {
    profile: fetchedProfile,
    loading: profileLoading,
    error: profileError,
    refetch,
  } = useProfile();
  const {
    updateProfile,
    loading: updateLoading,
    error: updateError,
    success,
  } = useUpdateProfile();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    studentId: "",
    phone: "",
    department: "",
    level: "",
    program: "",
    role: "",
    isActive: true,
    employeeId: "",
  });

  useEffect(() => {
    if (fetchedProfile) {
      setProfile({
        name: fetchedProfile.name || "",
        email: fetchedProfile.email || "",
        studentId: fetchedProfile.studentId || "",
        phone: fetchedProfile.phone || "",
        department: fetchedProfile.department || "",
        level: fetchedProfile.level || "",
        program: fetchedProfile.program || "",
        role: fetchedProfile.role || "",
        isActive: fetchedProfile.isActive ?? true,
        employeeId: fetchedProfile.employeeId || "",
      });
    }
  }, [fetchedProfile]);

  useEffect(() => {
    if (success) {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setTimeout(() => {
        refetch();
      }, 1500);
    }
  }, [success]);

  const handleInputChange = (field: any, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const updateData = {
      name: profile.name,
      department: profile.department,
      level: profile.level,
      program: profile.program,
      studentId: profile.studentId,
    };

    await updateProfile(updateData);
  };

  if (profileLoading) {
    return (
      <div className="p-8">
        <div className="max-w-5xl mx-auto flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          <Alert className="bg-red-500/10 border-red-500/20">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-400">
              {profileError}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-slate-400">
          Manage your system preferences and security settings
        </p>
      </div>

      {success && (
        <Alert className="mb-6 bg-emerald-500/10 border-emerald-500/20">
          <AlertDescription className="text-emerald-400">
            Profile updated successfully!
          </AlertDescription>
        </Alert>
      )}

      {updateError && (
        <Alert className="mb-6 bg-red-500/10 border-red-500/20">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400">
            {updateError}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gold-400" />
              <CardTitle className="text-lg font-semibold text-white">
                Profile Settings
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">
                Full Name
              </Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                disabled
                className="border-slate-700 bg-slate-800 text-slate-500 cursor-not-allowed"
                title="Email cannot be changed here. Use a separate email update process."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeId" className="text-slate-300">
                Employee ID
              </Label>
              <Input
                id="employeeId"
                disabled
                value={profile.employeeId}
                onChange={(e) => handleInputChange("studentId", e.target.value)}
                className="border-slate-700 bg-slate-800 text-white cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-slate-300">
                Role
              </Label>
              <Input
                id="role"
                disabled
                value={profile.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <Button
              onClick={handleSave}
              disabled={updateLoading}
              className="bg-gold-500 text-navy-900 hover:bg-gold-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-gold-400" />
              <CardTitle className="text-lg font-semibold text-white">
                Notification Preferences
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Security Alerts</p>
                <p className="text-sm text-slate-400">
                  Receive alerts for security threats
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Payment Notifications</p>
                <p className="text-sm text-slate-400">
                  Get notified about payments
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">System Updates</p>
                <p className="text-sm text-slate-400">
                  Receive system maintenance alerts
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gold-400" />
              <CardTitle className="text-lg font-semibold text-white">
                Security Settings
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-slate-400">
                  Add an extra layer of security
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Biometric Monitoring</p>
                <p className="text-sm text-slate-400">
                  Enable behavioral analysis
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Session Timeout</p>
                <p className="text-sm text-slate-400">
                  Auto-logout after inactivity
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-gold-400" />
              <CardTitle className="text-lg font-semibold text-white">
                Data & Privacy
              </CardTitle>
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
                <p className="text-sm text-slate-400">
                  Help improve the system
                </p>
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
  );
}
