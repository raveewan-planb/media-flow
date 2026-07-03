# Plan-B Design System

A design system for **Plan B Media Public Company Limited** (Plan-B / PlanB Media) — Thailand's largest out-of-home (OOH) media operator. This system captures the visual language of the **Plan-B CRM**, an internal tool for managing the full media-booking workflow: inventory, sales, media-approval tickets, production, claims, KPI reporting and audit.

---

## What Plan-B does

Plan-B operates physical advertising surfaces — LED billboards along expressways and BTS lines, light-boxes in malls and 7-Eleven stores, airport panels, Metro panels, POS displays — across Thailand. Internally, every booking moves through a tightly governed **media-approval pipeline**: a client brief becomes a Quotation → Ticket → Jobs (one per media pack: 7-Eleven, Metro, Airport, POS, Radio) → Production → Final Approval → X-Approve → Media Allocation → Landlord Approval → Render File → live on screen. The CRM is the operating system for this workflow.

Key product surfaces in the CRM:
- **Dashboard** — hero greeting, KPIs, inventory occupancy heatmap, AI Copilot signal feed.
- **Media Ticket** pipeline — ticket list (table + Kanban), create-job, assign-job, receive-job, final-approval, media-allocate, landlord-approval, render-file.
- **Inventory / Sale / Production / Claim**.
- **Reports** — KPI dashboard, monthly report, audit log, export airtime.
- **Settings** — user, group, email, master data.
- **Plan-B Copilot** — slide-out AI panel ("Ask AI") that summarises occupancy, flags anomalies, drafts proposals.

The CRM is bilingual (Thai/English). Thai is used for instructional / human-facing copy ("ยินดีต้อนรับ", "ลืมรหัสผ่าน?"). English is used for system / data labels ("Dashboard", "Ticket No", "On Process").

---

## Corporate brand vs CRM product palette

Plan-B has **two parallel color identities**, and both live in this system:

| Context | Palette | Use |
|---|---|---|
| **Corporate brand** | `#003060` navy + `#20C0F0` sky + white | Official logo, marketing, slides, login screens, anything externally-facing. |
| **CRM product UI** | PB scale (`#213268` → `#EBF5FF`) + status rainbow | The internal CRM. A lighter, more enterprise-friendly palette tuned for dense data UI. |

Keep them separate. Use the corporate brand for anything users encounter outside the app, and the CRM scale for in-app product surfaces. Both sets are defined as Tailwind config + CSS variables in `shared/head.html`.

## Index — what's in this folder

```
README.md                ← you are here
SKILL.md                 ← Agent Skill entry
shared/                  ← shared layout partials (single source of truth for the CRM shell)
  head.html              ← <head> content: Tailwind config, CSS variables, shared styles
  sidebar.html           ← sidebar navigation with all menu items
  topbar.html            ← top bar: hamburger, breadcrumb, search, notification, Ask AI
  ai-panel.html          ← AI Copilot slide-in panel with chat UI
  scripts.html           ← shared JS: toggleMenu, collapseSidebar, toggleAI, aiSend
  layout-loader.js       ← optional JS utility for dynamic loading of the shared partials
  README.md              ← shared-folder usage notes + menu-ID reference table
```

---

## CONTENT FUNDAMENTALS

### Voice & tone
Plan-B's interface voice is **professional, efficient, and bilingual** — Thai for warmth and instruction, English for system clarity and data. Copy is functional, not playful. The product feels like a serious enterprise tool used by media planners and ops teams, not consumer software.

### Bilingual rules — when to use Thai vs English
- **Thai** is used for human-addressed prose, especially in onboarding, errors, and CTAs that speak directly to the user. Examples seen:
  - `"ยินดีต้อนรับ"` (Welcome)
  - `"กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ"` (Please log in to continue)
  - `"จัดการสื่อโฆษณาอย่างมืออาชีพ"` (Manage advertising media professionally)
  - `"ลืมรหัสผ่าน?"` (Forgot your password?)
  - `"จดจำฉัน"` (Remember me)
  - `"อนุมัติ / X-Approve"` (Approve / X-Approve)
- **English** is used for:
  - System / domain nouns: `Dashboard`, `Inventory`, `Media Ticket`, `Production`, `Claim`, `KPI Dashboard`, `Audit Log`.
  - Data labels & column heads: `Ticket No`, `Quotation No.`, `Assigned To`, `Team`, `Media`, `Status`, `Date`.
  - Status values: `Draft`, `Revise`, `Assign`, `Verify`, `On Process`, `Review`, `Final Approve`, `Final Render`.
  - Button micro-copy: `Create Ticket`, `Export`, `Open Full Detail`, `Reset Filters`, `Close`.
