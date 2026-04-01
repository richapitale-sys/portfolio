/* =============================================
   Richa Pitale Portfolio - Main JavaScript
   ============================================= */

// --- Navigation Hamburger Menu ---
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navbar    = document.querySelector('.navbar');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when any link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks && hamburger &&
      navLinks.classList.contains('active') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// --- Navbar scroll effect ---
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// --- Scroll-to-Top Button ---
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Contact Form Handling ---
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');
const sendAnotherBtn = document.getElementById('sendAnotherBtn');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    // Validate name
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (nameInput && nameError) {
      if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        nameError.classList.add('visible');
        valid = false;
      } else {
        nameInput.classList.remove('error');
        nameError.classList.remove('visible');
      }
    }

    // Validate email
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    if (emailInput && emailError) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        emailError.classList.add('visible');
        valid = false;
      } else {
        emailInput.classList.remove('error');
        emailError.classList.remove('visible');
      }
    }

    // Validate subject
    const subjectInput = document.getElementById('subject');
    const subjectError = document.getElementById('subject-error');
    if (subjectInput && subjectError) {
      if (!subjectInput.value.trim()) {
        subjectInput.classList.add('error');
        subjectError.classList.add('visible');
        valid = false;
      } else {
        subjectInput.classList.remove('error');
        subjectError.classList.remove('visible');
      }
    }

    // Validate message
    const messageInput = document.getElementById('message');
    const messageError = document.getElementById('message-error');
    if (messageInput && messageError) {
      if (!messageInput.value.trim() || messageInput.value.trim().length < 20) {
        messageInput.classList.add('error');
        messageError.classList.add('visible');
        valid = false;
      } else {
        messageInput.classList.remove('error');
        messageError.classList.remove('visible');
      }
    }

    if (!valid) return;

    // Show success state
    contactForm.style.display = 'none';
    if (formSuccess) {
      formSuccess.classList.add('visible');
    }
    contactForm.reset();
  });
}

if (sendAnotherBtn && contactForm && formSuccess) {
  sendAnotherBtn.addEventListener('click', () => {
    formSuccess.classList.remove('visible');
    contactForm.style.display = 'block';
  });
}

// --- Clear field errors on input ---
document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
  field.addEventListener('input', () => {
    field.classList.remove('error');
    const errorEl = document.getElementById(field.id + '-error');
    if (errorEl) errorEl.classList.remove('visible');
  });
});

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
