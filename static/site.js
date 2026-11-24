(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // whole row opens the detail page, but text stays selectable and inner links work
  document.addEventListener('click', function (ev) {
    var row = ev.target.closest('[data-href]');
    if (!row || ev.target.closest('a, button, summary')) return;
    var sel = window.getSelection && window.getSelection();
    if (sel && String(sel).length) return;
    window.location.href = row.getAttribute('data-href');
  });

  // back to top: shown after scrolling well down or at the bottom
  var btn = document.querySelector('.va-totop');
  if (!btn) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function update() {
    var y = window.scrollY || 0;
    var atEnd = window.innerHeight + y >= document.documentElement.scrollHeight - 4;
    var show = y > window.innerHeight * 1.5 || (atEnd && y > 200);
    btn.hidden = !show;
  }
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    var main = document.getElementById('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    }
  });
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
