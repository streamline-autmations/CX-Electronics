# CXX Electronics — Build Status & Developer Guide
> Last updated: 29 April 2026 | Developer: Christiaan @ Streamline Automations

---

## ✅ DONE — Do Not Rebuild

### Infrastructure
- [x] Vite 5 + React 18 + TypeScript project scaffolded
- [x] Tailwind CSS configured with CXX brand colours
- [x] Brotli + gzip compression on every build
- [x] GitHub repo connected (streamline-autmations/CX-Electronics)
- [x] Netlify deployment configured (`netlify.toml` + `_redirects`)
- [x] Supabase project created (vsneqdjdkzbykkvvliju, eu-west-1)
- [x] All environment variables set in Netlify + local `.env.local`

### Database (Supabase)
- [x] `categories` table + 8 categories seeded (EN + ZH)
- [x] `products` table (retail + bulk pricing, images, status)
- [x] `customers` table
- [x] `orders` table (retail + bulk types, PayFast fields)
- [x] `order_items` table (price snapshot at time of order)
- [x] RLS policies (public read products/categories, admin-only orders)
- [x] `updated_at` auto-trigger on products + orders
- [x] All indexes (slug, category, status, created_at)
- [x] Storage bucket `products` (public, 5MB max, images only)

### Core Logic (src/lib/ + src/hooks/ + src/context/)
- [x] Supabase client + all TypeScript types
- [x] Cart singleton — add/remove/update, localStorage persist, R99 shipping / free over R2k
- [x] PayFast signature generation + redirect (sandbox wired, ready for live keys)
- [x] EN/ZH translations for all UI text
- [x] CartContext — cart state + open/close drawer
- [x] LangContext — language toggle
- [x] `useProducts` — paginated, filterable, searchable product list
- [x] `useProduct` — single product by slug
- [x] `useOrders` — paginated order list (admin)
- [x] `useCategories` — category list
- [x] `useAuth` — Supabase auth state for admin

### Admin Panel (/admin/*)
- [x] Login page (Supabase Auth email/password)
- [x] Protected routes (redirect to login if not authenticated)
- [x] Sidebar nav desktop + bottom tab nav mobile
- [x] Dashboard — live stats (orders today, revenue 7d, pending, out-of-stock)
- [x] Products list — search, category filter, pagination (50/page), inline stock toggle, active toggle, bulk delete
- [x] Product form — add + edit, retail price, bulk pricing toggle, image upload to Supabase Storage, bilingual fields, slug auto-gen
- [x] Orders list — filter by status, paginated
- [x] Order detail — line items, customer info, shipping address, payment status, status update buttons

### Public Store (/shop, /bulk, /cart, /checkout)
- [x] Navbar — logo, nav links, cart icon with count, EN/ZH toggle, mobile hamburger
- [x] Cart drawer — slide-in, item list, qty controls, totals, checkout CTA
- [x] Footer — links, contact placeholder, language toggle
- [x] Home page — hero, trust badges, category grid (8 icons), featured products, wholesale CTA
- [x] Shop page — category sidebar (desktop) + chip filter (mobile), product grid, pagination
- [x] ProductCard — image, name, price, add-to-cart, badges (featured/bulk/out-of-stock)
- [x] Product detail — image gallery, retail price, bulk pricing box (save % calculated), qty selector, add to cart
- [x] Bulk shop — wholesale hero, WhatsApp CTA, category filter, product grid
- [x] Bulk product detail — wholesale pricing display, WhatsApp enquiry CTA (pre-filled message)
- [x] Cart page — item list, qty controls, order summary, checkout link
- [x] Checkout — shipping form (SA provinces), order creation in Supabase, PayFast redirect
- [x] Order confirmation — order summary, payment status, shipping address

---

## ❌ NOT DONE — Still To Build

### After Client Meeting (TBC items)
- [ ] **WhatsApp number** — replace `27000000000` placeholder in `BulkShop.tsx` + `BulkProductDetail.tsx`
- [ ] **Footer contact details** — phone + email in `Footer.tsx`
- [ ] **Bulk page final behaviour** — currently WhatsApp CTA; upgrade to cart if client wants that
- [ ] **Shipping strategy confirmed** — currently R99 flat / free over R2k (in `src/lib/cart.ts`)
- [ ] **PayFast live credentials** — waiting on CIPC confirmation; swap sandbox → live in `.env.local`

### Payments & Automation
- [ ] PayFast live merchant ID + key + passphrase (add to Netlify env vars)
- [ ] n8n webhook workflow (verify ITN → update order to `paid` → send emails)
- [ ] `VITE_N8N_WEBHOOK_URL` env var (set after n8n flow is built)

