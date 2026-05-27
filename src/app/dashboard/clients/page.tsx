"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase";
import { getClients, createClient_, updateClient, deleteClient } from "../../../lib/db";
import type { Client } from "../../../lib/supabase";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      const data = await getClients(user.id);
      setClients(data);
      setLoading(false);
    }
    load();
  }, []);

  function openAddModal() {
    setEditingClient(null);
    setForm({ name: "", email: "", phone: "", company: "", status: "active" });
    setShowModal(true);
  }

  function openEditModal(client: Client) {
    setEditingClient(client);
    setForm({
      name: client.name,
      email: client.email || "",
      phone: client.phone || "",
      company: client.company || "",
      status: client.status,
    });
    setShowModal(true);
  }

  async function handleSave() {
  if (!form.name.trim()) return;
  setSaving(true);

  console.log("User ID:", userId);
  console.log("Form data:", form);

  if (editingClient) {
    const { data, error } = await updateClient(editingClient.id, form);
    console.log("Update result:", data, error);
    if (data) setClients(prev => prev.map(c => c.id === data.id ? data : c));
  } else {
    const { data, error } = await createClient_(userId, form);
    console.log("Insert result:", data, error);
    if (data) setClients(prev => [data, ...prev]);
  }

  setSaving(false);
  setShowModal(false);

  const fresh = await getClients(userId);
  setClients(fresh);
}

  async function handleDelete(clientId: string) {
    if (!confirm("Delete this client? This cannot be undone.")) return;
    await deleteClient(clientId);
    setClients(prev => prev.filter(c => c.id !== clientId));
  }

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Clients</h2>
          <p className="text-slate-400 text-sm mt-1">Manage all your clients in one place.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Add Client
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Clients", value: clients.length },
          { label: "Active", value: clients.filter(c => c.status === "active").length },
          { label: "Inactive", value: clients.filter(c => c.status === "inactive").length },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Name</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3 hidden md:table-cell">Email</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3 hidden md:table-cell">Company</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Status</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-slate-500 text-sm">
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <p className="text-slate-500 text-sm">
                    {search ? "No clients match your search." : "No clients yet. Add your first client!"}
                  </p>
                </td>
              </tr>
            ) : (
              filtered.map(client => (
                <tr key={client.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white text-sm font-medium">{client.name}</p>
                    <p className="text-slate-500 text-xs">{client.phone || ""}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm hidden md:table-cell">
                    {client.email || "—"}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm hidden md:table-cell">
                    {client.company || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      client.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-slate-700 text-slate-400"
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(client)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-lg">
                {editingClient ? "Edit Client" : "Add New Client"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: "Full Name *", key: "name", type: "text", placeholder: "John Doe" },
                { label: "Email", key: "email", type: "email", placeholder: "john@example.com" },
                { label: "Phone", key: "phone", type: "tel", placeholder: "+234 800 000 0000" },
                { label: "Company", key: "company", type: "text", placeholder: "Acme Ltd" },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-slate-400 text-xs mb-1 block">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              ))}
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm(prev => ({ ...prev, status: e.target.value as "active" | "inactive" }))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name.trim()}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                {saving ? "Saving..." : editingClient ? "Save Changes" : "Add Client"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}