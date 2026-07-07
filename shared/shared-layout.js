/* ============================================================
 * shared-layout.js — Plan-B CRM shared chrome bundle
 *
 * Bundles all JSX from ui_kits/crm/* (icons, components,
 * Sidebar, Topbar, AiPanel) as a string and transpiles via
 * Babel at runtime. Pages then inline their screen JSX with
 * <script type="text/babel">…</script> blocks.
 *
 * USAGE (in HTML <head>, in this order):
 *   <script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
 *   <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
 *   <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
 *   <script src="shared/shared-layout.js"></script>
 *
 * Then in <body>:
 *   <div id="root"></div>
 *   <script type="text/babel" data-presets="react">
 *     // your screen code (JSX) — uses Sidebar, Topbar, AiPanel, Icon, Button, ...
 *   </script>
 *
 * Babel auto-processes inline text/babel scripts on DOMContentLoaded,
 * AFTER this file has already eval'd the chrome (which happens synchronously
 * on script load).
 * ============================================================ */

(function () {
  if (typeof Babel === 'undefined') {
    console.error('[shared-layout.js] Babel standalone must be loaded before this file.');
    return;
  }
  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
    console.error('[shared-layout.js] React + ReactDOM must be loaded before this file.');
    return;
  }

  /* ──────────────────────────────────────────────────────────
   * Chrome JSX bundle as a single string.
   * Outer string uses BACKTICKS — any inner backtick or ${ in
   * the JSX is escaped as \` and \${ respectively.
   * ────────────────────────────────────────────────────────── */
  const CHROME_JSX = `
/* =================== icons.jsx =================== */
const ICON_PATHS = {
  'squares-2x2': 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z',
  'archive-box': 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z',
  'banknotes': 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z',
  'wrench': 'M11.42 15.17l-5.1-5.1a2.25 2.25 0 010-3.182l.71-.71a2.25 2.25 0 013.18 0l2.8 2.8 2.8-2.8a2.25 2.25 0 013.18 0l.71.71a2.25 2.25 0 010 3.182l-5.1 5.1a2.25 2.25 0 01-3.18 0z',
  'clipboard': 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z',
  'search': 'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
  'bell': 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0',
  'sparkles': 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z',
  'bars': 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5',
  'plus': 'M12 4.5v15m7.5-7.5h-15',
  'download': 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3',
  'upload':   'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 7.5L12 3m0 0l4.5 4.5M12 3v13.5',
  'x': 'M6 18L18 6M6 6l12 12',
  'refresh': 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182',
  'chev-down': 'M19.5 8.25l-7.5 7.5-7.5-7.5',
  'chev-right': 'M8.25 4.5l7.5 7.5-7.5 7.5',
  'chev-left': 'M15.75 19.5L8.25 12l7.5-7.5',
  'trending-up': 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
  'trending-down': 'M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181',
  'check': 'M4.5 12.75l6 6 9-13.5',
  'check-circle': 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'warning': 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
  'bolt': 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  'chart-bar': 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
  'photo': 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z',
  'envelope': 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
  'lock': 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
  'eye': 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  'user': 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0',
  'logout': 'M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9',
  'clock': 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  'send': 'm3 11 18-8-8 18-2-8-8-2Z',
  'users': 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H5.228m9.772 0a9.337 9.337 0 01-4.121.952 9.38 9.38 0 01-2.625-.372m11.118-.39a9 9 0 10-12.998 0',
  'pencil': 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125',
  'trash': 'm14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0',
  'cog': 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.491l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  'eye-slash': 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88',
};
function Icon({ name, size = 18, className = '', style = {} }) {
  const d = ICON_PATHS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true"><path d={d} /></svg>
  );
}
window.Icon = Icon;
window.ICON_PATHS = ICON_PATHS;

/* =================== components.jsx =================== */
const STATUS_COLORS = {
  'Draft':         { bg:'#F8FAFC', border:'#E2E8F0', text:'#475569', dot:'#94A3B8', hex:'#94A3B8' },
  'Revise':        { bg:'#FFFBEB', border:'#FDE68A', text:'#B45309', dot:'#F59E0B', hex:'#F59E0B' },
  'Assign':        { bg:'#FFF7ED', border:'#FED7AA', text:'#C2410C', dot:'#F97316', hex:'#F97316' },
  'Verify':        { bg:'#F5F3FF', border:'#DDD6FE', text:'#6D28D9', dot:'#8B5CF6', hex:'#8B5CF6' },
  'On Process':    { bg:'#EFF6FF', border:'#BFDBFE', text:'#1D4ED8', dot:'#3B82F6', hex:'#3B82F6' },
  'Review':        { bg:'#ECFEFF', border:'#A5F3FC', text:'#0E7490', dot:'#06B6D4', hex:'#06B6D4' },
  'Final Approve': { bg:'#ECFDF5', border:'#A7F3D0', text:'#047857', dot:'#10B981', hex:'#10B981' },
  'Final Render':  { bg:'#EEF2FF', border:'#C7D2FE', text:'#4338CA', dot:'#6366F1', hex:'#6366F1' },
  'Done':          { bg:'#ECFDF5', border:'#A7F3D0', text:'#047857', dot:'#10B981', hex:'#10B981' },
  'To Do':         { bg:'#FFFBEB', border:'#FDE68A', text:'#B45309', dot:'#F59E0B', hex:'#F59E0B' },
  'Unassigned':    { bg:'#F8FAFC', border:'#E2E8F0', text:'#64748B', dot:'#94A3B8', hex:'#94A3B8' },
};
function StatusBadge({ status }) {
  const sc = STATUS_COLORS[status] || STATUS_COLORS['Draft'];
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-medium border"
      style={{ background: sc.bg, color: sc.text, borderColor: sc.border, fontSize: 11 }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.dot }} />{status}
    </span>
  );
}
const AV_COLORS = ['#2D56D2','#059669','#D97706','#DC2626','#7C3AED','#0891B2'];
function avColor(name){let h=0;for(let i=0;i<name.length;i++)h=name.charCodeAt(i)+((h<<5)-h);return AV_COLORS[Math.abs(h)%AV_COLORS.length];}
function avInitials(name){return name.split(' ').map(w=>w[0]||'').join('').slice(0,2).toUpperCase();}
function Avatar({ name='?', size=24, showName=false }){
  const bg = avColor(name); const init = avInitials(name); const fontSize = Math.round(size*0.4);
  const av = <span className="rounded-full inline-flex items-center justify-center text-white font-semibold shrink-0" style={{ background:bg, width:size, height:size, fontSize }}>{init}</span>;
  if (!showName) return av;
  return <span className="inline-flex items-center gap-2 text-[12px]">{av}<span>{name}</span></span>;
}
function Button({ children, variant='primary', size='md', icon=null, iconRight=null, className='', as='button', href=null, onClick, ...rest }){
  const sizes = { sm:'h-7 px-2.5 text-[12px] rounded-md gap-1.5', md:'h-9 px-4 text-[13px] rounded-lg gap-2', lg:'h-11 px-5 text-[14px] rounded-xl gap-2' };
  const variants = {
    primary:   'bg-[#2D56D2] text-white hover:bg-[#213268] shadow-sm',
    secondary: 'bg-white text-[#0B1430] border border-[#CBD5E1] hover:bg-[#F8FAFC]',
    outline:   'bg-white text-[#2D56D2] border border-[#2D56D2]/30 hover:bg-[#EBF5FF]',
    ghost:     'bg-transparent text-[#0B1430]/80 hover:bg-[#F1F5F9]',
    dark:      'bg-[#0B1430] text-white hover:bg-[#162040]',
    gradient:  'text-white shadow-sm',
  };
  const styleProp = variant==='gradient' ? { background:'linear-gradient(135deg,#2D56D2,#5FCBF9)' } : {};
  const cls = \`inline-flex items-center justify-center font-semibold transition-colors duration-150 \${sizes[size]} \${variants[variant]} \${className} disabled:opacity-40\`;
  const content = (
    <React.Fragment>
      {icon && <Icon name={icon} size={size==='sm'?12:size==='lg'?16:14} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size==='sm'?12:size==='lg'?16:14} />}
    </React.Fragment>
  );
  if (as==='a' || href) return <a href={href} className={cls} style={styleProp} onClick={onClick} {...rest}>{content}</a>;
  return <button type="button" className={cls} style={styleProp} onClick={onClick} {...rest}>{content}</button>;
}
function IconButton({ name, size=18, label='', onClick, badge=false, className='' }){
  return (
    <button type="button" title={label} onClick={onClick}
      className={\`relative w-9 h-9 rounded-md flex items-center justify-center text-[#1E293B] hover:bg-[#F1F5F9] transition-colors \${className}\`}>
      <Icon name={name} size={size} />
      {badge && <span className="absolute top-2 right-2 w-2 h-2 bg-[#F43F5E] rounded-full" />}
    </button>
  );
}
function Card({ children, className='', hoverable=false, padding='md', style={} }){
  const pad = { none:'', sm:'p-3', md:'p-5', lg:'p-6' }[padding];
  const hover = hoverable ? 'transition-all duration-200 hover:-translate-y-0.5' : '';
  return (
    <div className={\`bg-white border border-[#E2E8F0] rounded-xl \${pad} \${hover} \${className}\`}
      style={{ boxShadow:'0 1px 3px rgba(11,20,48,.06), 0 1px 2px rgba(11,20,48,.04)', ...style }}>
      {children}
    </div>
  );
}
function Field({ label, children, hint, className='' }){
  return (
    <div className={\`flex flex-col gap-1.5 \${className}\`}>
      {label && <label className="text-[11px] font-semibold text-[#1E293B]/70">{label}</label>}
      {children}
      {hint && <span className="text-[11px] text-[#1E293B]/45">{hint}</span>}
    </div>
  );
}
function Input({ icon=null, className='', ...rest }){
  return (
    <div className={\`relative \${className}\`}>
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1E293B]/35"><Icon name={icon} size={16} /></span>}
      <input {...rest}
        className={\`w-full h-9 \${icon?'pl-10':'pl-3'} pr-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[13px] outline-none transition focus:border-[#4790FF] focus:bg-white focus:shadow-[0_0_0_3px_rgba(71,144,255,0.15)]\`} />
    </div>
  );
}
function Select({ options=[], className='', ...rest }){
  return (
    <select {...rest}
      className={\`h-9 pl-3 pr-7 bg-white border border-[#E2E8F0] rounded-lg text-[13px] outline-none focus:border-[#4790FF] focus:shadow-[0_0_0_3px_rgba(71,144,255,0.15)] \${className}\`}
      style={{ appearance:'none',
        backgroundImage: \`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="%236b7280" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>')\`,
        backgroundRepeat:'no-repeat', backgroundPosition:'right 8px center' }}>
      {options.map((o,i)=> typeof o==='string'
        ? <option key={i} value={o}>{o}</option>
        : <option key={i} value={o.value}>{o.label}</option>)}
    </select>
  );
}
function MediaChip({ children }){ return <span className="text-[11px] px-2 py-0.5 rounded bg-[#F1F5F9] font-medium">{children}</span>; }
function CountPill({ children, color='#2D56D2' }){
  return <span className="inline-flex items-center justify-center text-[10px] font-semibold text-white rounded-full px-1.5" style={{ background:color, minWidth:18, height:16 }}>{children}</span>;
}
function BrandMark({ size=36 }){
  const radius = size*0.22;
  return (
    <div className="flex items-center justify-center font-bold text-white shrink-0"
      style={{ width:size, height:size, borderRadius:radius, background:'linear-gradient(135deg,#2D56D2,#5FCBF9)', fontSize:Math.round(size*0.36), fontFamily:'Kanit, sans-serif' }}>
      PB
    </div>
  );
}
window.STATUS_COLORS = STATUS_COLORS;
Object.assign(window, { StatusBadge, Avatar, avColor, avInitials, Button, IconButton, Card, Field, Input, Select, MediaChip, CountPill, BrandMark });

/* =================== Sidebar.jsx =================== */
const SIDEBAR_NAV = [
  { type:'item',  id:'dashboard', icon:'squares-2x2', label:'Dashboard', href:'dashboard.html', color:'#2D56D2' },
  { type:'item',  id:'inventory', icon:'archive-box', label:'Inventory', href:'inventory.html', color:'#06B6D4' },
  { type:'item',  id:'sale',      icon:'banknotes',   label:'Sale',      href:'sale.html',      color:'#10B981' },
  { type:'group', id:'ma', label:'Media Approval', icon:'check-circle', color:'#7C3AED', children:[
    { id:'ma-dashboard', label:'Dashboard',          href:'ma-dashboard.html' },
    { id:'tickets',      label:'Media Ticket',       href:'job-list.html',         badge:{count:12, color:'#2D56D2'} },
    { id:'assign',       label:'Assign Ticket',      href:'assign-job.html',       badge:{count:5,  color:'#F59E0B'} },
    { id:'production-r', label:'Production & Review',href:'receive-job.html' },
  ] },
  { type:'item',  id:'production', icon:'wrench',    label:'Production', href:'production.html', color:'#F59E0B' },
  { type:'item',  id:'claim',      icon:'clipboard', label:'Claim',      href:'claim.html',      color:'#EC4899' },
  { type:'group', id:'rpt', label:'Report', icon:'chart-bar', color:'#0EA5E9', children:[
    { id:'kpi',     label:'KPI Dashboard',  href:'kpi-dashboard.html' },
    { id:'airtime', label:'Export Airtime', href:'export-airtime.html' },
    { id:'monthly', label:'Monthly Report', href:'report-monthly.html' },
    { id:'audit',   label:'Audit Log',      href:'report-audit.html' },
  ] },
  { type:'group', id:'stg', label:'Setting', icon:'cog', color:'#EF4444', children:[
    { id:'users',  label:'User Management',       href:'settings-user.html' },
    { id:'groups', label:'User Group Management', href:'settings-usergroup.html' },
    { id:'email',  label:'Email Setup',           href:'settings-email.html' },
    { id:'master', label:'Master Data',           href:'settings-master.html' },
  ] },
];

function SidebarNavItem({ icon, label, active, collapsed, href, color='#2D56D2' }){
  return (
    <a href={href}
      className={\`group relative flex items-center gap-3 h-10 rounded-lg px-2.5 cursor-pointer transition-all duration-150 \${active?'font-semibold':'text-[#1E293B]/65 hover:text-[#0B1430]'}\`}
      style={active
        ? { background: \`linear-gradient(90deg, \${color}18, \${color}00 90%)\`, color: color }
        : {}}>
      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-sm" style={{ background: color, boxShadow:\`0 0 8px \${color}66\` }} />}
      <span className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors"
        style={active
          ? { background: color + '22', color: color }
          : { background: 'transparent', color: 'rgba(30,41,59,0.6)' }}>
        <Icon name={icon} size={16} />
      </span>
      {!collapsed && <span className="flex-1 truncate text-[13px]">{label}</span>}
    </a>
  );
}
function SidebarSubItem({ label, badge, active, href, groupColor='#2D56D2' }){
  return (
    <a href={href}
      className={\`relative flex items-center gap-2 pl-10 h-9 rounded-lg pr-3 cursor-pointer text-[12.5px] transition-all duration-150 \${active?'font-semibold':'text-[#1E293B]/60 hover:text-[#0B1430] hover:bg-[#F1F5F9]'}\`}
      style={active ? { background: \`linear-gradient(90deg, \${groupColor}15, \${groupColor}00 95%)\`, color: groupColor } : {}}>
      {active && <span className="absolute left-[14px] top-2 bottom-2 w-[3px] rounded-sm" style={{ background: groupColor }} />}
      <span className="flex-1 truncate">{label}</span>
      {badge && <CountPill color={badge.color}>{badge.count}</CountPill>}
    </a>
  );
}
function SidebarGroup({ id, label, icon, color='#2D56D2', children, collapsed, active, openSet, toggleOpen, route }){
  const isOpen = openSet.has(id) || active;
  if (collapsed) return null;
  return (
    <div className="pt-2">
      <button onClick={() => toggleOpen(id)}
        className={\`group w-full flex items-center gap-3 h-9 rounded-lg px-2.5 cursor-pointer transition-colors \${isOpen?'':'hover:bg-[#F1F5F9]'}\`}
        style={isOpen ? { background: color + '0F' } : {}}>
        <span className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors"
          style={isOpen ? { background: color + '20', color: color } : { color: 'rgba(30,41,59,0.55)' }}>
          <Icon name={icon} size={16} />
        </span>
        <span className="flex-1 text-left text-[11px] uppercase tracking-wider font-bold"
          style={{ color: isOpen ? color : 'rgba(30,41,59,0.55)' }}>{label}</span>
        <Icon name="chev-down" size={12}
          className={\`transition-transform duration-200 \${isOpen?'rotate-180':''}\`}
          style={{ color: isOpen ? color : 'rgba(30,41,59,0.35)' }} />
      </button>
      {isOpen && (
        <div className="mt-0.5 mb-1 ml-2 pl-1 space-y-0.5 border-l-2"
          style={{ borderColor: color + '20' }}>
          {children.map(child => (
            <SidebarSubItem key={child.id} label={child.label} badge={child.badge} href={child.href}
              active={route===child.id} groupColor={color} />
          ))}
        </div>
      )}
    </div>
  );
}
function Sidebar({ route, collapsed, onLogout }){
  const [openGroups, setOpenGroups] = React.useState(() => {
    const initial = new Set();
    SIDEBAR_NAV.forEach(g => { if (g.type==='group' && g.children.some(c => c.id===route)) initial.add(g.id); });
    return initial;
  });
  const toggleOpen = (id) => setOpenGroups(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  return (
    <aside className="flex flex-col fixed top-0 bottom-0 left-0 z-30 border-r border-[#E2E8F0] transition-[width] duration-200"
      style={{
        width: collapsed?68:256,
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #F8FAFC 100%)',
      }}>
      <div className={\`h-16 flex items-center gap-2.5 border-b border-[#E2E8F0] relative \${collapsed?'justify-center px-0':'px-4'}\`}
        style={{ background: 'linear-gradient(135deg, rgba(45,86,210,0.04), rgba(95,203,249,0.04))' }}>
        {collapsed
          ? <BrandMark size={36} />
          : <div className="flex items-center gap-2 min-w-0">
              <img src="logo.jpg" alt="Plan-B Media" className="h-8 w-auto rounded shrink-0" />
              <span className="text-[11px] font-semibold tracking-wide uppercase border-l border-[#E2E8F0] pl-2 truncate" style={{ color:'rgba(30,41,59,0.55)' }}>Media Flow System</span>
            </div>}
        <span className="absolute left-0 right-0 bottom-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(45,86,210,0.25), transparent)' }} />
      </div>
      <nav className="flex-1 py-3 px-2 overflow-y-auto text-sm space-y-0.5">
        {SIDEBAR_NAV.map(item => {
          if (item.type==='item') {
            return <SidebarNavItem key={item.id} icon={item.icon} label={item.label} href={item.href}
              color={item.color} active={route===item.id} collapsed={collapsed} />;
          }
          return <SidebarGroup key={item.id} id={item.id} label={item.label} icon={item.icon} color={item.color}
            children={item.children} collapsed={collapsed}
            active={item.children.some(c => c.id===route)}
            openSet={openGroups} toggleOpen={toggleOpen} route={route} />;
        })}
      </nav>
      <div className="p-3 border-t border-[#E2E8F0]">
        <div className={\`flex items-center rounded-xl transition-colors \${collapsed?'justify-center p-1':'gap-2.5 p-2 hover:bg-white'}\`}
          style={collapsed ? {} : { background: 'linear-gradient(135deg, rgba(45,86,210,0.05), rgba(95,203,249,0.04))', border: '1px solid rgba(45,86,210,0.08)' }}>
          <Avatar name="ravewan k." size={collapsed?32:34} />
          {!collapsed && (
            <React.Fragment>
              <div className="flex-1 min-w-0 leading-tight">
                <div className="text-[13px] font-semibold text-[#0B1430] truncate">ravewan k.</div>
                <div className="text-[10.5px] truncate flex items-center gap-1" style={{ color:'rgba(30,41,59,0.55)' }}>
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />Admin · Plan-B
                </div>
              </div>
              <a href="login.html" onClick={onLogout}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#1E293B]/50 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="ออกจากระบบ">
                <Icon name="logout" size={15} />
              </a>
            </React.Fragment>
          )}
        </div>
      </div>
    </aside>
  );
}
window.Sidebar = Sidebar;
window.SIDEBAR_NAV = SIDEBAR_NAV;

/* =================== PBSidebar — unified wrapper =================== */
/* Self-contained Sidebar: manages collapsed state, mobile drawer,
   syncs <main> margin, and overrides window.collapseSidebar.
   Use this in any page (React-based or static) for a single source.
   Props: route (string) — active NAV id (e.g. "dashboard"). */
function PBSidebar({ route }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    window.collapseSidebar = () => {
      if (window.innerWidth < 1024) setMobileOpen(o => !o);
      else setCollapsed(c => !c);
    };
    window.toggleMobile = () => setMobileOpen(o => !o);
  }, []);

  React.useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    if (collapsed) {
      main.classList.remove('lg:ml-64');
      main.classList.add('lg:ml-[68px]');
    } else {
      main.classList.remove('lg:ml-[68px]');
      main.classList.add('lg:ml-64');
    }
  }, [collapsed]);

  const wrapperStyle = {
    transform: (typeof window !== 'undefined' && window.innerWidth < 1024 && !mobileOpen) ? 'translateX(-100%)' : 'translateX(0)',
    transition: 'transform 200ms ease'
  };

  return (
    <React.Fragment>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)} />
      )}
      <div style={wrapperStyle} className="lg:!translate-x-0">
        <Sidebar route={route} collapsed={collapsed} onLogout={() => { location.href = 'login.html'; }} />
      </div>
    </React.Fragment>
  );
}
window.PBSidebar = PBSidebar;

/* =================== Topbar.jsx =================== */
function Topbar({ crumbs=[], onToggleSidebar, onToggleAi, aiOpen }){
  return (
    <header className="h-16 shrink-0 sticky top-0 z-20 flex items-center gap-4 px-4 sm:px-6"
      style={{ background:'rgba(255,255,255,0.9)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', borderBottom:'1px solid #E2E8F0' }}>
      <IconButton name="bars" label="Menu" onClick={onToggleSidebar} />
      <div className="flex items-center gap-1.5 text-[13px] text-[#1E293B]/60">
        {crumbs.map((c,i) => {
          const isLast = i === crumbs.length - 1;
          const label = typeof c === 'string' ? c : c.label;
          const href = typeof c === 'string' ? null : c.href;
          return (
            <React.Fragment key={i}>
              {i>0 && <Icon name="chev-right" size={12} className="opacity-30" />}
              {href && !isLast
                ? <a href={href} className="hover:text-[#2D56D2] hover:underline transition-colors">{label}</a>
                : <span className={isLast?'font-medium text-[#0B1430]':''}>{label}</span>}
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex-1" />
      <div className="relative hidden sm:block w-[320px] max-w-[35vw]">
        <Input icon="search" placeholder="ค้นหา..." />
      </div>
      <Button variant={aiOpen?'dark':'secondary'} icon="sparkles" onClick={onToggleAi}>Ask AI</Button>
    </header>
  );
}
window.Topbar = Topbar;

/* =================== AiPanel.jsx =================== */
const AI_REPLIES_DEFAULT = [
  "Based on current data, BTS corridor occupancy is trending at 84% — above the 78% network average.",
  "This week we have 3 open claims: #1284 (high), #1282 (critical), and #1283 (med).",
  "Your top 3 clients YTD: AIS Thailand, TrueMove H, and Toyota Motor.",
];
const SUGGESTIONS_DEFAULT = [
  "Forecast May occupancy for BTS inventory",
  "Summarize this week's claims by severity",
  "Who are my top 3 clients and where are they underspending?",
  "Draft a proposal: AIS wants 30-day coverage in Bangkok + Chiang Mai",
];
function AiBubble({ from, text }){
  if (from==='user') return (
    <div className="text-right">
      <div className="inline-block max-w-[90%] text-[13px] leading-relaxed rounded-xl px-3.5 py-2.5 bg-[#0B1430] text-white text-left">{text}</div>
    </div>
  );
  return (
    <div>
      <div className="text-[10px] font-medium uppercase tracking-wide mb-1 text-[#1E293B]/50">Copilot</div>
      <div className="inline-block max-w-[90%] text-[13px] leading-relaxed rounded-xl px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0]">{text}</div>
    </div>
  );
}
function AiPanel({ open, onClose }){
  const [messages, setMessages] = React.useState([{ from:'bot', text:'Hi — สอบถามเรื่องระบบ Plan-B CRM ได้เลยครับ' }]);
  const [thinking, setThinking] = React.useState(false);
  const [input, setInput] = React.useState('');
  const replyIdx = React.useRef(0);
  const scrollRef = React.useRef(null);
  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, thinking]);
  const replies = window.AI_REPLIES || AI_REPLIES_DEFAULT;
  const suggestions = window.SUGGESTIONS || SUGGESTIONS_DEFAULT;
  const send = (text) => {
    const msg = (text||input).trim(); if (!msg) return;
    setInput(''); setMessages(m=>[...m,{from:'user',text:msg}]); setThinking(true);
    setTimeout(() => { const reply = replies[replyIdx.current % replies.length]; replyIdx.current++; setThinking(false); setMessages(m=>[...m,{from:'bot',text:reply}]); }, 1200);
  };
  return (
    <div className={\`fixed right-0 top-0 bottom-0 w-[420px] bg-white border-l border-[#E2E8F0] z-40 flex flex-col transition-transform duration-200 \${open?'':'translate-x-full'}\`}
      style={{ boxShadow:'-8px 0 30px rgba(11,20,48,0.10)' }}>
      <div className="h-16 px-5 border-b border-[#E2E8F0] flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background:'linear-gradient(135deg,#2D56D2,#5FCBF9)' }}>
          <Icon name="sparkles" size={16} />
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-semibold">Plan-B Copilot</div>
          <div className="text-[11px] flex items-center gap-1 text-[#1E293B]/60">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />Connected to live CRM data
          </div>
        </div>
        <IconButton name="x" size={16} onClick={onClose} />
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.map((m,i)=> <AiBubble key={i} from={m.from} text={m.text} />)}
        {thinking && (
          <div className="flex items-center gap-2 text-[12px] text-[#1E293B]/60">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-[#4790FF] rounded-full" style={{ animation:'pbDot 1.4s ease-in-out infinite' }} />
              <span className="w-1.5 h-1.5 bg-[#4790FF] rounded-full" style={{ animation:'pbDot 1.4s ease-in-out .2s infinite' }} />
              <span className="w-1.5 h-1.5 bg-[#4790FF] rounded-full" style={{ animation:'pbDot 1.4s ease-in-out .4s infinite' }} />
            </div>analyzing CRM data…
          </div>
        )}
      </div>
      {messages.length<=1 && (
        <div className="px-5 pb-2 space-y-2">
          <div className="text-[10px] uppercase tracking-wide font-semibold text-[#1E293B]/50">Try asking</div>
          {suggestions.map((s,i) => (
            <button key={i} onClick={()=>send(s)}
              className="w-full text-left text-[12px] px-3 py-2 border border-[#E2E8F0] rounded-lg hover:border-[#2D56D2] hover:bg-[#EBF5FF]/30 transition-colors">{s}</button>
          ))}
        </div>
      )}
      <div className="p-4 border-t border-[#E2E8F0]">
        <div className="rounded-xl bg-white border border-[#E2E8F0] focus-within:border-[#2D56D2] transition" style={{ boxShadow:'0 0 0 1px rgba(45,86,210,0.1)' }}>
          <div className="flex items-end gap-2 p-2">
            <input value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter'){ e.preventDefault(); send(); } }}
              type="text" placeholder="พิมพ์คำถาม..." className="flex-1 text-[13px] bg-transparent outline-none px-2 py-1.5" />
            <button onClick={()=>send()} className="w-8 h-8 rounded-md bg-[#0B1430] hover:bg-[#162040] flex items-center justify-center text-white shrink-0">
              <Icon name="send" size={14} />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-center mt-2 text-[#1E293B]/40">Plan-B Copilot — may hallucinate, verify critical actions</p>
      </div>
    </div>
  );
}
window.AiPanel = AiPanel;
`;

  /* ──────────────────────────────────────────────────────────
   * Compile + execute chrome bundle immediately (synchronously),
   * so that page screen scripts can reference Sidebar/Topbar/etc.
   * ────────────────────────────────────────────────────────── */
  try {
    const compiled = Babel.transform(CHROME_JSX, { presets: ['react'] }).code;
    // Use indirect eval so it runs in global scope and assigns to window.*
    (0, eval)(compiled);
    console.log('[shared-layout.js] Chrome bundle loaded — Sidebar, Topbar, AiPanel, Icon, Button, etc. ready.');
  } catch (err) {
    console.error('[shared-layout.js] Failed to compile chrome bundle:', err);
  }

  /* ──────────────────────────────────────────────────────────
   * Add the pulse animation keyframes used by AiPanel + general UI
   * ────────────────────────────────────────────────────────── */
  const styleEl = document.createElement('style');
  styleEl.textContent = '@keyframes pbDot{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}';
  document.head.appendChild(styleEl);
})();
