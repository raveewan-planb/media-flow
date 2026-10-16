# HANDOVER — Media Flow / Plan-B CRM Prototype

เอกสารส่งต่อสำหรับ **Claude Account ใหม่** เพื่อทำงานต่อจากเดิมได้ทันที
อัปเดตล่าสุด: 2026-09-10

---

## 1. สรุปโปรเจกต์ (Context)

- **ชื่อโปรเจกต์:** Media Flow System (Plan-B CRM Design Prototype)
- **ลูกค้า/องค์กร:** Plan B Media Public Company Limited — ผู้ให้บริการ Out-of-Home Media รายใหญ่สุดของไทย
- **ประเภทงาน:** Design Prototype (Static HTML + Tailwind CDN) — ไม่ใช่ production code
- **จุดประสงค์:** ต้นแบบระบบ CRM ภายใน สำหรับจัดการ pipeline การอนุมัติสื่อโฆษณา (Ticket → Job → Production → Approval → Media Allocate → Landlord Approval → Render → On-screen)
- **โฟลเดอร์ทำงาน:** `C:\Users\raveewan.ka\Desktop\Claude\Design\CRM\MediaControl`

---

## 2. ไฟล์สำคัญที่ต้องอ่านก่อนเริ่มงานต่อ

เปิดตามลำดับนี้เพื่อเข้าใจ context ทั้งหมด:

1. **`SKILL.md`** — Skill entry: กฎเหล็ก, tokens, shell ที่ห้ามแตะ
2. **`README.md`** — Design System เต็ม: voice/tone (ไทย+อังกฤษ), color scale, typography, spacing, iconography
3. **`shared/README.md`** — ตาราง menu IDs และวิธี inject partials เข้าแต่ละหน้า
4. **`shared/head.html`** — Tailwind config + CSS tokens ทั้งหมด (pb-900…pb-50, ink-*, surface-*, utility classes)
5. **`shared/sidebar.html` / `topbar.html` / `ai-panel.html` / `scripts.html`** — canonical shell
6. **`DEPLOY.md`** — วิธี deploy ขึ้น Netlify / Vercel / GitHub Pages (ภาษาไทย)

---

## 3. กฎเหล็ก (Hard Rules — ห้ามผิด)

1. **Font: Kanit เท่านั้น** ทั้ง UI + heading + body (โหลดจาก Google Fonts ใน `shared/head.html`)
2. **สี Brand:** ใช้ PB scale เท่านั้น (`#213268 / #2D56D2 / #4790FF / #5FCBF9 / #D6ECFF / #EBF5FF`) — status rainbow ใช้เฉพาะ ticket/job state
3. **ห้ามใช้ emoji** ทุกที่ — ใช้ Heroicons outline (stroke 1.5, currentColor) เท่านั้น
4. **Compact + data-dense:** body = 13px, card padding 16–24px, KPI numeral ใช้ `.tnum` (tabular numerals)
5. **Bilingual:** ไทยสำหรับข้อความคุยกับคน (welcome, error, CTA), อังกฤษสำหรับ system label (column head, status, breadcrumb)
6. **ห้าม:** bluish-purple gradient, pastel rainbow, left-border-only colored card, glass surface นอกจาก topbar
7. **Gradient เดียวที่ใช้ได้:** `linear-gradient(135deg, #2D56D2, #5FCBF9)` (brand mark + Copilot icon)
8. **Animation:** 0.15s–0.20s ease เท่านั้น (progress bar ได้ถึง 0.6s) — ห้าม spring/bounce

---

## 4. Palette & Tokens ที่ควรจำ

| Token | Hex | ใช้ที่ไหน |
|---|---|---|
| `pb-900` | `#213268` | Deepest, hover state |
| `pb-700` | `#2D56D2` | Primary button, link |
| `pb-500` | `#4790FF` | Mid accent, focus ring |
| `pb-300` | `#5FCBF9` | Sky accent |
| `pb-100` | `#D6ECFF` | Light bg |
| `pb-50`  | `#EBF5FF` | Softest bg |
| `ink-900` | `#0B1430` | Primary text |
| Body bg | `#F7F9FC` | App background |
| Card border | `#E2E8F0` | Default border |
| **Corporate** navy | `#003060` | Logo, login, marketing (นอก app) |
| **Corporate** sky | `#20C0F0` | Logo dot |

- Radius: pill 4px / badge 6–8px / button `rounded-lg` 10px / card `rounded-xl` 12px / modal `rounded-2xl` 16px
- Shadow: ใช้ `.shadow-card` (default) และ `.shadow-pop` (popover)

---

## 5. โครงสร้างหน้า (Pages Built So Far — ~70 ไฟล์)

