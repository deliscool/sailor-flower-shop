/* ============================================================
   Sailor Flower Power Shop — main.js
   Enchanted Garden direction
   ============================================================ */

/* ── Helpers ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const rng = (seed, i) => Math.abs(Math.sin((i + 1) * 9301 + seed * 49297)) % 1;

/* ────────────────────────────────────────────
   NAV — frosted glass on scroll
   ──────────────────────────────────────────── */
const nav = $('#nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ────────────────────────────────────────────
   HERO IMAGE — gentle parallax
   ──────────────────────────────────────────── */
const heroImg = $('#hero-img');
if (heroImg) {
  heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
  if (heroImg.complete) heroImg.classList.add('loaded');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroImg.style.transform = `scale(1) translateY(${y * 0.18}px)`;
    }
  }, { passive: true });
}

/* ────────────────────────────────────────────
   PETAL RAIN — index page only
   ──────────────────────────────────────────── */
const petalRain = $('#petal-rain');
if (petalRain) {
  /* kawaii mix: petals, hearts, stars */
  const PETAL_SVG = (color, size) =>
    `<svg width="${size}" height="${Math.round(size * 1.4)}" viewBox="0 0 60 84" aria-hidden="true">` +
    `<path d="M30 2 C50 18, 56 50, 30 82 C4 50, 10 18, 30 2 Z" fill="${color}" opacity="0.78"/></svg>`;

  const HEART_SVG = (color, size) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">` +
    `<path d="M12 21.6C12 21.6 2 14.4 2 7.8 2 5.1 4.1 3 6.8 3c1.5 0 2.9.7 3.8 1.8L12 6.2l1.4-1.4C14.3 3.7 15.7 3 17.2 3 19.9 3 22 5.1 22 7.8c0 6.6-10 13.8-10 13.8z" fill="${color}" opacity="0.85"/></svg>`;

  const STAR_SVG = (color, size) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">` +
    `<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6Z" fill="${color}" opacity="0.80"/></svg>`;

  const palette = ['#FFB3D9', '#FF6AB0', '#FFE44D', '#DDB8F0', '#7ED8C8', '#fff'];
  const shapes  = [PETAL_SVG, PETAL_SVG, PETAL_SVG, HEART_SVG, HEART_SVG, STAR_SVG];

  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'petal-el';
    const left   = rng(0, i) * 100;
    const dur    = 16 + rng(1, i) * 12;
    const delay  = rng(2, i) * -22;
    const size   = 12 + Math.round(rng(3, i) * 14);
    const dx     = (rng(4, i) - 0.5) * 100;
    const dr     = Math.round(rng(5, i) * 360);
    const color  = palette[Math.floor(rng(6, i) * palette.length)];
    const shapeFn = shapes[Math.floor(rng(7, i) * shapes.length)];
    el.style.cssText = `left:${left}%; --dur:${dur}s; --delay:${delay}s; --dx:${dx}px; --dr:${dr}deg; animation-delay:${delay}s; animation-duration:${dur}s;`;
    el.innerHTML = shapeFn(color, size);
    petalRain.appendChild(el);
  }
}

/* ────────────────────────────────────────────
   SPARKLE FIELD — index page only
   ──────────────────────────────────────────── */
const sparkleLayer = $('#sparkle-layer');
if (sparkleLayer) {
  const SPARKLE_SVG = (size, color) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">` +
    `<path d="M12 0 L13.5 9 L24 12 L13.5 15 L12 24 L10.5 15 L0 12 L10.5 9 Z" fill="${color}"/></svg>`;

  const sparkleColors = ['rgba(255,228,77,.95)', 'rgba(255,142,192,.9)', 'rgba(126,216,200,.88)', 'rgba(221,184,240,.85)', 'rgba(255,255,255,.95)'];

  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.style.cssText = [
      `position:absolute`,
      `top:${rng(0, i) * 90}%`,
      `left:${rng(1, i) * 95}%`,
      `pointer-events:none`,
      `animation:twinkle ${2 + rng(2, i) * 2.5}s ease-in-out ${rng(3, i) * -4}s infinite`,
    ].join(';');
    const size  = 6 + Math.round(rng(4, i) * 14);
    const color = sparkleColors[Math.floor(rng(5, i) * sparkleColors.length)];
    el.innerHTML = SPARKLE_SVG(size, color);
    sparkleLayer.appendChild(el);
  }
}

