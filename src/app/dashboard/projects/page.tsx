"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase";
import { getProjects, createProject, updateProject, deleteProject, getClients } from "../../../lib/db";
import type { Project, Client } from "../../../lib/supabase";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  in_progress: "bg-blue-500/20 text-blue-400",
  completed: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    client_id: "",
    status: "pending" as Project["status"],
    budget: "",
    deadline: "",
  });

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      const [projectsData, clientsData] = await Promise.all([
        getProjects(user.id),
        getClients(user.id),
      ]);
      setProjects(projectsData);
      setClients(clientsData);
      setLoading(false);
    }
    load();
  }, []);

  function openAddModal() {
    setEditingProject(null);
    setForm({ title: "", description: "", client_id: "", status: "pending", budget: "", deadline: "" });
    setShowModal(true);
  }

  function openEditModal(project: Project) {
    setEditingProject(project);
    setForm({
      title: project.title,
      description: project.description || "",
      client_id: project.client_id || "",
      status: project.status,
      budget: project.budget?.toString() || "",
      deadline: project.deadline || "",
    });
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.title.trim()) return;
    setSaving(true);
    const payload = {
      title: form.title,
      description: form.description || null,
      client_id: form.client_id || null,
      status: form.status,
      budget: parseFloat(form.budget) || 0,
      deadline: form.deadline || null,
    };
    if (editingProject) {
      const { data } = await updateProject(editingProject.id, payload);
      if (data) setProjects(prev => prev.map(p => p.id === data.id ? data : p));
    } else {
      const { data } = await createProject(userId, payload);
      if (data) setProjects(prev => [data, ...prev]);
    }
    setSaving(false);
    setShowModal(false);
    const fresh = await getProjects(userId);
    setProjects(fresh);
  }

  async function handleDelete(projectId: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await deleteProject(projectId);
    setProjects(prev => prev.filter(p => p.id !== projectId));
  }

  function getClientName(clientId: string | null) {
    if (!clientId) return "—";
    return clients.find(c => c.id === clientId)?.name || "—";
  }

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    getClientName(p.client_id).toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: "Total Projects", value: projects.length },
    { label: "In Progress", value: projects.filter(p => p.status === "in_progress").length },
    { label: "Completed", value: projects.filter(p => p.status === "completed").length },
    { label: "Total Value", value: `₦${projects.reduce((s, p) => s + (p.budget || 0), 0).toLocaleString()}` },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Projects</h2>
          <p className="text-slate-400 text-sm mt-1">Track all your projects and their status.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
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
          placeholder="Search projects..."
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
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Project</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3 hidden md:table-cell">Client</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Status</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3 hidden md:table-cell">Budget</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3 hidden md:table-cell">Deadline</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-12 text-slate-500 text-sm">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12">
                <p className="text-slate-500 text-sm">
                  {search ? "No projects match your search." : "No projects yet. Add your first project!"}
                </p>
              </td></tr>
            ) : (
              filtered.map(project => (
                <tr key={project.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white text-sm font-medium">{project.title}</p>
                    <p className="text-slate-500 text-xs line-clamp-1">{project.description || ""}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm hidden md:table-cell">
                    {getClientName(project.client_id)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[project.status]}`}>
                      {statusLabels[project.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm hidden md:table-cell">
                    {project.budget ? `₦${project.budget.toLocaleString()}` : "—"}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm hidden md:table-cell">
                    {project.deadline ? new Date(project.deadline).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal(project)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(project.id)}
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
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Project Title *</label>
                <input type="text" placeholder="Website Redesign"
                  value={form.title}
                  onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Description</label>
                <textarea placeholder="Brief project description..."
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Client</label>
                <select value={form.client_id}
                  onChange={e => setForm(prev => ({ ...prev, client_id: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500">
                  <option value="">No client</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Status</label>
                <select value={form.status}
                  onChange={e => setForm(prev => ({ ...prev, status: e.target.value as Project["status"] }))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500">
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Budget (₦)</label>
                <input type="number" placeholder="150000"
                  value={form.budget}
                  onChange={e => setForm(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Deadline</label>
                <input type="date"
                  value={form.deadline}
                  onChange={e => setForm(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-sm transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving || !form.title.trim()}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
                {saving ? "Saving..." : editingProject ? "Save Changes" : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}