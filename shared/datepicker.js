/* shared/datepicker.js
 * Auto-init all <input type="date"> with flatpickr — display dd/mm/yyyy
 * Internal value remains YYYY-MM-DD so existing JS comparisons keep working.
 * Handles dynamically added inputs via MutationObserver.
 */
(function () {
  var FP_CSS = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css';
  var FP_JS  = 'https://cdn.jsdelivr.net/npm/flatpickr';

  /* 1) Load CSS once */
  if (!document.querySelector('link[data-fp-css]')) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FP_CSS;
    link.setAttribute('data-fp-css', '1');
    document.head.appendChild(link);
  }

  /* 2) Init function — applies flatpickr to every uninitialized date input */
  function initDatePickers(scope) {
    if (!window.flatpickr) return;
    scope = scope || document;
    var inputs = scope.querySelectorAll('input[type="date"]:not([data-fp-init])');
    inputs.forEach(function (inp) {
      inp.setAttribute('data-fp-init', '1');
      window.flatpickr(inp, {
        altInput: true,
        altFormat: 'd/m/Y',
        dateFormat: 'Y-m-d',
        allowInput: true,
        altInputClass: inp.className,
        disableMobile: true
      });
    });
  }
  window.initDatePickers = initDatePickers;

  /* 3) Load flatpickr JS once, then init + watch for new inputs */
  function whenFlatpickrReady(cb) {
    if (window.flatpickr) { cb(); return; }
    var s = document.createElement('script');
    s.src = FP_JS;
    s.onload = cb;
    document.head.appendChild(s);
  }

  function startWatching() {
    initDatePickers();
    if (!('MutationObserver' in window)) return;
    var pending = false;
    var obs = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].addedNodes.length) {
          if (pending) return;
          pending = true;
          requestAnimationFrame(function () {
            pending = false;
            initDatePickers();
          });
          return;
        }
      }
    });
    obs.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { whenFlatpickrReady(startWatching); });
  } else {
    whenFlatpickrReady(startWatching);
  }
})();