/* ────────────────────────────────────────────
   SCROLL REVEAL
   ──────────────────────────────────────────── */
const revealTargets = $$('.product-card, .value-item, .team-card, .about-snippet-inner > *, .quiz-inner > *');
if ('IntersectionObserver' in window && revealTargets.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animation = 'fade-up .55s ease-out both';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => {
    el.style.opacity = '0';
    io.observe(el);
  });
}

/* ────────────────────────────────────────────
   SHOP FILTER CHIPS
   ──────────────────────────────────────────── */
const filterBar = $('#filter-bar');
if (filterBar) {
  filterBar.addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;

    $$('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.dataset.filter;
    $$('.product-card[data-tags]').forEach(card => {
      const show = filter === 'all' || card.dataset.tags.includes(filter);
      card.style.display = show ? '' : 'none';
      if (show) card.style.animation = 'bloom-in .35s ease-out both';
    });
  });
}

/* ────────────────────────────────────────────
   PRODUCT HEARTS (wishlist toggle)
   ──────────────────────────────────────────── */
document.addEventListener('click', e => {
  const heart = e.target.closest('.product-heart');
  if (!heart) return;
  e.preventDefault();
  heart.classList.toggle('active');
  heart.textContent = heart.classList.contains('active') ? '♥' : '♡';
});

/* ────────────────────────────────────────────
   PAGE TRANSITIONS
   ──────────────────────────────────────────── */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  /* only handle same-origin .html links */
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || !href.endsWith('.html')) return;
  e.preventDefault();
  document.body.style.transition = 'opacity .22s ease';
  document.body.style.opacity = '0';
  setTimeout(() => { window.location.href = href; }, 220);
});

/* ────────────────────────────────────────────
   WATSON CHAT WIDGET
   ──────────────────────────────────────────── */

/**
 * window.SailorBot — Watson integration interface
 *
 * Wire your Watson bot like this:
 *
 *   window.SailorBot.on('message', ({ text }) => {
 *     // call your Watson API with `text`
 *     myWatsonAssistant.message(text, (reply) => {
 *       window.SailorBot.respond(reply);
 *     });
 *   });
 */
window.SailorBot = (() => {
  const handlers = {};
  return {
    on(event, cb) {
      if (!handlers[event]) handlers[event] = [];
      handlers[event].push(cb);
    },
    emit(event, data) {
      (handlers[event] || []).forEach(cb => cb(data));
    },
    respond(text) {
      appendBubble(text, 'bot');
    },
  };
})();

const chatToggle  = $('#chat-toggle');
const chatPanel   = $('#chat-panel');
const chatInput   = $('#chat-input');
const chatSend    = $('#chat-send');
const chatMessages = $('#chat-messages');

function appendBubble(text, who) {
  if (!chatMessages) return;
  const div = document.createElement('div');
  div.className = `chat-bubble ${who}`;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendChatMessage() {
  if (!chatInput) return;
  const text = chatInput.value.trim();
  if (!text) return;
  appendBubble(text, 'user');
  chatInput.value = '';
  window.SailorBot.emit('message', { text });
}

if (chatToggle) {
  chatToggle.addEventListener('click', () => {
    const open = chatPanel.classList.toggle('visible');
    chatToggle.classList.toggle('open', open);
    chatToggle.setAttribute('aria-expanded', open);
    if (open && chatInput) chatInput.focus();
  });
}

if (chatSend)  chatSend.addEventListener('click', sendChatMessage);
if (chatInput) chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendChatMessage(); });

