// Bharat Lead Summit — standalone site interactions

document.addEventListener('DOMContentLoaded', () => {
  // Mark active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      navLinks.style.display = navLinks.classList.contains('mobile-open') ? 'flex' : '';
      if (navLinks.classList.contains('mobile-open')) {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '76px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#fff';
        navLinks.style.flexDirection = 'column';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid #e2e8f0';
      }
    });
  }

  // Tabs
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const panels = group.querySelectorAll('.tab-panel');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = group.querySelector(`.tab-panel[data-panel="${btn.dataset.tab}"]`);
        if (target) target.classList.add('active');
      });
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Agenda item modal
  const modalOverlay = document.getElementById('agenda-modal');
  if (modalOverlay) {
    const modalBody = modalOverlay.querySelector('.modal-body');
    document.querySelectorAll('.agenda-item[data-detail]').forEach(item => {
      item.addEventListener('click', () => {
        modalBody.innerHTML = item.dataset.detail;
        modalOverlay.classList.add('open');
      });
    });
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay || e.target.classList.contains('modal-close')) {
        modalOverlay.classList.remove('open');
      }
    });
  }

  // Registration flow
  const regRoot = document.getElementById('register-flow');
  if (regRoot) {
    let state = { category: null, pass: null };
    const stepEls = regRoot.querySelectorAll('.reg-step');
    const stepIndicators = document.querySelectorAll('.step');

    function goToStep(n) {
      stepEls.forEach(s => s.style.display = 'none');
      const el = regRoot.querySelector(`.reg-step[data-step="${n}"]`);
      if (el) el.style.display = 'block';
      stepIndicators.forEach((s, i) => {
        s.classList.remove('done', 'current');
        if (i + 1 < n) s.classList.add('done');
        else if (i + 1 === n) s.classList.add('current');
      });
      window.scrollTo({ top: regRoot.offsetTop - 100, behavior: 'smooth' });
    }

    regRoot.querySelectorAll('[data-category]').forEach(card => {
      card.addEventListener('click', () => {
        state.category = card.dataset.category;
        goToStep(2);
      });
    });
    regRoot.querySelectorAll('[data-pass]').forEach(card => {
      card.addEventListener('click', () => {
        state.pass = card.dataset.pass;
        const summary = document.getElementById('reg-summary');
        if (summary) summary.textContent = `${state.category} · ${state.pass} Pass`;
        goToStep(3);
      });
    });
    const form = document.getElementById('reg-details-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('This is a static demo — in production this step redirects to the official RUAS payment portal.');
      });
    }
    regRoot.querySelectorAll('[data-back]').forEach(btn => {
      btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.back, 10)));
    });
  }

  // Contact form (static demo fallback to WhatsApp)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]').value || 'there';
      const subject = contactForm.querySelector('[name="subject"]').value;
      const message = contactForm.querySelector('[name="message"]').value;
      const text = encodeURIComponent(`Hi, I'm ${name}. Subject: ${subject}. ${message}`);
      window.open(`https://wa.me/910000000000?text=${text}`, '_blank');
    });
  }

  // Countdown
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    const target = new Date('2027-04-10T09:00:00+05:30').getTime();
    function tick() {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        countdownEl.innerHTML = '<span class="pill pill-slate">Event has concluded — see you next edition!</span>';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      countdownEl.innerHTML = [
        [d, 'Days'], [h, 'Hrs'], [m, 'Min'], [s, 'Sec']
      ].map(([v, l]) => `<div class="cd-box"><strong>${String(v).padStart(2, '0')}</strong><span>${l}</span></div>`).join('');
    }
    tick();
    setInterval(tick, 1000);
  }
});
