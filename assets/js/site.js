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

  // Work experience tabs (panels must live under #work — not only inside .work-tab-panels, for robustness)
  var workRoot = document.getElementById('work');
  var tabList = workRoot && workRoot.querySelector('.tab-buttons[role="tablist"]');
  if (tabList && workRoot) {
    var tabs = tabList.querySelectorAll('[role="tab"]');
    var panels = workRoot.querySelectorAll('.tab-panel[role="tabpanel"]');

    tabs.forEach(function (tab, index) {
      // Avoid focus-driven scroll (scroll-snap / hash) when clicking tabs
      tab.addEventListener('mousedown', function (e) {
        if (e.button === 0) e.preventDefault();
      });
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
  var sectionIds = ['introduction', 'work', 'education-certifications', 'contact'];
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
