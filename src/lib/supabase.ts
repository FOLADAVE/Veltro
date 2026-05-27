import { createBrowserClient } from '@supabase/ssr'

export type Profile = {
  id: string
  email: string
  full_name: string
  business_name: string | null
  avatar_url: string | null
  plan: 'free' | 'pro'
  created_at: string
}

export type Client = {
  id: string
  user_id: string
  name: string
  email: string | null
  phone: string | null
  company: string | null
  status: 'active' | 'inactive'
  created_at: string
}

export type Project = {
  id: string
  user_id: string
  client_id: string | null
  title: string
  description: string | null
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  budget: number
  deadline: string | null
  created_at: string
}

export type Invoice = {
  id: string
  user_id: string
  client_id: string | null
  project_id: string | null
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  due_date: string | null
  created_at: string
}

export type Database = {
  profiles: Profile
  clients: Client
  projects: Project
  invoices: Invoice
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}