/* ────────────────────────────────────────────
   BOUQUET QUIZ
   ──────────────────────────────────────────── */
const QUIZ = {
  steps: [
    {
      q: 'What's the occasion?',
      sub: 'Choose the one that fits best',
      opts: [
        { icon: '💌', label: 'Romance',      sub: 'Anniversary, date night' },
        { icon: '🎂', label: 'Celebration',  sub: 'Birthday, graduation'    },
        { icon: '🌿', label: 'Just because', sub: 'A spontaneous gift'       },
        { icon: '🕊️', label: 'Sympathy',     sub: 'Condolences, comfort'    },
      ],
    },
    {
      q: 'What's your vibe?',
      sub: 'Pick the feeling you want to send',
      opts: [
        { icon: '✨', label: 'Dreamy',       sub: 'Soft, ethereal, romantic' },
        { icon: '🌸', label: 'Joyful',       sub: 'Bright, fresh, playful'   },
        { icon: '🌿', label: 'Earthy',       sub: 'Natural, grounded, wild'  },
        { icon: '👑', label: 'Luxurious',    sub: 'Rich, lush, showstopping' },
      ],
    },
    {
      q: 'Favourite colour palette?',
      sub: 'What tones speak to you',
      opts: [
        { icon: '🤍', label: 'Ivory & sage', sub: 'Soft greens, creams'  },
        { icon: '🌹', label: 'Blush & rose', sub: 'Pinks, dusky roses'   },
        { icon: '💛', label: 'Gold & cream', sub: 'Warm, honeyed tones'  },
        { icon: '💜', label: 'Lavender',     sub: 'Lilac, misty purples' },
      ],
    },
  ],
  results: [
    {
      name: 'Garden Dream',
      desc: 'Full peonies, lily-of-the-valley, and soft sage greens — dreamy and elegant.',
      img:  'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&q=80',
      href: 'bouquet.html',
      price: '$65',
    },
    {
      name: 'Enchanted Rose',
      desc: 'Garden roses layered with eucalyptus and ivory blooms — timeless romance.',
      img:  'https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?w=400&q=80',
      href: 'bouquet.html',
      price: '$55',
    },
    {
      name: 'Wildflower Meadow',
      desc: 'A free-spirited mix of wild florals and lavender — joyful and untamed.',
      img:  'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?w=400&q=80',
      href: 'bouquet.html',
      price: '$48',
    },
    {
      name: 'Petal Whisper',
      desc: 'Mixed pink blooms with soft eucalyptus — gentle, expressive, heartfelt.',
      img:  'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&q=80',
      href: 'bouquet.html',
      price: '$60',
    },
  ],
};

let quizStep = 0;
let quizAnswers = [];
const quizModal = $('#quiz-modal');
const quizContent = $('#quiz-content');

function openQuiz() {
  if (!quizModal) return;
  quizStep = 0;
  quizAnswers = [];
  quizModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderQuizStep();
}

function closeQuiz() {
  if (!quizModal) return;
  quizModal.classList.remove('open');
  document.body.style.overflow = '';
}

function renderQuizStep() {
  if (!quizContent) return;

  if (quizStep >= QUIZ.steps.length) {
    renderQuizResult();
    return;
  }

  const step = QUIZ.steps[quizStep];
  const dots = QUIZ.steps.map((_, i) =>
    `<div class="quiz-dot${i < quizStep ? ' done' : ''}"></div>`
  ).join('');

  quizContent.innerHTML = `
    <p style="font-family:var(--font-script);font-size:22px;color:var(--rose);margin-bottom:4px;">
      Step ${quizStep + 1} of ${QUIZ.steps.length}
    </p>
    <h3 style="font-family:var(--font-display);font-size:30px;font-weight:500;margin-bottom:6px;">${step.q}</h3>
    <p style="font-size:13px;color:var(--muted);margin-bottom:24px;">${step.sub}</p>
    <div class="quiz-options">
      ${step.opts.map((opt, i) => `
        <button class="quiz-option" data-idx="${i}" onclick="quizSelect(${i})">
          <span class="quiz-option-icon">${opt.icon}</span>
          <span class="quiz-option-label">${opt.label}</span>
          <span class="quiz-option-sub">${opt.sub}</span>
        </button>
      `).join('')}
    </div>
    <div class="quiz-progress">${dots}</div>
  `;
}

