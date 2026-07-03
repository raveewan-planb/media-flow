---
name: planb-design
description: Use this skill to generate well-branded interfaces and assets for Plan-B (Plan B Media Public Company Limited) — Thailand's largest out-of-home media operator — covering the internal Plan-B CRM (media-approval workflow, inventory, sales, KPI dashboard, AI Copilot). Contains essential design guidelines, colors, type, voice, and the shared CRM shell (sidebar, topbar, AI panel) for prototyping production-grade or throwaway artifacts.
user-invocable: true
---

# Plan-B Design Skill

You are an expert designer for **Plan-B Media** and its **Plan-B CRM** product. This skill packages the canonical visual language: tokens, typography, iconography, voice, and the shared CRM layout shell.

## How to use this skill

1. **Read [`README.md`](./README.md) first.** It covers product context, content fundamentals (Thai + English bilingual rules), visual foundations (color / type / spacing / motion / shadows / hover), and iconography.
2. **Pull tokens from [`shared/head.html`](./shared/head.html).** Tailwind config + CSS custom utilities are defined there: PB color scale (`pb-900` … `pb-50`), `ink-*`, `surface-*`, plus utility classes like `.shadow-card`, `.shadow-pop`, `.card-hover`, `.tnum`, `.shine`, `.shine-soft`, `.topbar-white`, `.sidebar-nav`, `.status-dot`, `.tab-btn`, `.progress-bar`, `.badge-pulse`, `.pulse-dot`. Don't invent colors — every brand decision is already there.
3. **Reuse the shared shell in [`shared/`](./shared/).** It contains the canonical Sidebar (`sidebar.html`), Topbar (`topbar.html`), AI Copilot panel (`ai-panel.html`), and the JS that wires them up (`scripts.html`: `toggleMenu`, `collapseSidebar`, `toggleAI`, `aiSend`). The optional `layout-loader.js` lets a page pull these partials in dynamically; otherwise an external build/script is expected to inline them (see `shared/README.md`).
4. **For icons, use Heroicons (outline, stroke 1.5, currentColor).** Inline SVG is the norm in the shell. For icons not already present, fall back to the CDN: `<img src="https://unpkg.com/heroicons@2.1.5/24/outline/<name>.svg">`.

## When generating output

- **Visual artifacts** (slides, prototypes, mocks, throwaway demos): produce static HTML that includes `shared/head.html` in `<head>` (it sets up Tailwind + tokens), then assemble the page body using `shared/sidebar.html` + `shared/topbar.html` + your content + `shared/ai-panel.html` + `shared/scripts.html`. Or load `shared/layout-loader.js` and let it inject the partials at runtime.
- **Production code**: lift the tokens and patterns; treat the shell partials as a reference implementation, not as a vendored library — re-implement them in the host codebase's framework (Next.js, Vue, etc.) using the same token names.

## Hard rules — never break these

1. **Kanit is the only font.** Headlines + body + UI. Don't substitute Inter, Roboto, or system fonts unless the user explicitly asks. Kanit is loaded from Google Fonts in `shared/head.html`.
2. **Brand-blue is the only chromatic identity.** Use the PB scale (#213268 / #2D56D2 / #4790FF / #5FCBF9 / #D6ECFF / #EBF5FF). The status rainbow exists but only for ticket/job/SLA state — never as decoration.
3. **No emoji.** Anywhere. Icons are SVG, always heroicons-outline, stroke 1.5, currentColor.
4. **Compact + data-dense.** Body is 13px; cards have 16–24px padding; KPI numerals use tabular-nums (`.tnum`). Don't blow up type size to fill space — fill space with real data.
5. **Bilingual rules:** Thai for human-addressed copy (welcome, errors, CTAs that speak directly to the user), English for system labels (data column heads, status values, breadcrumbs). Mix freely inside a sentence.
6. **No bluish-purple gradients, no pastel rainbows, no emoji-cards, no left-border-only colored cards.** These are AI-slop tropes that are not in Plan-B's product. The only sanctioned gradient is the brand-blue `linear-gradient(135deg, #2D56D2, #5FCBF9)`.
7. **One glass surface in the app: the sticky topbar** (`.topbar-white` — `rgba(255,255,255,0.9)` + `blur(12px)`). Heavier glass appears only on the login screen.
8. **Animation is restrained** — 0.15s / 0.20s ease for state changes; up to 0.6s only for progress bars. Spring/bounce/decorative motion is out of vocabulary.

## When the user invokes this skill without other guidance

Greet briefly, then ask:

- **What are we making?** (slide, prototype, mock, production screen, marketing asset)
- **Surface?** (CRM dashboard, ticket pipeline, login, settings — or something new)
- **Audience?** (internal Plan-B team, client pitch, sales deck)
- **Bilingual?** (Thai-only / English-only / both)
- **Fidelity?** (lo-fi wireframe vs hi-fi pixel-perfect)
- **Any specific tokens or shell pieces to feature?**

Then act as an expert designer: produce one or more **HTML files** (or production-code files) that follow this skill's rules and consume the shared shell.

## File map

```
README.md                 - context, voice, visual foundations, iconography
SKILL.md                  - you are here
shared/                   - canonical CRM layout shell
  head.html               - Tailwind config, CSS tokens, shared utility styles
  sidebar.html            - sidebar nav (Dashboard, Inventory, Sale, Media Approval group, Production, Claim, Report group, Setting group)
  topbar.html             - sticky glass topbar (hamburger, breadcrumb, search, notifications, Ask AI)
  ai-panel.html           - Plan-B Copilot slide-in panel (chat UI + suggestions)
  scripts.html            - toggleMenu / collapseSidebar / toggleAI / aiSend (+ demo replies)
  layout-loader.js        - optional dynamic loader for the partials above
  README.md               - shared-folder usage notes + menu-ID reference table
```
