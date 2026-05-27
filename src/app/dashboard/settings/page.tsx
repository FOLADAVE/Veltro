"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase";
import { getProfile, updateProfile } from "../../../lib/db";
import type { Profile } from "../../../lib/supabase";

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    business_name: "",
    email: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const profileData = await getProfile(user.id);
      if (profileData) {
        setProfile(profileData);
        setForm({
          full_name: profileData.full_name || "",
          business_name: profileData.business_name || "",
          email: profileData.email || "",
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSaveProfile() {
    if (!profile) return;
    setSaving(true);
    setSuccess("");
    setError("");
    const { error } = await updateProfile(profile.id, {
      full_name: form.full_name,
      business_name: form.business_name,
    });
    if (error) {
      setError("Failed to save changes. Please try again.");
    } else {
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    }
    setSaving(false);
  }

  async function handleUpdatePassword() {
    if (!passwordForm.newPassword || !passwordForm.confirmPassword) return;
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setSavingPassword(true);
    setError("");
    setSuccess("");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: passwordForm.newPassword,
    });
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Password updated successfully!");
      setPasswordForm({ newPassword: "", confirmPassword: "" });
      setTimeout(() => setSuccess(""), 3000);
    }
    setSavingPassword(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-slate-400 text-sm mt-1">Manage your account preferences.</p>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-xl px-4 py-3 mb-6">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {/* Profile */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-6">Profile</h3>
        <div className="flex flex-col gap-4 max-w-md">
          <div>
            <label className="text-slate-400 text-xs mb-1 block">Full Name</label>
            <input
              type="text"
              value={form.full_name}
              onChange={e => setForm(prev => ({ ...prev, full_name: e.target.value }))}
              placeholder="Your full name"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-xs mb-1 block">Business Name</label>
            <input
              type="text"
              value={form.business_name}
              onChange={e => setForm(prev => ({ ...prev, business_name: e.target.value }))}
              placeholder="Your business or agency name"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-xs mb-1 block">Email</label>
            <input
              type="email"
              value={form.email}
              disabled
              className="w-full bg-slate-800/50 border border-slate-700 text-slate-500 rounded-xl px-4 py-2.5 text-sm cursor-not-allowed"
            />
            <p className="text-slate-600 text-xs mt-1">Email cannot be changed here.</p>
          </div>

          {/* Plan */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">
                  {profile?.plan === "pro" ? "Pro Plan" : "Free Plan"}
                </p>
                <p className="text-slate-500 text-xs mt-0.5">
                  {profile?.plan === "pro"
                    ? "You have access to all Pro features"
                    : "Upgrade to unlock all features"}
                </p>
              </div>
              {profile?.plan === "pro" ? (
                <span className="bg-indigo-500/20 text-indigo-400 text-xs px-3 py-1.5 rounded-full font-medium">
                  Active
                </span>
              ) : (
                
                 <a href="/dashboard/billing"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Upgrade to Pro
                </a>
              )}
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="w-fit bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2.5 px-6 rounded-xl text-sm transition-colors"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-6">Change Password</h3>
        <div className="flex flex-col gap-4 max-w-md">
          <div>
            <label className="text-slate-400 text-xs mb-1 block">New Password</label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={e => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-xs mb-1 block">Confirm New Password</label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={e => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            onClick={handleUpdatePassword}
            disabled={savingPassword}
            className="w-fit bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2.5 px-6 rounded-xl text-sm transition-colors"
          >
            {savingPassword ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-slate-900 border border-red-500/20 rounded-xl p-6">
        <h3 className="text-red-400 font-semibold mb-2">Danger Zone</h3>
        <p className="text-slate-400 text-sm mb-4">
          Once you delete your account, there is no going back.
        </p>
        <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-medium py-2.5 px-6 rounded-xl text-sm transition-colors">
          Delete Account
        </button>
      </div>
    </>
  );
}