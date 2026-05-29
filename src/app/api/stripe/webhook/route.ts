import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServerSupabaseClient } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const userId = session.metadata?.userId;

    if (userId) {
      const supabase = await createServerSupabaseClient();
      await supabase
        .from("profiles")
        .update({ plan: "pro" })
        .eq("id", userId);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as any;
    const userId = subscription.metadata?.userId;

    if (userId) {
      const supabase = await createServerSupabaseClient();
      await supabase
        .from("profiles")
        .update({ plan: "free" })
        .eq("id", userId);
    }
  }

  return NextResponse.json({ received: true });
}