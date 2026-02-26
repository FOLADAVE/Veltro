# Veltro

**Business analytics, simplified.**

Veltro is a full-stack SaaS dashboard platform where businesses can sign up, manage their analytics, and subscribe to a Pro plan — all in a clean, modern interface.
<img width="1339" height="599" alt="image" src="https://github.com/user-attachments/assets/99c9476d-9af2-4bb0-87f5-b4a1d093e3cb" />

![Veltro Dashboard](public/veltro.png)

## 🚀 Live Demo

[https://veltro-plum.vercel.app](https://veltro-plum.vercel.app)

## ✨ Features

- **Authentication** — Secure signup, login, and logout powered by Supabase
- **Protected Routes** — Middleware-based route protection
- **Dashboard** — Overview of key business metrics with a live area chart
- **Analytics** — Monthly revenue bar chart and user growth line chart
- **Customers** — Table view of all customers with plan and status badges
- **Billing** — Subscription plan management with real Stripe checkout
- **Settings** — Profile, password, and account management
- **Fully Responsive** — Mobile-friendly with hamburger navigation
- **Dark Mode UI** — Clean, professional dark theme throughout

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com) | UI component library |
| [Supabase](https://supabase.com) | Authentication & database |
| [Stripe](https://stripe.com) | Payment processing & subscriptions |
| [Recharts](https://recharts.org) | Data visualization |
| [Lucide React](https://lucide.dev) | Icon library |
| [Vercel](https://vercel.com) | Deployment & hosting |

## 📁 Project Structure

```
veltro/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── api/
│   │   │   └── stripe/
│   │   │       └── checkout/
│   │   ├── dashboard/
│   │   │   ├── analytics/
│   │   │   ├── billing/
│   │   │   ├── customers/
│   │   │   ├── settings/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── actions/
│   │   │   └── auth.ts
│   │   └── page.tsx
│   ├── components/
│   │   └── RevenueChart.tsx
│   └── lib/
│       ├── auth.ts
│       ├── stripe.ts
│       └── utils.ts
```

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
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_PRO_PRICE_ID=your_stripe_price_id
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💳 Test Stripe Payments

Use these test card details to try the checkout flow:

- **Card Number:** `4242 4242 4242 4242`
- **Expiry:** Any future date
- **CVC:** Any 3 digits

## 🚢 Deployment

This project is deployed on [Vercel](https://vercel.com). To deploy your own instance:

1. Push your code to GitHub
2. Import the repository on Vercel
3. Add all environment variables from `.env.local`
4. Deploy

## 👨‍💻 Author

**Folarin Dave**
- GitHub: [@FOLADAVE](https://github.com/FOLADAVE)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
