# คู่มือ Deploy — Media Flow System Prototype

คู่มือย่อสำหรับ deploy prototype นี้ให้ user เข้ามากดเล่นได้เหมือน landing page ทั่วไป

---

## วิธีที่ 1 — Netlify Drop (ง่ายสุด · ไม่ต้อง Git · ใช้เวลา 1 นาที)

เหมาะกับการทดลอง demo ให้ทีมดูก่อน หรือส่งลิงก์ให้ลูกค้ารีวิว

1. เปิด https://app.netlify.com/drop ในเบราว์เซอร์
2. ลากทั้งโฟลเดอร์ `MediaFlow` (โฟลเดอร์ที่มีไฟล์นี้อยู่) ไปวางในหน้าเว็บ Netlify Drop
3. รอสักครู่ Netlify จะให้ URL แบบ `https://random-name-123.netlify.app`
4. เปิด URL นั้นดู — จะเจอ `index.html` เป็นหน้าแรกอัตโนมัติ

**อยากเปลี่ยนชื่อ subdomain?** สมัคร Netlify account (ฟรี) → ไปที่ Site settings → Domain management → Options → Edit site name → เปลี่ยนเป็น `mediaflow-demo.netlify.app` หรืออะไรก็ได้ที่ยังว่าง

**อยาก update เนื้อหา?** แก้ไฟล์ในเครื่อง → ลากโฟลเดอร์ทั้งหมดไปวางซ้ำที่ Netlify Drop เดิม → เว็บอัปเดตทันที

---

## วิธีที่ 2 — Netlify + GitHub (Auto-deploy ทุกครั้งที่ commit)

เหมาะกับการใช้งานระยะยาว แก้ code แล้ว deploy อัตโนมัติ

1. Push โฟลเดอร์นี้ขึ้น GitHub repo
   ```bash
   cd MediaFlow
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/mediaflow-prototype.git
   git push -u origin main
   ```
2. เข้า https://app.netlify.com → **Add new site** → **Import an existing project** → เลือก GitHub → เลือก repo
3. Build settings ไม่ต้องแก้อะไร (มี `netlify.toml` เตรียมไว้แล้ว) → กด Deploy
4. ต่อไปทุกครั้งที่ `git push` เว็บจะอัปเดตอัตโนมัติภายใน ~30 วินาที

---

## วิธีที่ 3 — Vercel (คล้าย Netlify · UI ดี · CDN เร็ว)

1. เข้า https://vercel.com → Sign in with GitHub
2. Import Git Repository → เลือก repo ของ MediaFlow
3. Framework Preset: **Other** → Build & Output Settings: ปล่อยว่างหมด → Deploy
4. ได้ URL แบบ `mediaflow-prototype.vercel.app`

**หมายเหตุ:** ไฟล์ `_redirects` เป็นของ Netlify — Vercel ใช้ `vercel.json` แทน ถ้าจะใช้ Vercel ต้องเขียนแยก แต่ prototype ทำงานได้ปกติแม้ไม่มี pretty URLs

---

## วิธีที่ 4 — GitHub Pages (ฟรีถาวร · ต้อง Git)

1. Push โค้ดขึ้น GitHub repo (ดูวิธีในข้อ 2)
2. เข้า repo → Settings → Pages
3. Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)` → Save
4. รอ ~1 นาที ได้ URL: `https://your-username.github.io/mediaflow-prototype/`

**ข้อจำกัด:** GitHub Pages ไม่รองรับ `_redirects` และ `netlify.toml` — pretty URLs (`/dashboard` แทน `/dashboard.html`) จะไม่ทำงาน แต่หน้าเว็บทั้งหมดยังใช้ได้ปกติ

---

## ป้องกันไม่ให้คนอื่นเข้าได้ (ตั้ง Password)

**Netlify (Pro plan ขึ้นไป):**
Site settings → Access & security → Visitor access → Password protection

**Netlify (ฟรี — ใช้ Basic Auth):**
สร้างไฟล์ `_headers` ในโฟลเดอร์นี้:
```
/*
  Basic-Auth: username:password
```

