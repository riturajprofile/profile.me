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

  /*=============== CHHATA PUJA THEME ACTIVATION ===============*/
  // Automatically apply Chhath theme during September-October
  const currentMonth = new Date().getMonth(); // 0 = Jan, 8 = Sep, 9 = Oct
  if (currentMonth === 8 || currentMonth === 9) {
    document.body.classList.add('chhath-theme');
    console.log('🌅 Chhata Puja theme activated! Celebrating Bihar/Jharkhand heritage.');
    
    // Auto-hide Chhath banner after 6 seconds
    const chhathBanner = document.querySelector('.chhath-banner');
    if (chhathBanner) {
      setTimeout(() => {
        chhathBanner.classList.add('fade-out');
        // Remove from DOM after animation completes
        setTimeout(() => {
          chhathBanner.remove();
        }, 1200); // Match animation duration
      }, 6000); // 6 seconds delay
    }
  } else {
    // Remove animation container for other months
    const animationContainer = document.getElementById('rocket-launch');
    if (animationContainer) {
      animationContainer.remove();
    }
    console.log('🎨 Default theme active');
  }

  // Rocket launch animation - remove after completion
/*=============== CHHATA PUJA (CHHATH) ANIMATION ===============*/
// Celebrating Bihar/Jharkhand's most sacred harvest festival
const crackerContainer = document.getElementById('rocket-launch');
const crackerCanvas = document.getElementById('rocket-trail-canvas');

if (document.getElementById('rocket-launch') && document.getElementById('rocket-trail-canvas')) {
  const canvas = document.getElementById('rocket-trail-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Chhath Puja color palette - representing Sun God, harvest, and spirituality
  const chhathColors = [
    '#FFD700', // Golden yellow - Sun God (Surya Dev)
    '#FF6B35', // Saffron - Sacred spiritual color
    '#FFA500', // Orange - Dawn/dusk prayers
    '#FFDB58', // Mustard - Harvest & prosperity
    '#FF8C00', // Dark orange - Setting sun
    '#FFB347', // Light orange - Rising sun
    '#F4C430', // Saffron gold - Traditional offerings
    '#FFC40C', // Golden - Bamboo baskets (Soop)
    '#FFE4B5', // Moccasin - Morning light
    '#FFDAB9', // Peach - Gentle sunrise
    '#FF7F50', // Coral - Sunset prayers
    '#CD853F', // Peru - Earth & harvest
    '#DAA520', // Goldenrod - Prosperity
    '#B8860B', // Dark goldenrod - Spiritual depth
    '#FFAA33'  // Bright gold - Festival joy
  ];

  // Spark represents flower petals and sun rays during Chhath celebration
  class Spark {
    constructor(x, y, color, angle, speed) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 1;
      this.size = Math.random() * 3 + 2; // Larger for petal effect
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.12; // Gentle gravity like floating petals
      this.vx *= 0.99; // Air resistance
      this.rotation += this.rotationSpeed;
      this.life -= 0.02; // Slower fade for graceful descent
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.life;
      
      // Draw petal-like shape
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 25 * this.life + 8;
      
      // Petal shape
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 1.5, this.size * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner glow
      ctx.fillStyle = '#FFFFFF';
      ctx.globalAlpha = this.life * 0.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 0.6, this.size * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
      ctx.globalAlpha = 1;
    }
  }

  // Sun symbol representing Surya Dev - central deity of Chhath Puja
  class SunOffering {
    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height + 30;
      this.vy = -20;
      this.exploded = false;
      this.sparks = [];
      this.angle = 0;
    }
    update() {
      if (!this.exploded) {
        this.y += this.vy;
        this.vy += 0.45; // Smooth upward motion
        this.angle += 0.05; // Gentle rotation
        if (this.vy > 0 || this.y < canvas.height * 0.15) {
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
        ctx.rotate(this.angle);
        
        // Draw sun symbol (Surya)
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(0.5, '#FF6B35');
        gradient.addColorStop(1, '#FFA500');
        
        // Sun circle
        ctx.fillStyle = gradient;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Sun rays
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI * 2 * i) / 8;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * 18, Math.sin(angle) * 18);
          ctx.lineTo(Math.cos(angle) * 28, Math.sin(angle) * 28);
          ctx.stroke();
        }
        
        ctx.restore();
      } else {
        this.sparks.forEach(s => s.draw());
      }
    }
    explode() {
      this.exploded = true;
      // Create 80 petals representing offerings (flowers, fruits) at Chhath
      for (let i = 0; i < 80; i++) {
        const angle = (Math.PI * 2 * i) / 80;
        const speed = Math.random() * 10 + 6;
        const color = chhathColors[Math.floor(Math.random() * chhathColors.length)];
        this.sparks.push(new Spark(this.x, this.y, color, angle, speed));
      }
    }
    isDone() {
      return this.exploded && this.sparks.length === 0;
    }
  }

  const sunOffering = new SunOffering();

  function animate() {
    // Create subtle golden gradient background during animation
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height * 0.15, 0,
      canvas.width / 2, canvas.height * 0.15, canvas.width * 0.6
    );
    gradient.addColorStop(0, 'rgba(255, 215, 0, 0.03)');
    gradient.addColorStop(1, 'rgba(255, 107, 53, 0.01)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    sunOffering.update();
    sunOffering.draw();
    
    if (!sunOffering.isDone()) {
      requestAnimationFrame(animate);
    } else {
      // Keep for 1 second then remove
      setTimeout(() => {
        document.getElementById('rocket-launch').remove();
      }, 1000);
    }
  }

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

    // Read github-projects.txt
    let allowedRepos = [];
    try {
      const txtRes = await fetch('github-projects.txt');
      if (txtRes.ok) {
        const txt = await txtRes.text();
        allowedRepos = txt.split('\n')
          .map(line => line.trim())
          .filter(line => line && !line.startsWith('#'))
          .map(line => {
            // Accept both full URLs and repo names
            if (line.startsWith('https://github.com/')) {
              return line.replace('https://github.com/', '');
            }
            return line;
          });
      }
    } catch (e) {
      // If file missing, show all
      allowedRepos = [];
    }

    const username = 'riturajprofile';
    const endpoint = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

    try {
      const res = await fetch(endpoint, { headers: { Accept: 'application/vnd.github+json' } });
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const repos = await res.json();

      // Only show repos listed in github-projects.txt
      let filtered = repos.filter(r => !r.fork);
      if (allowedRepos.length) {
        filtered = filtered.filter(r => allowedRepos.includes(`${r.owner.login}/${r.name}`));
      }
      filtered = filtered.slice(0, 12); // show up to 12 listed projects

      grid.innerHTML = '';
      if (!filtered.length) {
        grid.innerHTML = '<p class="muted">No listed repositories to show yet. Add them to github-projects.txt.</p>';
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
