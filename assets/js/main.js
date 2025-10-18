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
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  $$('.reveal').forEach((el) => io.observe(el));

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
        .slice(0, 8);

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

  // Contact form validation + mailto fallback
  const form = $('#contact-form');
  form?.addEventListener('submit', (e) => {
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

    // Mailto fallback
    const subject = encodeURIComponent('Portfolio Contact');
    const body = encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\n\n${message.value}`);
    const mail = 'your.email@example.com'; // TODO: replace with your email
    window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
    status.textContent = 'Opening your email client...';
    status.style.color = 'inherit';
    form.reset();
  });
})();
