/**
 * Plan-B CRM — Shared Layout Loader
 *
 * Usage: Add to any page's <head>:
 *   <script src="shared/layout-loader.js"></script>
 *
 * And in the page's <body>, add data attributes:
 *   <body data-active-menu="ma-joblist" data-page-title="Media Ticket">
 *
 * The loader will:
 * 1. Inject shared/head.html into <head>
 * 2. Inject shared/sidebar.html and set active menu
 * 3. Inject shared/topbar.html with page title
 * 4. Inject shared/ai-panel.html
 * 5. Inject shared/scripts.html
 */

(function() {
  // Helper: fetch and inject HTML
  function loadHTML(url, targetSelector, position, callback) {
    fetch(url)
      .then(function(r) { return r.text(); })
      .then(function(html) {
        var target = document.querySelector(targetSelector);
        if (!target) return;
        if (position === 'replace') {
          target.innerHTML = html;
        } else if (position === 'prepend') {
          target.insertAdjacentHTML('afterbegin', html);
        } else if (position === 'append') {
          target.insertAdjacentHTML('beforeend', html);
        } else if (position === 'before') {
          target.insertAdjacentHTML('beforebegin', html);
        } else if (position === 'after') {
          target.insertAdjacentHTML('afterend', html);
        }
        if (callback) callback();
      })
      .catch(function(e) { console.warn('Layout loader: failed to load ' + url, e); });
  }

  // Set active menu based on data attribute
  function setActiveMenu(menuId) {
    if (!menuId) return;
    // Find the link with matching menu ID or href
    var links = document.querySelectorAll('.sidebar-nav, .sidebar-sub');
    links.forEach(function(link) {
      var href = link.getAttribute('href') || '';
      // Match by data-page attribute or by checking if the current page matches
      if (link.dataset && link.dataset.page === menuId) {
        link.classList.add('active');
      }
    });

    // For sub-menus, expand the parent group if a child is active
    var activeSub = document.querySelector('.sidebar-sub.active');
    if (activeSub) {
      var subContainer = activeSub.closest('[id$="-sub"]');
      if (subContainer) {
        subContainer.classList.remove('hidden');
        var groupId = subContainer.id.replace('-sub', '');
        var chevron = document.getElementById(groupId + '-chevron');
        if (chevron) chevron.classList.add('rotate-90');
        var parentBtn = subContainer.previousElementSibling;
        if (parentBtn) parentBtn.classList.add('active');
      }
    }
  }

  console.log('Plan-B CRM Layout Loader initialized');
  console.log('Shared files available at: shared/head.html, shared/sidebar.html, shared/topbar.html, shared/ai-panel.html, shared/scripts.html');
})();
