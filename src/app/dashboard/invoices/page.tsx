"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase";
import { getInvoices, createInvoice, updateInvoice, deleteInvoice, getClients, getProjects } from "../../../lib/db";
import type { Invoice, Client, Project } from "../../../lib/supabase";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";

const statusColors: Record<string, string> = {
  draft: "bg-slate-700 text-slate-400",
  sent: "bg-blue-500/20 text-blue-400",
  paid: "bg-green-500/20 text-green-400",
  overdue: "bg-red-500/20 text-red-400",
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    client_id: "",
    project_id: "",
    amount: "",
    status: "draft" as Invoice["status"],
    due_date: "",
  });

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      const [invoicesData, clientsData, projectsData] = await Promise.all([
        getInvoices(user.id),
        getClients(user.id),
        getProjects(user.id),
      ]);
      setInvoices(invoicesData);
      setClients(clientsData);
      setProjects(projectsData);
      setLoading(false);
    }
    load();
  }, []);

  function openAddModal() {
    setEditingInvoice(null);
    setForm({ client_id: "", project_id: "", amount: "", status: "draft", due_date: "" });
    setShowModal(true);
  }

  function openEditModal(invoice: Invoice) {
    setEditingInvoice(invoice);
    setForm({
      client_id: invoice.client_id || "",
      project_id: invoice.project_id || "",
      amount: invoice.amount.toString(),
      status: invoice.status,
      due_date: invoice.due_date || "",
    });
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.amount || parseFloat(form.amount) <= 0) return;
    setSaving(true);
    const payload = {
      client_id: form.client_id || null,
      project_id: form.project_id || null,
      amount: parseFloat(form.amount),
      status: form.status,
      due_date: form.due_date || null,
    };
    if (editingInvoice) {
      const { data } = await updateInvoice(editingInvoice.id, payload);
      if (data) setInvoices(prev => prev.map(i => i.id === data.id ? data : i));
    } else {
      const { data } = await createInvoice(userId, payload);
      if (data) setInvoices(prev => [data, ...prev]);
    }
    setSaving(false);
    setShowModal(false);
    const fresh = await getInvoices(userId);
    setInvoices(fresh);
  }

  async function handleDelete(invoiceId: string) {
    if (!confirm("Delete this invoice? This cannot be undone.")) return;
    await deleteInvoice(invoiceId);
    setInvoices(prev => prev.filter(i => i.id !== invoiceId));
  }

  function getClientName(clientId: string | null) {
    if (!clientId) return "—";
    return clients.find(c => c.id === clientId)?.name || "—";
  }

  function getProjectTitle(projectId: string | null) {
    if (!projectId) return "—";
    return projects.find(p => p.id === projectId)?.title || "—";
  }

  const filtered = invoices.filter(i =>
    getClientName(i.client_id).toLowerCase().includes(search.toLowerCase()) ||
    i.status.toLowerCase().includes(search.toLowerCase())
  );

  const totalPaid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === "sent").reduce((s, i) => s + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === "overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Invoices</h2>
          <p className="text-slate-400 text-sm mt-1">Create and manage your invoices.</p>
        </div>
        <button onClick={openAddModal}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
          <Plus size={16} /> New Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Invoices", value: invoices.length.toString() },
          { label: "Total Paid", value: `₦${totalPaid.toLocaleString()}`, color: "text-green-400" },
          { label: "Pending", value: `₦${totalPending.toLocaleString()}`, color: "text-blue-400" },
          { label: "Overdue", value: `₦${totalOverdue.toLocaleString()}`, color: "text-red-400" },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color || "text-white"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input type="text" placeholder="Search invoices..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Invoice</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3 hidden md:table-cell">Client</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3 hidden md:table-cell">Project</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Amount</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Status</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3 hidden md:table-cell">Due Date</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-12 text-slate-500 text-sm">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-12">
                <p className="text-slate-500 text-sm">
                  {search ? "No invoices match your search." : "No invoices yet. Create your first invoice!"}
                </p>
              </td></tr>
            ) : (
              filtered.map((invoice, index) => (
                <tr key={invoice.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white text-sm font-medium">
                      INV-{String(index + 1).padStart(3, "0")}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {new Date(invoice.created_at).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm hidden md:table-cell">
                    {getClientName(invoice.client_id)}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm hidden md:table-cell">
                    {getProjectTitle(invoice.project_id)}
                  </td>
                  <td className="px-6 py-4 text-white text-sm font-medium">
                    ₦{invoice.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColors[invoice.status]}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm hidden md:table-cell">
                    {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal(invoice)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(invoice.id)}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-lg">
                {editingInvoice ? "Edit Invoice" : "New Invoice"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Client</label>
                <select value={form.client_id}
                  onChange={e => setForm(prev => ({ ...prev, client_id: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500">
                  <option value="">Select client</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Project</label>
                <select value={form.project_id}
                  onChange={e => setForm(prev => ({ ...prev, project_id: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500">
                  <option value="">Select project</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Amount (₦) *</label>
                <input type="number" placeholder="150000"
                  value={form.amount}
                  onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Status</label>
                <select value={form.status}
                  onChange={e => setForm(prev => ({ ...prev, status: e.target.value as Invoice["status"] }))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500">
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Due Date</label>
                <input type="date" value={form.due_date}
                  onChange={e => setForm(prev => ({ ...prev, due_date: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-sm transition-colors">
                Cancel
              </button>
              <button onClick={handleSave}
                disabled={saving || !form.amount || parseFloat(form.amount) <= 0}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
                {saving ? "Saving..." : editingInvoice ? "Save Changes" : "Create Invoice"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}