(function () {
  'use strict';

  // Work experience tabs
  var tabList = document.querySelector('.work-tabs[role="tablist"]');
  if (tabList) {
    var tabs = tabList.querySelectorAll('.tab-buttons [role="tab"]');
    var panels = tabList.querySelectorAll('.tab-panel');

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t, i) {
          t.setAttribute('aria-selected', i === index ? 'true' : 'false');
        });
        panels.forEach(function (panel, i) {
          panel.hidden = i !== index;
        });
      });
    });
  }

  // Highlight nav link for section in view
  var nav = document.getElementById('section-nav');
  var sectionIds = ['introduction', 'work', 'education', 'certifications', 'contact'];
  var firstLink = nav && nav.querySelector('a[href="#introduction"]');
  if (firstLink) firstLink.classList.add('nav-active');
  if (nav && typeof IntersectionObserver !== 'undefined') {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          nav.querySelectorAll('a').forEach(function (a) {
            var href = a.getAttribute('href');
            if (href === '#' + id) {
              a.classList.add('nav-active');
            } else {
              a.classList.remove('nav-active');
            }
          });
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
})();
