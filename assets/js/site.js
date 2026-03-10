(function () {
  'use strict';

  // Hero / intro: reveal immediately (no scroll-reveal delay)
  var intro = document.getElementById('introduction');
  if (intro) intro.classList.add('revealed');

  // Scroll reveal: add .revealed when section enters viewport
  var sections = document.querySelectorAll('.page-section');
  if (typeof IntersectionObserver !== 'undefined') {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { rootMargin: '-80px 0px -80px 0px', threshold: 0 }
    );
    sections.forEach(function (el) {
      if (el.id !== 'introduction') revealObserver.observe(el);
    });
  } else {
    sections.forEach(function (el) { el.classList.add('revealed'); });
  }

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
