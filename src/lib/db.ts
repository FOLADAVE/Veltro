import { createClient } from './supabase'
import type { Client, Project, Invoice, Profile } from './supabase'

// ==================== PROFILE ====================

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) return null
  return data
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

// ==================== CLIENTS ====================

export async function getClients(userId: string): Promise<Client[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) return []
  return data
}

export async function createClient_(userId: string, client: Omit<Client, 'id' | 'user_id' | 'created_at'>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('clients')
    .insert({ ...client, user_id: userId })
    .select()
    .single()
  return { data, error }
}

export async function updateClient(clientId: string, updates: Partial<Client>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', clientId)
    .select()
    .single()
  return { data, error }
}

export async function deleteClient(clientId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', clientId)
  return { error }
}

// ==================== PROJECTS ====================

export async function getProjects(userId: string): Promise<Project[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) return []
  return data
}

export async function createProject(userId: string, project: Omit<Project, 'id' | 'user_id' | 'created_at'>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('projects')
    .insert({ ...project, user_id: userId })
    .select()
    .single()
  return { data, error }
}

export async function updateProject(projectId: string, updates: Partial<Project>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', projectId)
    .select()
    .single()
  return { data, error }
}

export async function deleteProject(projectId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
  return { error }
}

// ==================== INVOICES ====================

export async function getInvoices(userId: string): Promise<Invoice[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) return []
  return data
}

export async function createInvoice(userId: string, invoice: Omit<Invoice, 'id' | 'user_id' | 'created_at'>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('invoices')
    .insert({ ...invoice, user_id: userId })
    .select()
    .single()
  return { data, error }
}

export async function updateInvoice(invoiceId: string, updates: Partial<Invoice>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('invoices')
    .update(updates)
    .eq('id', invoiceId)
    .select()
    .single()
  return { data, error }
}

export async function deleteInvoice(invoiceId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', invoiceId)
  return { error }
}

// ==================== DASHBOARD STATS ====================

export async function getDashboardStats(userId: string) {
  const supabase = createClient()

  const now = new Date()
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const [clientsRes, projectsRes, invoicesRes, revenueRes] = await Promise.all([
    supabase.from('clients').select('id', { count: 'exact' }).eq('user_id', userId).eq('status', 'active'),
    supabase.from('projects').select('id', { count: 'exact' }).eq('user_id', userId).eq('status', 'in_progress'),
    supabase.from('invoices').select('id', { count: 'exact' }).eq('user_id', userId).in('status', ['sent', 'overdue']),
    supabase.from('invoices').select('amount').eq('user_id', userId).eq('status', 'paid').gte('created_at', firstOfMonth),
  ])

  const monthlyRevenue = revenueRes.data?.reduce((sum, inv) => sum + inv.amount, 0) ?? 0

  return {
    activeClients: clientsRes.count ?? 0,
    projectsInProgress: projectsRes.count ?? 0,
    pendingInvoices: invoicesRes.count ?? 0,
    monthlyRevenue,
  }
}