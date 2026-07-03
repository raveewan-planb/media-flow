/* ============================================================
 * shared/sidebar.js — ONE sidebar for ALL pages (static + React).
 *
 * USAGE on every page:
 *   <script src="shared/sidebar.js"></script>
 *
 * The script renders the sidebar HTML synchronously on DOMContentLoaded
 * into <aside id="sidebar"></aside> (creates one if missing).
 *
 * To update the menu — edit the NAV array below. ONE place, ALL pages.
 * ============================================================ */

(function () {
  if (window.__PB_SIDEBAR__) return;
  window.__PB_SIDEBAR__ = true;

  /* ───── Global UX polish: make close-X buttons clearly visible across all pages ─────
     Targets any <button> whose <svg> contains the X path "M6 18L18 6M6 6l12 12" (the
     close icon used system-wide). Uses :has() — supported in all evergreen browsers. */
  (function injectCloseBtnStyles(){
    if (document.getElementById('pb-close-btn-styles')) return;
    var st = document.createElement('style');
    st.id = 'pb-close-btn-styles';
    st.textContent =
      'button:has(> svg path[d="M6 18L18 6M6 6l12 12"]),' +
      'button:has(> svg > path[d="M6 18L18 6M6 6l12 12"]){' +
        'background:#F1F5F9 !important;' +
        'color:#0B1430 !important;' +
        'border:1px solid #CBD5E1 !important;' +
        'transition:background .15s, color .15s, border-color .15s, transform .1s;' +
      '}' +
      'button:has(> svg path[d="M6 18L18 6M6 6l12 12"]):hover,' +
      'button:has(> svg > path[d="M6 18L18 6M6 6l12 12"]):hover{' +
        'background:#FEE2E2 !important;' +
        'color:#B91C1C !important;' +
        'border-color:#FCA5A5 !important;' +
      '}' +
      'button:has(> svg path[d="M6 18L18 6M6 6l12 12"]):active,' +
      'button:has(> svg > path[d="M6 18L18 6M6 6l12 12"]):active{' +
        'transform:scale(.94);' +
      '}' +
      'button:has(> svg path[d="M6 18L18 6M6 6l12 12"]) svg,' +
      'button:has(> svg > path[d="M6 18L18 6M6 6l12 12"]) svg{' +
        'opacity:1 !important;' +
        'stroke-width:2 !important;' +
      '}';
    (document.head || document.documentElement).appendChild(st);
  })();

  /* ───── Icon paths (heroicons outline) ───── */
  const ICONS = {
    dashboard:  'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z',
    inventory:  'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z',
    sale:       'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z',
    production: 'M11.42 15.17l-5.1-5.1a2.25 2.25 0 010-3.182l.71-.71a2.25 2.25 0 013.18 0l2.8 2.8 2.8-2.8a2.25 2.25 0 013.18 0l.71.71a2.25 2.25 0 010 3.182l-5.1 5.1a2.25 2.25 0 01-3.18 0z',
    claim:      'M9 12h3.75M9 15h3.75M9 18h3.75M16.5 18.75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M8.25 8.25h4.875c.621 0 1.125-.504 1.125-1.125V6.108',
    ma:         'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    rpt:        'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    stg:        'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75',
    chev:       'M19.5 8.25l-7.5 7.5-7.5-7.5',
    logout:     'M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9',
    favorite:   'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
  };

  /* ───── Single source of truth — menu structure ───── */
  const NAV = [
    { type:'item', icon:'favorite',  label:'Home',       href:'favorite.html',   color:'#F59E0B' },
    { type:'item', icon:'dashboard', label:'Dashboard',  href:'dashboard.html',  color:'#2D56D2' },
    { type:'item', icon:'inventory', label:'Inventory',  href:'inventory.html',  color:'#06B6D4' },
    { type:'item', icon:'sale',      label:'Sale',       href:'sale.html',       color:'#10B981' },
    { type:'group', id:'ma', icon:'ma', label:'Media Approval', color:'#7C3AED', children:[
      { label:'Dashboard',          href:'ma-dashboard.html' },
      { label:'Media Ticket',       href:'job-list.html' },
      { label:'Assign Ticket',      href:'assign-job.html' },
      { label:'Verify & Production',href:'receive-job.html' },
      { label:'Media Management',   href:'media-management.html' }
    ]},
    { type:'item', icon:'production', label:'Production', href:'production.html', color:'#F59E0B' },
    { type:'item', icon:'claim',      label:'Claim',      href:'claim.html',      color:'#EC4899' },
    { type:'group', id:'rpt', icon:'rpt', label:'Report', color:'#0EA5E9', children:[
      { label:'KPI Dashboard',  href:'kpi-dashboard.html' },
      { label:'Export Airtime', href:'export-airtime.html' },
      { label:'Monthly Report', href:'report-monthly.html' },
      { label:'Audit Log',      href:'report-audit.html' }
    ]},
    { type:'group', id:'stg', icon:'stg', label:'Setting', color:'#EF4444', children:[
      { label:'User Management',       href:'settings-user.html' },
      { label:'User Group Management', href:'settings-usergroup.html' },
      { label:'Email Setup',           href:'settings-email.html' },
      { label:'Master Data',           href:'settings-master.html' }
    ]}
  ];

  function currentFile() {
    const p = (location.pathname.split('/').pop() || '').toLowerCase();
    return p || 'dashboard.html';
  }

  function svg(d, size) {
    size = size || 18;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
  }

  function renderItem(item, activeHref) {
    const isActive = item.href === activeHref;
    const c = item.color || '#2D56D2';
    const itemStyle = isActive ? 'background:' + c + '14;color:' + c : '';
    const iconStyle = 'color:' + c + (isActive ? ';background:' + c + '22' : '');
    return '<a href="' + item.href + '" class="sb-item' + (isActive ? ' active' : '') + '" style="' + itemStyle + '">'
      + '<span class="sb-icon" style="' + iconStyle + '">' + svg(ICONS[item.icon], 16) + '</span>'
      + '<span class="sb-label">' + item.label + '</span>'
      + '</a>';
  }

  function renderSub(child, activeHref) {
    const isActive = child.href === activeHref;
    let badge = '';
    if (child.badge) {
      badge = '<span class="sb-badge" style="background:' + child.badge.color + '">' + child.badge.count + '</span>';
    }
    return '<a href="' + child.href + '" class="sb-sub' + (isActive ? ' active' : '') + '">'
      + '<span class="sb-sub-label">' + child.label + '</span>'
      + badge + '</a>';
  }

  function renderGroup(group, activeHref) {
    const hasActive = group.children.some(function (c) { return c.href === activeHref; });
    let html = '<div class="sb-group sb-grp-' + group.id + (hasActive ? ' open' : '') + '" data-group="' + group.id + '">';
    html += '<button type="button" onclick="window.PBToggleGroup(\'' + group.id + '\')" class="sb-grp-btn' + (hasActive ? ' active' : '') + '">'
      + '<span class="sb-icon sb-grp-icon" style="color:' + group.color + '">' + svg(ICONS[group.icon], 16) + '</span>'
      + '<span class="sb-grp-label">' + group.label + '</span>'
      + '<span class="sb-chev">' + svg(ICONS.chev, 12) + '</span>'
      + '</button>';
    html += '<div class="sb-grp-children">';
    for (let i = 0; i < group.children.length; i++) html += renderSub(group.children[i], activeHref);
    html += '</div></div>';
    return html;
  }

  function renderBrand() {
    return '<div class="sb-brand" id="sidebar-brand">'
      + '<img src="logo.jpg" alt="Plan-B" class="sb-logo" />'
      + '<span class="sb-brand-text">Media Flow System</span>'
      + '</div>';
  }

  function renderFooter() {
    return '<div class="sb-footer">'
      + '<div class="sb-user">'
      + '<div class="sb-avatar">RK</div>'
      + '<div class="sb-user-info">'
      + '<div class="sb-user-name">ravewan k.</div>'
      + '<div class="sb-user-role"><span class="sb-dot-green"></span>Admin · Plan-B</div>'
      + '</div>'
      + '<a href="login.html" class="sb-logout" title="ออกจากระบบ">' + svg(ICONS.logout, 15) + '</a>'
      + '</div></div>';
  }

  function render() {
    const activeHref = currentFile();
    let nav = '';
    for (let i = 0; i < NAV.length; i++) {
      const item = NAV[i];
      if (item.type === 'item') nav += renderItem(item, activeHref);
      else nav += renderGroup(item, activeHref);
    }
    return renderBrand() + '<nav class="sb-nav">' + nav + '</nav>' + renderFooter();
  }

  /* ───── CSS — injected once ───── */
  const CSS = [
    '#sidebar{position:fixed;top:0;left:0;bottom:0;z-index:30;width:256px;background:linear-gradient(180deg,#fff 0%,#fff 60%,#F8FAFC 100%);border-right:1px solid #E2E8F0;display:flex;flex-direction:column;font-family:Kanit,sans-serif;color:#0B1430;transition:transform .2s ease,width .2s ease}',
    '@media (max-width:1023px){#sidebar{transform:translateX(-100%)}#sidebar.sb-mobile-open{transform:translateX(0)}}',
    '#sidebar-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:25;display:none}',
    '#sidebar-overlay.sb-mobile-open{display:block}',
    '.sb-brand{height:64px;display:flex;align-items:center;gap:10px;padding:0 16px;border-bottom:1px solid #E2E8F0;background:linear-gradient(135deg,rgba(45,86,210,0.04),rgba(95,203,249,0.04))}',
    '.sb-logo{height:32px;width:auto;border-radius:4px;flex-shrink:0}',
    '.sb-brand-text{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:rgba(30,41,59,.55);border-left:1px solid #E2E8F0;padding-left:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.sb-nav{flex:1;overflow-y:auto;padding:12px 8px;display:flex;flex-direction:column;gap:2px}',
    '.sb-nav::-webkit-scrollbar{width:6px}',
    '.sb-nav::-webkit-scrollbar-thumb{background:rgba(0,0,0,.06);border-radius:10px}',
    '.sb-item{display:flex;align-items:center;gap:12px;height:36px;border-radius:8px;padding:0 10px;text-decoration:none;color:rgba(30,41,59,.55);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;transition:all .15s}',
    '.sb-item:hover{background:#F1F5F9}',
    '.sb-icon{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;flex-shrink:0;transition:all .15s}',
    '.sb-label{flex:1;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.sb-group{margin-top:6px}',
    '.sb-grp-btn{width:100%;display:flex;align-items:center;gap:12px;height:36px;border-radius:8px;padding:0 10px;background:transparent;border:0;cursor:pointer;font-family:inherit;color:rgba(30,41,59,.55);transition:all .15s}',
    '.sb-grp-btn:hover{background:#F1F5F9}',
    '.sb-grp-label{flex:1;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em}',
    '.sb-chev{display:inline-flex;color:rgba(30,41,59,.35);transition:transform .2s}',
    '.sb-group.open .sb-chev{transform:rotate(180deg)}',
    '.sb-grp-children{display:none;margin-top:2px;padding-left:8px;margin-left:8px;border-left:2px solid #E2E8F0}',
    '.sb-group.open .sb-grp-children{display:flex;flex-direction:column;gap:2px}',
    '.sb-grp-ma.open .sb-grp-btn{background:rgba(124,58,237,.10);color:#7C3AED}',
    '.sb-grp-ma.open .sb-grp-icon{background:rgba(124,58,237,.20)}',
    '.sb-grp-ma.open .sb-grp-children{border-color:rgba(124,58,237,.20)}',
    '.sb-grp-rpt.open .sb-grp-btn{background:rgba(14,165,233,.10);color:#0EA5E9}',
    '.sb-grp-rpt.open .sb-grp-icon{background:rgba(14,165,233,.20)}',
    '.sb-grp-rpt.open .sb-grp-children{border-color:rgba(14,165,233,.20)}',
    '.sb-grp-stg.open .sb-grp-btn{background:rgba(239,68,68,.10);color:#EF4444}',
    '.sb-grp-stg.open .sb-grp-icon{background:rgba(239,68,68,.20)}',
    '.sb-grp-stg.open .sb-grp-children{border-color:rgba(239,68,68,.20)}',
    '.sb-sub{position:relative;display:flex;align-items:center;gap:8px;height:34px;border-radius:6px;padding:0 10px 0 14px;text-decoration:none;color:rgba(30,41,59,.55);font-size:12.5px;transition:all .15s}',
    '.sb-sub:hover{color:#0B1430;background:rgba(71,144,255,.06)}',
    '.sb-sub.active{color:#2D56D2;font-weight:600;background:linear-gradient(90deg,rgba(71,144,255,.10),rgba(71,144,255,0))}',
    '.sb-sub.active::before{content:"";position:absolute;left:-2px;top:6px;bottom:6px;width:3px;border-radius:2px;background:#2D56D2}',
    '.sb-sub-label{flex:1;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.sb-badge{font-size:10px;color:#fff;border-radius:9999px;padding:1px 6px;min-width:18px;text-align:center;font-weight:500}',
    '.sb-footer{padding:12px;border-top:1px solid #E2E8F0}',
    '.sb-user{display:flex;align-items:center;gap:10px;padding:8px;border-radius:12px;background:linear-gradient(135deg,rgba(45,86,210,0.05),rgba(95,203,249,0.04));border:1px solid rgba(45,86,210,0.08)}',
    '.sb-avatar{width:36px;height:36px;border-radius:50%;background:#4790FF;color:#fff;font-weight:600;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0}',
    '.sb-user-info{flex:1;min-width:0;line-height:1.2}',
    '.sb-user-name{font-size:13px;font-weight:600;color:#0B1430;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.sb-user-role{font-size:10.5px;color:rgba(30,41,59,.55);display:flex;align-items:center;gap:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.sb-dot-green{width:4px;height:4px;border-radius:50%;background:#10B981;flex-shrink:0}',
    '.sb-logout{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:rgba(30,41,59,.5);transition:all .15s;flex-shrink:0}',
    '.sb-logout:hover{color:#DC2626;background:#FEF2F2}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('pb-sidebar-css')) return;
    const s = document.createElement('style');
    s.id = 'pb-sidebar-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function ensureShell() {
    let aside = document.getElementById('sidebar');
    if (!aside) {
      aside = document.createElement('aside');
      aside.id = 'sidebar';
      document.body.insertBefore(aside, document.body.firstChild);
    } else {
      /* Clear any inline classes/styles from old static markup */
      aside.removeAttribute('class');
      aside.removeAttribute('style');
    }
    if (!document.getElementById('sidebar-overlay')) {
      const ov = document.createElement('div');
      ov.id = 'sidebar-overlay';
      ov.onclick = _PBToggleMobile;
      document.body.insertBefore(ov, aside.nextSibling);
    }
    return aside;
  }

  /* ───── Global interaction functions ─────
     NOTE: defined at boot() time too — inline page scripts use
     `function collapseSidebar(){}` declarations that overwrite globals,
     so we must reassign after DOMContentLoaded. */
  function _PBToggleGroup(id) {
    const el = document.querySelector('.sb-group[data-group="' + id + '"]');
    if (el) el.classList.toggle('open');
  }
  function _PBToggleMobile() {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('sidebar-overlay');
    if (sb) sb.classList.toggle('sb-mobile-open');
    if (ov) ov.classList.toggle('sb-mobile-open');
  }
  function _PBCollapse() {
    if (window.innerWidth < 1024) { window.toggleMobile(); return; }
    /* Desktop collapse: hide labels + shrink width */
    const sb = document.getElementById('sidebar');
    const main = document.querySelector('main');
    const collapsed = sb.classList.toggle('sb-collapsed');
    if (collapsed) {
      sb.style.width = '68px';
      if (main) { main.classList.remove('lg:ml-64'); main.classList.add('lg:ml-[68px]'); }
    } else {
      sb.style.width = '256px';
      if (main) { main.classList.remove('lg:ml-[68px]'); main.classList.add('lg:ml-64'); }
    }
    /* Hide labels when collapsed via injected rule */
    if (collapsed && !document.getElementById('pb-sb-collapsed-css')) {
      const c = document.createElement('style');
      c.id = 'pb-sb-collapsed-css';
      c.textContent = '#sidebar.sb-collapsed .sb-label,#sidebar.sb-collapsed .sb-brand-text,#sidebar.sb-collapsed .sb-group,#sidebar.sb-collapsed .sb-user-info,#sidebar.sb-collapsed .sb-logout{display:none}#sidebar.sb-collapsed .sb-brand{justify-content:center;padding:0}#sidebar.sb-collapsed .sb-user{justify-content:center}';
      document.head.appendChild(c);
    }
  }

  /* Bind globals — done at both script-load AND boot() time so they win
     against inline page scripts that overwrite `function collapseSidebar()`. */
  function bindGlobals() {
    window.PBToggleGroup = _PBToggleGroup;
    window.toggleMenu    = _PBToggleGroup;
    window.toggleMobile  = _PBToggleMobile;
    window.collapseSidebar = _PBCollapse;
  }
  bindGlobals();

  function boot() {
    injectCSS();
    const aside = ensureShell();
    aside.innerHTML = render();
    /* Re-bind AFTER inline page scripts (which use `function …(){}` decls)
       have run during body parse — otherwise they overwrite our globals. */
    bindGlobals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