- **Mixed** is fine inside one sentence — e.g. `"Show 15 entries · Showing 1 to 12 of 12"` next to a Thai date.

### Casing
- **Title Case** for buttons and section headings: `Create Ticket`, `Status Overview`, `Activity Timeline`.
- **UPPERCASE with tracking** for eyebrow labels / KPI column heads / micro-meta, at 10–11px: `LIVE SIGNAL`, `TICKET NO`, `ASSIGNED TO`. (`text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600`).
- **Sentence case** for descriptive body text and AI replies.
- **Title Case** for menu items, including Thai ones (`Media Allocate`, `Landlord Approval`).

### Pronouns & address
- The system addresses the user directly but indirectly — "Good afternoon, ravewan." / "Your inventory is 78.3% full this month." Uses "**you / your**" sparingly; never "we" or "us". The Copilot speaks in **first-person singular** when offering help: "Hi — I can summarize occupancy, flag anomalies…"
- No exclamation points; no marketing puffery; no rhetorical questions.

### Numbers, dates, IDs
- Currency: **฿** prefix, comma-grouped, no decimals for large amounts: `฿128.4M`, `฿4.2M`, `฿24.8M`.
- Percentages: one decimal where precision matters (`78.3%`), integer otherwise (`+18%`, `92%`).
- Dates: `DD/MM/YYYY` (Thai convention) with `HH:MM` time appended on timeline events: `02/05/2026 11:00`.
- IDs follow strict, mono-font conventions: `TK-0031`, `QU-2026-04521`, `JOB-1040-M`, `PB-2026-0892`, `L-BK-BRN-3`, `S-NCM-5`.
- Tabular numerals (`font-variant-numeric: tabular-nums`, `.tnum` utility class in `shared/head.html`) everywhere data aligns.

### Emoji & decorative characters
- **No emoji.** Anywhere. Icons do all expressive work, and they're inline SVG (heroicons-outline style). Don't introduce 🎉 or ✨.
- Unicode bullets / arrows are used sparingly: `«` `»` for pagination, `▲ ▼` for sort, `·` as a soft separator. That's it.

### Examples — good copy
- "Your inventory is **78.3% full** this month — above forecast. Copilot flagged **2 anomalies** and drafted **3 reports** for you."
- "Rama IX LED — **100% sold-out through May**. +฿2.4M uplift possible."
- "L-BK-BRN-3 install — **SLA at risk**. Crew velocity −23% vs baseline."
- "Plan-B Copilot — may hallucinate, verify critical actions."
- "Hi — I can summarize occupancy, flag anomalies, draft proposals, or forecast revenue. What are we digging into?"

### Examples — what NOT to write
- ❌ "Let's go! 🚀 Time to crush some campaigns."
- ❌ "Hey there! Welcome back to your awesome dashboard."
- ❌ "We've got everything you need to succeed."
- These break the calm, data-first register of the product.

---

## VISUAL FOUNDATIONS

### Color
- **Corporate identity** (logo, login, marketing) is built on **navy `#003060`** + **sky `#20C0F0`** + white. Use these for any externally-facing surface.
- **The CRM product UI** is built on a 6-step **PB scale** (lighter, designed for data-dense work): `#213268` (deepest / `pb-900`) → `#2D56D2` (primary / `pb-700`) → `#4790FF` (mid / `pb-500`) → `#5FCBF9` (sky / `pb-300`) → `#D6ECFF` (`pb-100`) → `#EBF5FF` (`pb-50`). Primary buttons and links are `pb-700`; hover deepens to `pb-900`. Focus rings use `pb-500` at 15% alpha. These are wired into Tailwind in `shared/head.html`.
- **Ink** is a dark navy (`#0B1430`) rather than pure black — set against a soft cool grey body (`#F7F9FC`). Secondary text steps down through rgba opacity on the ink-700 base (`rgba(30, 41, 59, 0.6 / 0.45 / 0.3)`), not separate hex values.
- **Surfaces** are a clean cool-grey ramp (`#FFFFFF` → `#F8FAFC` → `#F1F5F9` → `#E2E8F0` → `#CBD5E1`).
- **Status colors** (used on tickets, jobs, claims) span the rainbow but always in the muted **50-tint bg / 200 border / 700 text** triplet: slate (Draft), amber (Revise), orange (Assign), violet (Verify), blue (On Process), cyan (Review), emerald (Final Approve / Done), indigo (Final Render). Never use the saturated 500 hex as a background — only as the small status dot or progress-bar fill.
- **One tasteful gradient** exists: brand-blue (`linear-gradient(135deg, #2D56D2, #5FCBF9)`). It appears on the brand mark (`PB` tile in `shared/sidebar.html`), the Copilot icon, and as a sub-1% soft wash (`.shine-soft`). The login screen escalates this into an animated dark-navy gradient and the dashboard hero uses radial blue glows on a `#0B1430` background. **No bluish-purple gradients, no pastel rainbows.**

