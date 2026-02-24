"use server";

import { createServerSupabaseClient } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("name") as string,
      },
    },
  });

  if (error) redirect(`/signup?error=${error.message}`);
  redirect("/dashboard");
}

export async function signIn(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) redirect(`/login?error=${error.message}`);
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}