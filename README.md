# Veltro

**Stop managing your business in WhatsApp.**

Veltro is a business management dashboard built specifically for Nigerian freelancers and creative agencies. One clean platform to manage clients, track projects, send invoices and monitor revenue.

![Veltro Dashboard](public/veltro.png)

## 🚀 Live Demo

[https://veltro-plum.vercel.app](https://veltro-plum.vercel.app)

## 🎯 Who is it for?

- **Frontend Developers** — track client projects, manage retainers and know your monthly revenue
- **Designers** — manage design briefs, client feedback rounds and send professional invoices
- **Copywriters & Marketers** — track content projects, client deliverables and chase payments professionally

## ✨ Features

- **Client Management** — add, edit, delete and search all your clients
- **Project Tracking** — track projects linked to clients with status, budget and deadlines
- **Invoice Management** — create invoices, track paid and unpaid amounts in ₦
- **Revenue Dashboard** — real stats pulled from your data — monthly revenue, active clients, projects in progress, pending invoices
- **Live Revenue Chart** — area chart showing your monthly paid invoice revenue for the current year
- **Stripe Billing** — real subscription payments with webhook to update plan in database
- **Secure Authentication** — signup, login, logout with Supabase auth and protected routes
- **Row Level Security** — every user sees only their own data
- **Fully Responsive** — mobile-friendly with hamburger navigation
- **Settings** — update profile, business name and password

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [Supabase](https://supabase.com) | Authentication, database & Row Level Security |
| [Stripe](https://stripe.com) | Payment processing & subscriptions |
| [Recharts](https://recharts.org) | Real-time data visualization |
| [Lucide React](https://lucide.dev) | Icon library |
| [Vercel](https://vercel.com) | Deployment & hosting |

## 📁 Project Structure

veltro/
├── src/
│ ├── app/
│ │ ├── (auth)/
│ │ │ ├── login/
│ │ │ └── signup/
│ │ ├── api/
│ │ │ └── stripe/
│ │ │ ├── checkout/
│ │ │ └── webhook/
│ │ ├── dashboard/
│ │ │ ├── billing/
│ │ │ ├── clients/
│ │ │ ├── invoices/
│ │ │ ├── projects/
│ │ │ ├── settings/
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ ├── actions/
│ │ │ └── auth.ts
│ │ └── page.tsx
│ ├── components/
│ │ └── RevenueChart.tsx
│ └── lib/
│ ├── auth.ts
│ ├── db.ts
│ └── supabase.ts


## 🔧 Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account
- A [Stripe](https://stripe.com) account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/FOLADAVE/Veltro.git
cd veltro
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_PRO_PRICE_ID=your_stripe_price_id
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Set up your Supabase database by running the SQL in the Supabase SQL editor:
```sql
-- See /supabase/schema.sql for full schema
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💳 Test Stripe Payments

Use these test card details to try the checkout flow:

- **Card Number:** `4242 4242 4242 4242`
- **Expiry:** Any future date
- **CVC:** Any 3 digits

## 🚢 Deployment

This project is deployed on [Vercel](https://vercel.com). To deploy your own instance:

1. Push your code to GitHub
2. Import the repository on Vercel
3. Add all environment variables
4. Deploy

## 👨‍💻 Author

**Folarin Obajenihi**
- GitHub: [@FOLADAVE](https://github.com/FOLADAVE)
- Portfolio: [your portfolio URL]

## 📄 License

This project is open source and available under the [MIT License](LICENSE).