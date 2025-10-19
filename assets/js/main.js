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

  // Mobile nav toggle
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
})();