### Content & Branding
- [ ] Real logo file → replace `/public/favicon.svg` (doesn't exist yet, browser shows default)
- [ ] Hero banner image (currently gradient placeholder)
- [ ] Product photography — upload via admin once client provides
- [ ] Footer phone number + email
- [ ] Returns/shipping policy page
- [ ] About/contact page (optional)

### Admin Setup
- [ ] Add admin user in Supabase Auth dashboard (Authentication → Users → Add user)
- [ ] Add all products via admin panel (/admin/products/new)

### Nice-to-Have (post-launch)
- [ ] Per-page SEO meta tags (og:title, description)
- [ ] Sitemap + robots.txt
- [ ] Google Analytics
- [ ] Search overlay (search icon in navbar is present, overlay not built yet)

---

## 📁 FILE GUIDE — What to Touch vs What to Leave

### 🔴 NEVER TOUCH — Core Logic (leave exactly as is)
These files handle database, payments, cart state and routing. Breaking them breaks everything.

| File | Why hands off |
|------|---------------|
| `src/lib/supabase.ts` | DB client + all TypeScript types — change this = type errors everywhere |
| `src/lib/cart.ts` | Cart singleton logic — touch this = cart breaks |
| `src/lib/payfast.ts` | Payment signature generation — touch this = payments fail |
| `src/hooks/useProducts.ts` | Supabase query logic |
| `src/hooks/useProduct.ts` | Single product query |
| `src/hooks/useOrders.ts` | Orders query + update |
| `src/hooks/useCategories.ts` | Categories query |
| `src/hooks/useAuth.ts` | Auth state management |
| `src/context/CartContext.tsx` | Cart state provider |
| `src/context/LangContext.tsx` | Language state provider |
| `src/components/admin/ProtectedRoute.tsx` | Auth guard for admin |
| `src/App.tsx` | All routing — only touch to add NEW routes |
| `vite.config.ts` | Build config — compression, aliases |
| `tsconfig*.json` | TypeScript config |
| `tailwind.config.js` | Brand colours — only touch to update colours |
| `.env.local` | API keys — never commit to GitHub |

### 🟡 TOUCH WITH CARE — Admin Panel
These are built and functional. Only edit to add fields or change UI. Don't change query logic.

| File | What you can safely change |
|------|---------------------------|
| `src/pages/admin/Dashboard.tsx` | Add more stat cards, change layout |
| `src/pages/admin/Products.tsx` | Add columns to table, change sort order |
| `src/pages/admin/ProductForm.tsx` | Add new product fields (match DB schema) |
| `src/pages/admin/Orders.tsx` | Add columns, change filter options |
| `src/pages/admin/OrderDetail.tsx` | Add info sections |
| `src/pages/admin/Login.tsx` | Change logo/branding only |
| `src/components/admin/AdminLayout.tsx` | Add nav links, change sidebar styling |

### 🟢 SAFE TO EDIT FREELY — Store Pages & Content
These are UI/content files. Change copy, layout, colours, sections freely.

| File | What to edit |
|------|-------------|
| `src/pages/store/Home.tsx` | Hero copy, sections, category icons, layout |
| `src/pages/store/Shop.tsx` | Grid layout, sort options, filter UI |
| `src/pages/store/ProductDetail.tsx` | Layout, add sections (specs, reviews, etc.) |
| `src/pages/store/BulkShop.tsx` | **Replace `27000000000` with real WhatsApp number** |
| `src/pages/store/BulkProductDetail.tsx` | **Replace `27000000000` with real WhatsApp number** |
| `src/pages/store/CartPage.tsx` | Layout only |
| `src/pages/store/Checkout.tsx` | Form fields, layout |
| `src/pages/store/OrderConfirmation.tsx` | Copy, layout |
| `src/components/store/Navbar.tsx` | Logo, nav links, styling |
| `src/components/store/Footer.tsx` | **Add real phone + email**, links, copy |
| `src/components/store/ProductCard.tsx` | Card layout, badge styling |
| `src/lib/translations.ts` | Any text changes in EN or ZH |

---

## 🛒 HOW TO ADD PRODUCTS (Step by Step)

1. Go to `http://localhost:5173/admin/login` (or your Netlify URL + `/admin/login`)
2. Log in with the email you added in Supabase Auth dashboard
3. Click **Add Product**
4. Fill in:
   - **Product Name (EN)** — slug auto-generates
   - **Product Name (ZH)** — Chinese name (optional but recommended)
   - **Category** — select from dropdown
   - **Description** — EN + ZH
   - **Retail Price** — required
   - **Bulk toggle** — enable + set bulk price + min qty if applicable
   - **Images** — drag and drop (uploads to Supabase Storage, auto WebP)
   - **Status** — In Stock / Out of Stock / On Order
   - **Active** — tick to make visible in store
   - **Featured** — tick to show on homepage
5. Click **Save Product**

Product is live in the store immediately.

---

## ⚡ DOS AND DON'TS

### DO
- Add products through the admin panel — never directly in Supabase table editor
- Set `active = false` to hide a product without deleting it
- Use the `featured` toggle for homepage products (aim for 4-6 featured)
- Upload multiple images per product — first image is the cover photo
- Keep slugs lowercase with hyphens (auto-generated from name)
- Test checkout using PayFast sandbox before going live
- Run `npm run typecheck` before pushing any code changes

### DON'T
- Don't put the service role key in `.env.local` — anon key only in frontend
- Don't commit `.env.local` to GitHub — it's gitignored for a reason
- Don't delete tables or columns in Supabase without updating the TypeScript types
- Don't add `select('*')` queries — always list explicit columns
- Don't load all products at once — the 50/page pagination exists for a reason
- Don't change the `order_number` format (CXX-YYYY-XXXX) — PayFast ITN matches on it
- Don't edit `src/lib/cart.ts` shipping logic without testing the cart end-to-end

---

## 🔑 QUICK REFERENCE

| Thing | Location |
|-------|----------|
| Supabase dashboard | https://supabase.com/dashboard/project/vsneqdjdkzbykkvvliju |
| GitHub repo | https://github.com/streamline-autmations/CX-Electronics |
| Local dev | http://localhost:5173 (`npm run dev`) |
| Admin login | /admin/login |
| Add admin user | Supabase → Authentication → Users → Add user |
| Brand colours | `tailwind.config.js` → `cxx.*` keys |
| All UI text | `src/lib/translations.ts` |
| Shipping logic | `src/lib/cart.ts` → `SHIPPING_THRESHOLD` + `SHIPPING_FLAT_RATE` |
| PayFast sandbox | Merchant ID: 10000100, Key: 46f0cd694581a |
