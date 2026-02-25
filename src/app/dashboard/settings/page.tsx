export default function SettingsPage() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-slate-400 text-sm mt-1">Manage your account preferences.</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-6">Profile</h3>
        <div className="flex flex-col gap-4 max-w-md">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Full Name</label>
            <input
              type="text"
              defaultValue="Jack Smith"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Email</label>
            <input
              type="email"
              defaultValue="jack@example.com"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Company</label>
            <input
              type="text"
              placeholder="Your company name"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button className="w-fit bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg text-sm transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-6">Change Password</h3>
        <div className="flex flex-col gap-4 max-w-md">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button className="w-fit bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg text-sm transition-colors">
            Update Password
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-slate-900 border border-red-500/20 rounded-xl p-6">
        <h3 className="text-red-400 font-semibold mb-2">Danger Zone</h3>
        <p className="text-slate-400 text-sm mb-4">Once you delete your account, there is no going back.</p>
        <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-medium py-2.5 px-6 rounded-lg text-sm transition-colors">
          Delete Account
        </button>
      </div>
    </>
  );
}