### Typography
- **Kanit** for everything (UI + headings + body). Pulled from Google Fonts in `shared/head.html`; weights 300 / 400 / 500 / 600 / 700. Kanit handles Thai + Latin together, which is non-negotiable for a Thai-language CRM.
- **Monospace** (system default) for IDs, dates and tabular code-ish fragments.
- The system is **compact and data-dense**. Body text is 13px. Section headings stay 15–18px. KPI numbers go large at 26px with tabular numerals. Eyebrow labels are 10–11px uppercase with 0.05em tracking. Don't push H1 past ~30px even in the hero.
- Line-heights stay tight (1.2–1.5).

### Spacing & layout
- 4px grid: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64.
- **App shell**: fixed sidebar (256px / `w-64` expanded, 68px collapsed) + sticky 64px topbar + scrolling main. The collapse logic lives in `shared/scripts.html` (`collapseSidebar`). Drawers (AI / detail) slide in from the right at 420–480px.
- Content max-width: 1600px, centred, padded 24px on desktop, 12–16px on mobile.
- Cards sit on the app bg with `border: 1px solid #E2E8F0` and a **very subtle shadow** (`0 1px 3px rgba(11,20,48,0.06), 0 1px 2px rgba(11,20,48,0.04)` — the `.shadow-card` utility). Card-internal padding is 20–24px.
- Grids: KPI rows are `grid-cols-2 lg:grid-cols-4`. Inventory heatmap uses a 13-col grid (`160px repeat(12, 1fr) 50px`).

### Corner radii
- 4px for pills/sub-bars; 6–8px for badges and inputs; **10px (`rounded-lg`) is the default for buttons**; **12px (`rounded-xl`) is the default for cards**; 16px (`rounded-2xl`) for hero panels and modals; 24px (`rounded-3xl`) on the glass login card. Avoid fully-pill buttons except for status badges and small count pills.

### Backgrounds
- App bg: flat `#F7F9FC`.
- Hero strip: dark `#0B1430` with two radial-gradient glows. Text in white with `pb-300` accent and amber/emerald for warning/positive callouts.
- Login: animated multi-stop dark-navy → sky-blue gradient + floating particles + faint city skyline silhouettes. Reserved for unauthenticated screens; not used post-login.
- **No full-bleed photography in product screens. No hand-drawn illustrations. No repeating patterns or textures.** The product is data-first. Imagery, when needed, is rendered as simple geometric SVG (bar charts, city silhouettes).

### Shadows & elevation
- `.shadow-card`: default card shadow — barely visible, just enough to separate from `#F7F9FC` bg.
- `.card-hover`: lift on hover for clickable cards (`translateY(-2px)` + `0 8px 25px rgba(33,50,104,0.12)`).
- `.shadow-pop`: popovers / dropdowns (`0 8px 30px rgba(11,20,48,0.12)`).
- AI panel drawer shadow: `-8px 0 30px rgba(11,20,48,0.08)` (inline in `shared/ai-panel.html`).
- Input focus: 3px blue ring at 15% alpha (`rgba(71,144,255,0.15)`) on every input/select/textarea focus — global rule in `shared/head.html`.
- **No inner shadows. No emboss/deboss. No glow except** on the login logo (decorative).

### Borders
- Default: `1px solid #E2E8F0`.
- Stronger / form: `1px solid #CBD5E1`.
- Active sidebar item gets a **3px left bar** (`background: #2D56D2`, via the `.sidebar-nav.active::before` rule) rather than a full border or background fill.
- Tabs: `.tab-btn.active` uses `border-bottom: 2px solid #2D56D2`; inactive tabs borderless.
- Status badges: 1px solid in the status-200 tint.

