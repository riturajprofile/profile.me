// Ritu Raj — Portfolio interactions
// - IntersectionObserver for reveals
// - Smooth scroll, sticky nav toggle
// - Back to top button
// - GitHub projects fetch
// - Contact form validation

(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Year in footer
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Rocket launch animation - remove after completion
/*=============== DIWALI CRACKER ANIMATION ===============*/
const crackerContainer = document.getElementById('rocket-launch');
const crackerCanvas = document.getElementById('rocket-trail-canvas');

if (crackerContainer && crackerCanvas) {
  const ctx = crackerCanvas.getContext('2d');
  crackerCanvas.width = window.innerWidth;
  crackerCanvas.height = window.innerHeight;

  const colors = [
    '#FF1744', '#FF9100', '#FFD600', '#00E676', '#00B0FF', '#E040FB', '#FF4081', '#FFEB3B',
    '#FF69B4', '#FFB300', '#00C853', '#1DE9B6', '#2979FF', '#651FFF', '#F50057', '#C51162',
    '#FF6F00', '#AEEA00', '#00B8D4', '#D500F9', '#FFAB91', '#B2FF59', '#76FF03', '#F44336',
    '#FF8A65', '#B388FF', '#8C9EFF', '#00E5FF', '#FF5252', '#FF1744', '#FFD740', '#FFF176',
    '#B2EBF2', '#B2DFDB', '#DCEDC8', '#FFCCBC', '#D1C4E9', '#F8BBD0', '#E57373', '#F06292',
    '#BA68C8', '#9575CD', '#7986CB', '#64B5F6', '#4DD0E1', '#4DB6AC', '#81C784', '#AED581',
    '#DCE775', '#FFF59D', '#FFD54F', '#FFB74D', '#A1887F', '#E0E0E0', '#90A4AE'
  ];

  class Spark {
    constructor(x, y, color, angle, speed) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 1;
      this.size = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.15; // gravity
      this.life -= 0.035; // slower fade for more visible sparks
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 50 * this.life + 10; // strong hot glow that fades
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size + 2 * this.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.globalAlpha = 1;
    }
  }

  class Cracker {
    constructor() {
      this.x = crackerCanvas.width / 3;
      this.y = crackerCanvas.height + 20;
      this.vy = -22;
      this.exploded = false;
      this.sparks = [];
    }
    update() {
      if (!this.exploded) {
        this.y += this.vy;
        this.vy += 0.5;
        if (this.vy > 0 || this.y < crackerCanvas.height * 0.18) {
          this.explode();
        }
      } else {
        this.sparks = this.sparks.filter(s => s.life > 0);
        this.sparks.forEach(s => s.update());
      }
    }
    draw() {
      if (!this.exploded) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = '#DC2626';
        ctx.fillRect(-4, -15, 8, 30);
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(-4, -12, 8, 2);
        ctx.fillRect(-4, -2, 8, 2);
        ctx.fillRect(-4, 10, 8, 2);
        ctx.restore();
      } else {
        this.sparks.forEach(s => s.draw());
      }
    }
    explode() {
      this.exploded = true;
      for (let i = 0; i < 60; i++) { // more sparks for bigger spread
        const angle = (Math.PI * 2 * i) / 60;
        const speed = Math.random() * 12 + 8; // much wider spread
        const color = colors[Math.floor(Math.random() * colors.length)];
        this.sparks.push(new Spark(this.x, this.y, color, angle, speed));
      }
    }
    isDone() {
      return this.exploded && this.sparks.length === 0;
    }
  }

  const cracker = new Cracker();

  function animate() {
    ctx.clearRect(0, 0, crackerCanvas.width, crackerCanvas.height);
    cracker.update();
    cracker.draw();
    if (!cracker.isDone()) {
      requestAnimationFrame(animate);
    } else {
      // Animation complete
      setTimeout(() => {
        crackerContainer.remove();
      }, 300);
    }
  }

  // Start animation with initial timestamp
  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    crackerCanvas.width = window.innerWidth;
    crackerCanvas.height = window.innerHeight;
  });
}  // Mobile nav toggle
  const toggle = $('.nav__toggle');
  const menu = $('#nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('show');
    });
    // Close on link click (mobile)
    $$('#nav-menu a').forEach((a) =>
      a.addEventListener('click', () => {
        menu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // Back to top button
  const backToTop = $('#back-to-top');
  const onScroll = () => {
    const show = window.scrollY > 400;
    backToTop?.classList.toggle('show', show);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // IntersectionObserver reveal animations
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // handle staggered reveal children
          const delay = entry.target.getAttribute('data-delay');
          if (delay) entry.target.style.transitionDelay = `${Number(delay) * 0.06}s`;
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  $$('.reveal').forEach((el) => io.observe(el));

  // Profile image is a single decorative image; no fallback handling required.

  // Follow-dot for hero title
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    heroTitle.setAttribute('data-hover', 'true');
    const dot = document.createElement('div');
    dot.className = 'follow-dot';
    heroTitle.appendChild(dot);

    heroTitle.addEventListener('mousemove', (e) => {
      const rect = heroTitle.getBoundingClientRect();
      // constrain to rect with a small padding
      const padding = 6;
      const clampedX = Math.max(rect.left + padding, Math.min(e.clientX, rect.right - padding));
      const clampedY = Math.max(rect.top + padding, Math.min(e.clientY, rect.bottom - padding));
      dot.style.left = `${clampedX - rect.left}px`;
      dot.style.top = `${clampedY - rect.top}px`;
      dot.style.opacity = '1';
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    heroTitle.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      dot.style.transform = 'translate(-50%, -50%) scale(.9)';
    });
  }

  // Active section tracking for nav links
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav__menu a'));
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const link = document.querySelector(`.nav__menu a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach((s) => sectionObserver.observe(s));

  // Projects: fetch GitHub repos
  async function loadProjects() {
    const grid = $('#projects-grid');
    const errorEl = $('#projects-error');
    if (!grid) return;

    const username = 'riturajprofile';
    const endpoint = `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`;

    try {
      const res = await fetch(endpoint, { headers: { Accept: 'application/vnd.github+json' } });
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const repos = await res.json();

      // Filter: exclude forks, show with description or topics
      const filtered = repos
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6); // show only top 6 projects per request

      grid.innerHTML = '';

      if (!filtered.length) {
        grid.innerHTML = '<p class="muted">No public repositories to show yet. Check back soon.</p>';
        return;
      }

      for (const repo of filtered) {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
          <h3 class="card__title">${repo.name.replace(/-/g, ' ')}</h3>
          <p class="card__desc">${repo.description ? repo.description : 'No description available.'}</p>
          <div class="card__meta">
            <div class="card__tags">
              ${repo.language ? `<span class="tag">${repo.language}</span>` : ''}
              ${repo.stargazers_count ? `<span class="tag">★ ${repo.stargazers_count}</span>` : ''}
              ${repo.forks_count ? `<span class="tag">⑂ ${repo.forks_count}</span>` : ''}
            </div>
            <a class="btn btn--ghost" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Open</a>
          </div>
        `;
        grid.appendChild(card);
      }
    } catch (err) {
      console.error(err);
      errorEl?.classList.remove('hidden');
      errorEl.textContent = 'Failed to load projects from GitHub. Please try again later.';
    }
  }
  loadProjects();


    // Copy email to clipboard (no mailto)
    const copyBtn = $('#copy-email');
    if (copyBtn) {
      copyBtn.addEventListener('click', async (e) => {
        const email = copyBtn.getAttribute('data-email') || 'riturajprofile.me@gmail.com';
        try {
          await navigator.clipboard.writeText(email);
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.01L12 13l8-6.99V6H4Zm16 12V9.236l-8 6.99-8-6.99V18h16Z" fill="currentColor"/></svg> Copy Email'; }, 2000);
        } catch (err) {
          // fallback: select text
          const tmp = document.createElement('input');
          tmp.value = email;
          document.body.appendChild(tmp);
          tmp.select();
          document.execCommand('copy');
          document.body.removeChild(tmp);
          copyBtn.textContent = 'Copied!';
          setTimeout(() => (copyBtn.textContent = 'Copy Email'), 2000);
        }
      });
    }

  // Contact form validation + mailto fallback
  const form = $('#contact-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('#name');
    const email = $('#email');
    const message = $('#message');
    const status = $('#form-status');

    let valid = true;

    // Name
    if (!name.value.trim()) {
      valid = false; $('#name-error').textContent = 'Please enter your name.';
    } else { $('#name-error').textContent = ''; }

    // Email
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRe.test(email.value)) {
      valid = false; $('#email-error').textContent = 'Enter a valid email address.';
    } else { $('#email-error').textContent = ''; }

    // Message
    if (!message.value.trim()) {
      valid = false; $('#message-error').textContent = 'Please enter a message.';
    } else { $('#message-error').textContent = ''; }

    if (!valid) {
      status.textContent = 'Please fix the errors above.';
      status.style.color = '#b91c1c';
      return;
    }

    const body = { name: name.value.trim(), email: email.value.trim(), message: message.value.trim() };
    const endpoint = form.getAttribute('data-endpoint') || '';

    // If a Formspree endpoint is provided (not the placeholder), post there
    if (endpoint && !endpoint.includes('your_form_id')) {
      status.textContent = 'Sending...';
      try {
        const resp = await fetch(endpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body)
        });
        const data = await resp.json().catch(() => ({}));
        if (resp.ok) {
          status.textContent = 'Message sent — thank you! I will reply via email soon.';
          form.reset();
        } else {
          status.textContent = data.error || 'Failed to send message via Formspree.';
          status.style.color = '#b91c1c';
        }
      } catch (err) {
        console.error(err);
        status.textContent = 'Failed to reach Formspree. Message copied to clipboard.';
        status.style.color = '#b91c1c';
        try { await navigator.clipboard.writeText(`Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`); } catch(e){}
      }
      return;
    }

    // If no Formspree endpoint, attempt serverless function
    status.textContent = 'Sending...';
    status.style.color = 'inherit';
    try {
      const resp = await fetch('/api/send-email', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
      });
      const data = await resp.json().catch(() => ({}));
      if (resp.ok) {
        status.textContent = 'Message sent — thank you! I will reply via email soon.';
        form.reset();
      } else if (resp.status === 202) {
        // dev fallback: server accepted but did not send
        status.textContent = 'Message accepted (dev). Copied to clipboard.';
        try { await navigator.clipboard.writeText(`Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`); } catch(e){}
        form.reset();
      } else {
        status.textContent = data.error || 'Failed to send message. Please try again later.';
        status.style.color = '#b91c1c';
      }
    } catch (err) {
      console.error(err);
      status.textContent = 'Failed to reach email service. Message copied to clipboard.';
      status.style.color = '#b91c1c';
      try { await navigator.clipboard.writeText(`Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`); } catch(e){}
    }
  });

  // Profile image rotation on Enter/Return key (fix)
  const profileImg = document.getElementById('profile-img');
  function rotateProfileImg() {
    if (!profileImg) return;
    profileImg.style.transition = 'transform 1s cubic-bezier(.7,.2,.3,1)';
    profileImg.style.transform = 'rotate(900deg)'; // 150rpm * 1s = 900deg
    setTimeout(() => {
      profileImg.style.transform = '';
      profileImg.style.transition = '';
    }, 1000);
  }
  document.addEventListener('keydown', (e) => {
    // Only trigger if not focused on input, textarea, or popup
    const active = document.activeElement;
    const isInput = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
    const isPopup = active && (active.closest && active.closest('.ai-popup'));
    if (!isInput && !isPopup && (e.key === 'Enter')) {
      rotateProfileImg();
    }
  });

  // AI badge dropdown popup logic (nav bar)
  const aiBadge = document.getElementById('ai-badge');
  const aiPopup = document.getElementById('ai-popup');
  const aiPopupClose = document.getElementById('ai-popup-close');
  if (aiBadge && aiPopup && aiPopupClose) {
    aiBadge.addEventListener('click', (e) => {
      e.stopPropagation();
      aiPopup.classList.toggle('hidden');
      aiPopup.setAttribute('aria-hidden', aiPopup.classList.contains('hidden') ? 'true' : 'false');
      if (!aiPopup.classList.contains('hidden')) {
        aiPopupClose.focus();
      }
    });
    aiPopupClose.addEventListener('click', () => {
      aiPopup.classList.add('hidden');
      aiPopup.setAttribute('aria-hidden', 'true');
      aiBadge.focus();
    });
    // Close popup on Escape key
    aiPopup.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        aiPopup.classList.add('hidden');
        aiPopup.setAttribute('aria-hidden', 'true');
        aiBadge.focus();
      }
    });
    // Trap focus inside popup
    aiPopup.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        aiPopupClose.focus();
      }
    });
    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
      if (!aiPopup.classList.contains('hidden')) {
        if (!aiPopup.contains(e.target) && e.target !== aiBadge) {
          aiPopup.classList.add('hidden');
          aiPopup.setAttribute('aria-hidden', 'true');
        }
      }
    });
  }
})();