function quizSelect(idx) {
  quizAnswers.push(idx);
  quizStep++;

  /* brief flash on selected */
  $$('.quiz-option').forEach(b => b.classList.remove('selected'));
  const picked = $(`.quiz-option[data-idx="${idx}"]`);
  if (picked) picked.classList.add('selected');

  setTimeout(() => { renderQuizStep(); }, 280);
}

function renderQuizResult() {
  /* simple match: sum of answers mod results length */
  const resultIdx = quizAnswers.reduce((a, b) => a + b, 0) % QUIZ.results.length;
  const r = QUIZ.results[resultIdx];

  quizContent.innerHTML = `
    <div class="quiz-result">
      <p style="font-family:var(--font-script);font-size:22px;color:var(--rose);margin-bottom:8px;">
        Your perfect match ✦
      </p>
      <img src="${r.img}" alt="${r.name}" class="quiz-result-img">
      <h3 class="quiz-result-name">${r.name}</h3>
      <p class="quiz-result-desc">${r.desc}</p>
      <p style="font-family:var(--font-display);font-size:28px;font-weight:600;margin-bottom:20px;">${r.price}</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a href="${r.href}" class="btn btn-primary">Shop this bouquet →</a>
        <button class="btn btn-ghost-sage" onclick="quizStep=0;quizAnswers=[];renderQuizStep()">Try again</button>
      </div>
    </div>
  `;
}

/* backdrop + close button */
const quizBackdrop = $('#quiz-backdrop');
const quizClose    = $('#quiz-close');
if (quizBackdrop) quizBackdrop.addEventListener('click', closeQuiz);
if (quizClose)    quizClose.addEventListener('click', closeQuiz);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuiz(); });

/* expose to HTML onclick attrs */
window.openQuiz  = openQuiz;
window.closeQuiz = closeQuiz;
window.quizSelect = quizSelect;

/* ────────────────────────────────────────────
   NEWSLETTER
   ──────────────────────────────────────────── */
window.handleNewsletter = function(e) {
  e.preventDefault();
  const form  = e.target;
  const input = form.querySelector('input[type="email"]');
  const btn   = form.querySelector('button[type="submit"]');
  if (!input || !btn) return;

  btn.textContent = '✓ You're in the garden!';
  btn.style.background = 'var(--sage-deep)';
  input.value = '';
  input.disabled = true;
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Subscribe ✦';
    btn.style.background = '';
    input.disabled = false;
    btn.disabled = false;
  }, 4000);
};

/* ────────────────────────────────────────────
   MOBILE NAV
   ──────────────────────────────────────────── */
const hamburger   = $('#nav-hamburger');
const mobileNav   = $('#mobile-nav');
const mobileClose = $('#mobile-nav-close');
const mobileBD    = $('#mobile-nav-backdrop');

function openMobileNav() {
  if (!mobileNav) return;
  mobileNav.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  if (hamburger) { hamburger.classList.add('open'); hamburger.setAttribute('aria-expanded', 'true'); }
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  if (!mobileNav) return;
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
  document.body.style.overflow = '';
}

if (hamburger)   hamburger.addEventListener('click', openMobileNav);
if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
if (mobileBD)    mobileBD.addEventListener('click', closeMobileNav);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileNav(); });