### Transparency, blur & glass
- **One glass surface in the app**: the sticky topbar uses `.topbar-white` → `background: rgba(255,255,255,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid #E2E8F0` (defined in `shared/head.html`, applied in `shared/topbar.html`).
- Heavier glass appears only on the login screen (login-only — don't bring it inside the app).
- Mobile drawers darken the rest of the app with `bg-black/40` (sidebar overlay) / similar.
- Disabled controls use `opacity: 0.4`. Hover dimming uses `opacity: 0.8`.

### Animation & motion
- **Restrained and functional.** Most transitions are `0.15s ease` (instant feel) or `0.20s ease` (state changes). Slow `0.30s+ ease` is reserved for progress bars (`.progress-bar`: `transition: width 0.6s ease`).
- Sidebar collapse: 0.2s width transition.
- Drawers (AI panel): `transform: translateX(...)` over 0.2s, no fade.
- Hover on KPI / clickable cards: `translateY(-2px)` + `shadow-hover`.
- Pulse animations: `.badge-pulse` (2s opacity pulse) and `.pulse-dot` (2s scale + opacity, used for AI "thinking" indicator in `shared/scripts.html`).
- The login screen is the **one place where animation is exuberant** — gradient drift, particles floating up, animated SVG bar chart, building windows flickering, logo glow pulse.
- No bounces, no springy easing, no entrance animations on dashboards.

### Hover & press states
- **Hover on buttons**: primary → `#213268` (one shade darker); secondary → fill with surface-50; link → underline or color shift to `pb-900`.
- **Hover on rows**: bg shifts to `rgba(235,245,255,0.30)` (pb-50 at 30%).
- **Hover on sidebar items**: `.sidebar-nav:hover` → bg shifts to `rgba(71,144,255,0.06)` (pb-500 at 6%) and text to ink-900.
- **Hover on cards**: `.card-hover` → `translateY(-2px)` + the hover shadow.
- **Press / active**: scale `[0.98]` is used on the login button; for all other buttons there's no press transform — only the hover state.
- **Disabled**: `opacity: 0.4`.
- **Focus**: 3px ring on inputs / selects / textareas in `rgba(71,144,255,0.15)`.

---

## ICONOGRAPHY

Plan-B uses **Heroicons (outline variant)** exclusively. Every icon in the codebase is inlined SVG with `stroke-width="1.5"` and `stroke="currentColor"`, sized 14–20px (most often 18px in nav and 16px in body chrome). They're never filled; they always inherit text colour. Examples are inlined throughout `shared/sidebar.html`, `shared/topbar.html`, and `shared/ai-panel.html`.

For icons not yet in the markup, fall back to the Heroicons CDN:

```html
<!-- Quick CDN access to any Heroicons outline icon -->
<img src="https://unpkg.com/heroicons@2.1.5/24/outline/squares-2x2.svg" width="18" height="18" />
```

### Conventions
- **Outline only.** Never solid / mini variants. Stroke 1.5 always.
- **Currentcolor.** Icon colour follows text. Don't hard-code icon hex.
- **Size pairs with text**: 14px (with 11px meta), 16px (with 13px body), 18px (with sidebar 13px), 20px (with H4 / standalone control button).
- **Standalone control buttons** (the small icon-only buttons in the topbar / row hover) are 36×36 (`w-9 h-9`) with an 18px icon centered and `hover:bg-surface-100`.
- **Inside coloured backgrounds** (status badges, hero signal cards), icons are 12–14px and live inside a 28×28 rounded square at 10% alpha.

### Brand mark
The in-app CRM brand tile is rendered inline in `shared/sidebar.html`: a 36×36 rounded square with the gradient `linear-gradient(135deg, #2D56D2, #5FCBF9)` and white "PB" text, paired with the wordmark "Plan-B **CRM**" + "Media Intelligence" eyebrow. This is product chrome — for the official corporate Plan-B Media wordmark (navy `#003060` + sky-blue dot + "B"), ask the Plan-B brand team for the master artwork.

### Other glyphs
- Status dots: `.status-dot` utility — 8×8 circles in the saturated status hex.
- Avatars are 24–40px circles, deterministically coloured from a hash, with white initials in 600 weight (the user-footer avatar in `shared/sidebar.html` shows the pattern: 32×32, `#4790FF`, "RK").
- No emoji, no flag icons, no Unicode pictographs. Bullets are CSS, not characters.

---

## Open questions / FLAGGED substitutions

1. **No corporate brand-mark assets in this folder.** The corporate Plan-B Media wordmark (navy + sky-blue dot) is described in this doc but no logo files are included. If you need to render it on a login or marketing surface, ask the Plan-B brand team for the Illustrator / AI / EPS source.
2. **No brand book.** The CRM palette is canonical (encoded in `shared/head.html`), but typography rules, secondary palette, and tone-of-voice rules for Plan-B's external comms aren't yet codified. Confirm before re-using CRM tokens on customer-facing material.
3. **Font: Kanit is loaded from Google Fonts** (web). No local `.woff2`/`.ttf` files are bundled — Kanit is open source so this is fine, but if Plan-B has a self-hosted bundle, drop it in and update the `<link>` in `shared/head.html`.
4. **No imagery** (photos of billboards, office, team) provided. Slides / marketing material would need that to be filled in.
5. **No standalone CSS tokens file, icon set, UI-kit components, preview cards, or page screens** are present in this folder. The shell (head/sidebar/topbar/ai-panel/scripts) is the only implemented surface — page bodies are expected to be authored separately and to consume the shared partials via `shared/layout-loader.js` (or by being assembled by an external script — see `shared/README.md`).