**Auth & Landing:** `login.html`, `index.html`
**Dashboard:** `dashboard.html`, `kpi-dashboard.html`, `ma-dashboard.html`
**Media Approval Pipeline:** `job-list.html`, `create-job.html`, `assign-job.html`, `assign-detail.html`, `receive-job.html`, `job-detail.html`, `job-preview.html`, `airtime-allocate.html`
**Core Modules:** `inventory.html` (+ create/edit/import), `sale.html`, `production.html`, `claim.html`, `favorite.html`
**Media Management:** `media-management.html`, `media-detail-management.html`, `media-create.html`
**Reports:** `report-audit.html`, `report-monthly.html`, `export-airtime.html`
**Settings:** `settings-user.html`, `settings-usergroup.html`, `settings-email.html`, `settings-email-template.html`, `settings-master.html`
**Master Data:** `master-*.html` (~25 ไฟล์ — area, zone, bus, format, position, status, ฯลฯ)
**Support:** `customer-review.html`, `ticket-detail.html`

---

## 6. Workflow การแก้ไข

- **แก้ sidebar / topbar / AI panel / shared styles:**
  แก้ที่ `shared/*.html` แล้วรัน `python3 update-sidebar.py` (สคริปต์นี้ไม่ได้อยู่ใน repo — อาจต้องเขียนใหม่ หรือแก้ทีละหน้าด้วย Edit tool)
- **สร้างหน้าใหม่:** copy หน้าที่ใกล้เคียงที่สุด → เปลี่ยน `active_menu_id`, title, subtitle → แก้ body
- **Icons ที่ยังไม่มีในโค้ด:** ใช้ CDN `https://unpkg.com/heroicons@2.1.5/24/outline/<name>.svg`

---

## 7. Voice & Copy — ตัวอย่างที่ผ่านมา

**ดี:**
- "Your inventory is **78.3% full** this month — above forecast."
- "Rama IX LED — **100% sold-out through May**."
- "L-BK-BRN-3 install — **SLA at risk**. Crew velocity −23% vs baseline."
- "ยินดีต้อนรับ" / "ลืมรหัสผ่าน?" / "จดจำฉัน"

**ห้ามเขียน:**
- "Let's go! 🚀 Time to crush some campaigns."
- "Hey there! Welcome back to your awesome dashboard."
- ห้ามใช้ ! หรือ marketing puffery หรือ rhetorical question

---

## 8. ID Conventions (mono font)

- Ticket: `TK-0031`
- Quotation: `QU-2026-04521`
- Job: `JOB-1040-M`
- Media pack: `PB-2026-0892`
- Location code: `L-BK-BRN-3`, `S-NCM-5`
- Date: `DD/MM/YYYY` เช่น `02/05/2026 11:00`
- Currency: `฿128.4M`, `฿4.2M` (ไม่มีทศนิยม)
- % : `78.3%` (1 ทศนิยม), `+18%` (integer)

---

## 9. Deploy

โปรเจกต์ deploy ผ่าน **Netlify** (มี `netlify.toml` + `_redirects` เตรียมไว้แล้ว)
วิธีเร็วสุด: ลากโฟลเดอร์ไปวางที่ https://app.netlify.com/drop
รายละเอียดครบใน `DEPLOY.md`

---

## 10. สิ่งที่ Account ใหม่ควรทำเป็นอันดับแรก

1. เปิดโฟลเดอร์นี้ (`C:\Users\raveewan.ka\Desktop\Claude\Design\CRM\MediaControl`) ใน Claude Desktop
2. อ่านไฟล์ตามลำดับใน **ส่วนที่ 2** (ประมาณ 10 นาที)
3. ถ้าจะสร้างหน้าใหม่ → ใช้ `SKILL.md` (Plan-B Design Skill) เป็น reference
4. ถ้าจะแก้ shell (sidebar/topbar) → แก้ที่ `shared/` แล้ว sync ไปทุกหน้า
5. **ตั้ง Project Instruction ใน Account ใหม่ให้เหมือนเดิม:** `"Design prototype for Media Flow System"`

---

## 11. ข้อควรระวังก่อนย้าย Account

- [ ] Backup โฟลเดอร์ทั้งหมด (โดยเฉพาะ `shared/` และไฟล์ `.html` ทุกไฟล์)
- [ ] จด Netlify site URL + login credentials (ถ้า deploy แล้ว)
- [ ] จด Custom domain / DNS setting ถ้ามี
- [ ] Export / Save skill `planb-design` (`SKILL.md`) ถ้าอยากใช้ต่อ
- [ ] Screenshot หน้าจอสำคัญไว้เป็น reference visual
- [ ] ไฟล์ CSV (`MasterMediaApproval.csv`, `new-inventory-fields.csv`, `templates/*.csv`) — เป็น master data ที่ใช้อ้างอิงตอนออกแบบ form

---

**End of Handover** — Account ใหม่อ่านไฟล์นี้ + `SKILL.md` + `README.md` ก็ทำงานต่อได้ทันที
