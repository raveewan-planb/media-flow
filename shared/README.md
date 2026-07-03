# Shared Layout Files — Plan-B CRM

These files contain the shared UI components used across all pages.
Edit these files to update the layout globally.

## Files

| File | Description | Lines |
|------|-------------|-------|
| `head.html` | `<head>` content: Tailwind config, CSS variables, shared styles | 60 |
| `sidebar.html` | Sidebar navigation with all menu items (no active state) | 139 |
| `topbar.html` | Top bar: hamburger, breadcrumb, search, notification, Ask AI | 23 |
| `ai-panel.html` | AI Copilot slide-in panel with chat UI | 41 |
| `scripts.html` | Shared JavaScript: toggleMenu, collapseSidebar, toggleAI, aiSend | 116 |
| `layout-loader.js` | JS utility for dynamic loading (optional) | 72 |

## How it works

Currently, `update-sidebar.py` reads these shared parts and injects them into each page.
The shared files serve as the **single source of truth** for the layout.

### To update sidebar menu:
1. Edit `shared/sidebar.html`
2. Run `python3 update-sidebar.py`
3. All 23 pages will be updated

### To update styles:
1. Edit `shared/head.html`
2. Run `python3 update-sidebar.py`

### To update AI panel or scripts:
1. Edit `shared/ai-panel.html` or `shared/scripts.html`
2. Run `python3 update-sidebar.py`

## Page-specific configuration

Each page in `update-sidebar.py` has a config entry:
```python
"filename.html": ("active_menu_id", "Page Title", "Page Subtitle")
```

The `active_menu_id` determines which sidebar menu item is highlighted.

## Menu IDs

| ID | Menu Item |
|----|-----------|
| `dashboard` | Dashboard |
| `inventory` | Inventory |
| `sale` | Sale |
| `ma-dashboard` | Media Approval > Dashboard |
| `ma-joblist` | Media Approval > Media Ticket |
| `ma-assign` | Media Approval > Assign Ticket |
| `ma-receive` | Media Approval > Production & Review |
| `ma-approve` | Media Approval > อนุมัติ / X-Approve |
| `ma-allocate` | Media Approval > Media Allocate |
| `ma-landlord` | Media Approval > Landlord Approval |
| `ma-render` | Media Approval > Render File |
| `production` | Production |
| `claim` | Claim |
| `rpt-kpi` | Report > KPI Dashboard |
| `rpt-export` | Report > Export Airtime |
| `rpt-monthly` | Report > Monthly Report |
| `rpt-audit` | Report > Audit Log |
| `stg-user` | Setting > User Management |
| `stg-group` | Setting > User Group Management |
| `stg-email` | Setting > Email Setup |
| `stg-master` | Setting > Master Data |
