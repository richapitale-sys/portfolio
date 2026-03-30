/* =============================================
   Richa Pitale Portfolio - JavaScript
   ============================================= */

(function () {
  'use strict';

  // ── Navbar scroll effect ──────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  // ── Hamburger / mobile menu ───────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Scroll-to-top button ─────────────────────
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    const toggleScrollBtn = () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', toggleScrollBtn, { passive: true });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Contact form validation & submission ──────
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const sendAnotherBtn = document.getElementById('sendAnotherBtn');

  if (contactForm) {
    const fields = {
      name: {
        el: document.getElementById('name'),
        err: document.getElementById('name-error'),
        validate: (v) => v.trim().length >= 2,
      },
      email: {
        el: document.getElementById('email'),
        err: document.getElementById('email-error'),
        validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      },
      subject: {
        el: document.getElementById('subject'),
        err: document.getElementById('subject-error'),
        validate: (v) => v.trim().length >= 3,
      },
      message: {
        el: document.getElementById('message'),
        err: document.getElementById('message-error'),
        validate: (v) => v.trim().length >= 20,
      },
    };

    const markField = (fieldObj, valid) => {
      if (!fieldObj.el) return;
      if (valid) {
        fieldObj.el.classList.remove('error');
        fieldObj.err.classList.remove('visible');
      } else {
        fieldObj.el.classList.add('error');
        fieldObj.err.classList.add('visible');
      }
    };

    // Live validation on blur
    Object.values(fields).forEach((fieldObj) => {
      if (!fieldObj.el) return;
      fieldObj.el.addEventListener('blur', () => {
        markField(fieldObj, fieldObj.validate(fieldObj.el.value));
      });
      fieldObj.el.addEventListener('input', () => {
        if (fieldObj.el.classList.contains('error')) {
          markField(fieldObj, fieldObj.validate(fieldObj.el.value));
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      Object.values(fields).forEach((fieldObj) => {
        if (!fieldObj.el) return;
        const valid = fieldObj.validate(fieldObj.el.value);
        markField(fieldObj, valid);
        if (!valid) isValid = false;
      });

      if (!isValid) {
        // Focus the first invalid field
        const firstError = contactForm.querySelector('.error');
        if (firstError) firstError.focus();
        return;
      }

      // Simulate successful submission (static site — no backend)
      const submitBtn = document.getElementById('submitBtn');
      if (submitBtn) {
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('visible');
        contactForm.reset();
        if (submitBtn) {
          submitBtn.textContent = 'Send Message →';
          submitBtn.disabled = false;
        }
      }, 800);
    });
  }

  if (sendAnotherBtn && contactForm && formSuccess) {
    sendAnotherBtn.addEventListener('click', () => {
      formSuccess.classList.remove('visible');
      contactForm.style.display = '';
      const firstInput = contactForm.querySelector('input');
      if (firstInput) firstInput.focus();
    });
  }

  // ── Intersection Observer — fade-in animations ──
  const animateEls = document.querySelectorAll(
    '.project-card, .skill-card, .timeline-card, .info-card, .beyond-card, .lang-badge'
  );

  if ('IntersectionObserver' in window && animateEls.length) {
    // Set initial state
    animateEls.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animateEls.forEach((el) => observer.observe(el));
  }

  // ── Active nav highlighting based on current page ──
  (function highlightActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      const linkFile = href.split('/').pop();
      // Skip the CTA nav button — it handles its own style
      if (link.classList.contains('nav-cta') && linkFile !== path) return;
      if (linkFile === path) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  })();

})();