**Cloudflare Access (ฟรี · ปลอดภัยที่สุด):**
ถ้าใช้ custom domain กับ Cloudflare อยู่แล้ว เปิด Cloudflare Access → กำหนดให้ต้อง login ผ่าน email OTP ก่อนเข้าเว็บ

---

## ผูก Custom Domain (เช่น `demo.planbmedia.co.th`)

1. **Netlify:** Site settings → Domain management → Add custom domain
2. เพิ่ม CNAME record ใน DNS ของโดเมน:
   ```
   demo.planbmedia.co.th   CNAME   your-site.netlify.app
   ```
3. รอ DNS propagate (~5 นาที – 24 ชั่วโมง)
4. Netlify จะออก SSL cert (Let's Encrypt) ให้อัตโนมัติ

---

## ก่อน Publish — Checklist

- [ ] ทดสอบเปิด `index.html` แล้วคลิกครบทุกลิงก์ในหน้า — ต้องเข้าไปหน้า Dashboard, MA, Inventory ฯลฯ ได้จริง
- [ ] ตรวจว่าไฟล์ `shared/sidebar.js`, `shared/topbar.html` โหลดได้ (เปิด DevTools → Console → ไม่มี error สีแดง)
- [ ] ตรวจว่าไม่มีข้อมูลลูกค้าจริง / เบอร์โทรลูกค้า / ราคาจริง หลุดใน mock data
- [ ] ถ้าเป็น prototype ที่ยังไม่พร้อมโชว์ต่อสาธารณะ — เปิด password protection ตามหัวข้อด้านบน
- [ ] อยากติดตาม analytics? เพิ่ม Netlify Analytics ($9/เดือน) หรือ Plausible / Umami แทน Google Analytics เพื่อเลี่ยง cookie banner

---

## ไฟล์ที่เตรียมไว้แล้วสำหรับ Deploy

| ไฟล์ | หน้าที่ |
|---|---|
| `index.html` | Landing page — หน้าแรกที่ user เห็น มี CTA ไป login และ quick-links ไปทุก module |
| `_redirects` | Pretty URL rules สำหรับ Netlify (`/dashboard` → `/dashboard.html`) |
| `netlify.toml` | Config Netlify — security headers, cache rules, noindex |
| `robots.txt` | บอก Google/Bing ห้าม index — ป้องกัน prototype โผล่ใน Search |
| `DEPLOY.md` | ไฟล์นี้ |

---

## Troubleshooting

**Q: เปิด `index.html` ใน browser แบบ double-click แล้ว sidebar ไม่โหลด**
A: เพราะ `layout-loader.js` ใช้ `fetch()` ซึ่งไม่ทำงานกับ `file://` protocol — พอ deploy ขึ้น hosting จริงจะทำงานได้ปกติ ถ้าอยากทดสอบ local ใช้ `npx serve .` หรือ `python -m http.server`

**Q: หน้าเว็บโหลดช้ามาก**
A: เพราะ Tailwind ใช้ CDN JIT compiler — ครั้งแรกจะช้า ครั้งต่อไป browser cache ให้ ถ้าจะ deploy production จริง ควร build Tailwind แบบ static ผ่าน `tailwindcss` CLI (ลด CSS จาก ~3MB เหลือ ~50KB)

**Q: อยากซ่อน "Design Prototype" banner ในหน้า landing**
A: แก้ `index.html` — ค้นหา class `proto-banner` แล้วลบ div นั้นออก

**Q: จะเปลี่ยนสี Brand ให้ตรงกับ Corporate ยังไง**
A: Palette อยู่ในบล็อค `tailwind.config` ตอนต้นของ `index.html` — แก้ค่า `pb-700`, `pb-500`, `corp.navy`, `corp.sky` ได้เลย

---

**แนะนำเริ่มด้วย Netlify Drop ก่อน** — ใช้เวลา 1 นาที ได้ลิงก์ทดสอบทันที ถ้าใช้ดีค่อยย้ายไป workflow ที่ deploy อัตโนมัติทีหลัง
