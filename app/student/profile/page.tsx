"use client";
import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  GraduationCap,
  Edit,
  Save,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useProfile, useUpdateProfile } from "@/hooks/useUser";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
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
      });
    }
  }, [fetchedProfile]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setIsEditing(false);
        refetch();
      }, 1500);
    }
  }, [success]);

  const handleSave = async () => {
    const updateData = {
      name: profile.name,
      department: profile.department,
      level: profile.level,
      program: profile.program,
      studentId: profile.studentId,
    };

    const result = await updateProfile(updateData);
    if (result) {
      // Profile updated successfully
    }
  };

  const handleCancel = () => {
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
      });
    }
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getYearFromLevel = (level: string) => {
    const levelMap: { [key: string]: string } = {
      "100": "1st",
      "200": "2nd",
      "300": "3rd",
      "400": "4th",
      "500": "5th",
      "600": "6th",
    };
    return levelMap[level] || level;
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
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-slate-400">
            View and manage your personal information
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

        <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm mb-6">
          <div className="h-32 bg-gradient-to-r from-amber-500 to-amber-700 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white border-4 border-slate-900">
                {getInitials(profile.name)}
              </div>
            </div>
          </div>
          <div className="pt-20 px-8 pb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {profile.name}
                </h2>
                <p className="text-slate-400">
                  {profile.program || "No program set"}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-slate-400">
                    ID: {profile.studentId || "N/A"}
                  </span>
                  <span className="text-sm text-slate-400">•</span>
                  <span className="text-sm text-slate-400">
                    Level {profile.level || "N/A"}
                  </span>
                  <span className="text-sm text-slate-400">•</span>
                  <span
                    className={`text-sm font-medium ${
                      profile.isActive ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {profile.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <Button
                onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                disabled={updateLoading}
                className={
                  isEditing
                    ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                    : "bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                }
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                <p className="text-xs text-slate-400 mb-1">Role</p>
                <p className="text-xl font-bold text-amber-400 capitalize">
                  {profile.role}
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                <p className="text-xs text-slate-400 mb-1">Level</p>
                <p className="text-2xl font-bold text-white">
                  {profile.level || "N/A"}
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                <p className="text-xs text-slate-400 mb-1">Year</p>
                <p className="text-2xl font-bold text-white">
                  {profile.level ? getYearFromLevel(profile.level) : "N/A"}
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                <p className="text-xs text-slate-400 mb-1">Status</p>
                <p
                  className={`text-lg font-bold ${
                    profile.isActive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {profile.isActive ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-amber-400" />
              Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-400 text-xs mb-1">Full Name</Label>
                {isEditing ? (
                  <Input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                ) : (
                  <p className="text-white">{profile.name}</p>
                )}
              </div>
              <div>
                <Label className="text-slate-400 text-xs mb-1">Email</Label>
                <div className="flex items-center gap-2 text-white">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span>{profile.email}</span>
                </div>
              </div>
              <div>
                <Label className="text-slate-400 text-xs mb-1">
                  Department
                </Label>
                {isEditing ? (
                  <Input
                    value={profile.department}
                    onChange={(e) =>
                      setProfile({ ...profile, department: e.target.value })
                    }
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-white">
                    <BookOpen className="h-4 w-4 text-slate-500" />
                    <span>{profile.department || "Not set"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-amber-400" />
              Academic Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-400 text-xs mb-1">
                  Student ID
                </Label>
                {isEditing ? (
                  <Input
                    value={profile.studentId}
                    onChange={(e) =>
                      setProfile({ ...profile, studentId: e.target.value })
                    }
                    className="bg-slate-800/50 border-white/10 text-white font-mono"
                  />
                ) : (
                  <p className="text-white font-mono">
                    {profile.studentId || "Not set"}
                  </p>
                )}
              </div>
              <div>
                <Label className="text-slate-400 text-xs mb-1">Level</Label>
                {isEditing ? (
                  <select
                    value={profile.level}
                    onChange={(e) =>
                      setProfile({ ...profile, level: e.target.value })
                    }
                    className="w-full bg-slate-800/50 border border-white/10 text-white rounded-md px-3 py-2"
                  >
                    <option value="">Select Level</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="600">600</option>
                  </select>
                ) : (
                  <p className="text-white">{profile.level || "Not set"}</p>
                )}
              </div>
              <div>
                <Label className="text-slate-400 text-xs mb-1">Program</Label>
                {isEditing ? (
                  <Input
                    value={profile.program}
                    onChange={(e) =>
                      setProfile({ ...profile, program: e.target.value })
                    }
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                ) : (
                  <p className="text-white">{profile.program || "Not set"}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleSave}
              disabled={updateLoading}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
            >
              {updateLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
