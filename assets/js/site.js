(function () {
  'use strict';

  var sectionIds = [
    'introduction',
    'work',
    'education-certifications',
    'contact'
  ];

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function maxDocumentScrollY() {
    return Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
  }

  /** Align section bottom to viewport bottom (matches scroll-snap-align: end). */
  function scrollSectionToBottom(el, behavior) {
    var top = el.getBoundingClientRect().top + window.scrollY;
    var bottom = top + el.offsetHeight;
    var y = bottom - window.innerHeight;
    var clamped = Math.min(Math.max(0, y), maxDocumentScrollY());
    window.scrollTo({ top: clamped, behavior: behavior });
  }

  function syncNavScrollPad() {
    var nav = document.getElementById('section-nav');
    if (!nav) return;
    var h = Math.ceil(nav.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--nav-scroll-pad', h + 'px');
  }

  var navForResize = document.getElementById('section-nav');
  syncNavScrollPad();
  window.addEventListener('resize', syncNavScrollPad);
  if (typeof ResizeObserver !== 'undefined' && navForResize) {
    new ResizeObserver(syncNavScrollPad).observe(navForResize);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncNavScrollPad).catch(function () {});
  }

  function sectionDocumentTop(el) {
    return el.getBoundingClientRect().top + window.scrollY;
  }

  /** Section containing the viewport bottom (matches end snap semantics). */
  function getCurrentSectionIndex() {
    var probe = window.scrollY + window.innerHeight - 8;
    for (var i = 0; i < sectionIds.length; i++) {
      var el = document.getElementById(sectionIds[i]);
      if (!el) continue;
      var t = sectionDocumentTop(el);
      var b = t + el.offsetHeight;
      if (probe >= t && probe < b) return i;
    }
    var first = document.getElementById(sectionIds[0]);
    if (first && probe < sectionDocumentTop(first)) return 0;
    return sectionIds.length - 1;
  }

  function focusIsEditable(el) {
    if (!el || el === document.body) return false;
    var tag = el.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
    return el.isContentEditable === true;
  }

  function isDesktopSectionNav() {
    return (
      window.matchMedia &&
      window.matchMedia('(min-width: 721px)').matches
    );
  }

  document.addEventListener('keydown', function (e) {
    if (!isDesktopSectionNav()) return;
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    if (focusIsEditable(document.activeElement)) return;
    var idx = getCurrentSectionIndex();
    var next = e.key === 'ArrowDown' ? idx + 1 : idx - 1;
    if (next < 0 || next >= sectionIds.length) return;
    var target = document.getElementById(sectionIds[next]);
    if (!target) return;
    e.preventDefault();
    var href = '#' + sectionIds[next];
    if (history.replaceState) {
      try {
        history.replaceState(null, '', href);
      } catch (err) {
        window.location.hash = href;
      }
    } else {
      window.location.hash = href;
    }
    var behavior = prefersReducedMotion() ? 'auto' : 'smooth';
    scrollSectionToBottom(target, behavior);
  });

  // Top nav: align section bottom to viewport bottom (matches CSS scroll-snap end).
  var sectionNav = document.getElementById('section-nav');
  if (sectionNav) {
    sectionNav.addEventListener('click', function (e) {
      var link = e.target.closest && e.target.closest('a[href^="#"]');
      if (!link || !sectionNav.contains(link)) return;
      var href = link.getAttribute('href');
      if (!href || href.length < 2) return;
      var id = href.slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      if (history.replaceState) {
        try {
          history.replaceState(null, '', href);
        } catch (err) {
          window.location.hash = href;
        }
      } else {
        window.location.hash = href;
      }
      var behavior = prefersReducedMotion() ? 'auto' : 'smooth';
      scrollSectionToBottom(target, behavior);
    });
  }

  if (location.hash && location.hash.length > 1) {
    var hashId = decodeURIComponent(location.hash.slice(1));
    var hashEl = document.getElementById(hashId);
    if (hashEl && hashEl.classList.contains('page-section')) {
      requestAnimationFrame(function () {
        scrollSectionToBottom(hashEl, prefersReducedMotion() ? 'auto' : 'smooth');
      });
    }
  }

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

  // Work experience tabs (panels must live under #work — not only inside .work-tab-panels, for robustness)
  var workRoot = document.getElementById('work');
  var tabList = workRoot && workRoot.querySelector('.tab-buttons[role="tablist"]');
  if (tabList && workRoot) {
    var tabs = tabList.querySelectorAll('[role="tab"]');
    var panels = workRoot.querySelectorAll('.tab-panel[role="tabpanel"]');

    tabs.forEach(function (tab, index) {
      // Avoid focus-driven scroll when clicking tabs
      function preventDefaultPrimary(e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        if (e.button != null && e.button !== 0) return;
        e.preventDefault();
      }
      tab.addEventListener('mousedown', preventDefaultPrimary);
      tab.addEventListener('touchstart', preventDefaultPrimary, { passive: false });
      tab.addEventListener('pointerdown', preventDefaultPrimary);
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        tabs.forEach(function (t, i) {
          t.setAttribute('aria-selected', i === index ? 'true' : 'false');
        });
        panels.forEach(function (panel, i) {
          panel.hidden = i !== index;
        });
        if (typeof tab.focus === 'function') {
          try {
            tab.focus({ preventScroll: true });
          } catch (err) {
            tab.focus();
          }
        }
      });
    });
  }

  // Highlight nav link for section in view
  var nav = document.getElementById('section-nav');
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
      // Band biased to upper viewport; content sits below nav padding after end snap.
      { rootMargin: '-28% 0px -52% 0px', threshold: 0 }
    );
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  function showContactToast(message, isSuccess) {
    var toast = document.getElementById('contact-form-toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove('contact-toast--success', 'contact-toast--error');
    toast.classList.add(isSuccess ? 'contact-toast--success' : 'contact-toast--error');
    toast.removeAttribute('hidden');
    toast.setAttribute('aria-hidden', 'false');

    window.clearTimeout(showContactToast._timer);
    showContactToast._timer = window.setTimeout(function () {
      toast.setAttribute('hidden', '');
      toast.setAttribute('aria-hidden', 'true');
      toast.textContent = '';
      toast.classList.remove('contact-toast--success', 'contact-toast--error');
    }, 6000);
  }

  // Web3Forms: AJAX submit (no redirect)
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = contactForm.querySelector('.contact-form-submit');
      var defaultLabel = submitBtn ? submitBtn.textContent : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      var formData = new FormData(contactForm);
      var payload = Object.fromEntries(formData.entries());
      var jsonBody = JSON.stringify(payload);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: jsonBody
      })
        .then(function (response) {
          return response.json().then(function (data) {
            return { ok: response.ok, status: response.status, data: data };
          });
        })
        .then(function (result) {
          var data = result.data || {};
          var ok =
            typeof data.success === 'boolean' ? data.success : result.ok;
          var msg =
            data.message ||
            (ok ? 'Message sent.' : 'Something went wrong.');
          showContactToast(msg, ok);
          if (ok) contactForm.reset();
        })
        .catch(function () {
          showContactToast('Something went wrong. Please try again.', false);
        })
        .then(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = defaultLabel;
          }
        });
    });
  }
})();
