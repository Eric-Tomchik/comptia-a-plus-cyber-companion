/* ============================================================
   CompTIA A+ Cyber Study Guide — Online Companion
   Interactive features
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initNavActive();
  initFadeIn();
  initGlossary();
  initFlashcards();
  initQuiz();
});

/* --- Mobile Nav -------------------------------------------- */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

/* --- Active Nav Link --------------------------------------- */
function initNavActive() {
  const path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
    if (path.endsWith(href) || (href !== '/' && href !== '.' && path.includes(href))) {
      a.classList.add('active');
    }
  });
}

/* --- Scroll Fade In ---------------------------------------- */
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
}

/* --- Glossary Search --------------------------------------- */
function initGlossary() {
  const input = document.querySelector('.glossary-search');
  const items = document.querySelectorAll('.glossary-item');
  const count = document.querySelector('.glossary-count');
  if (!input || !items.length) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    let shown = 0;
    items.forEach(item => {
      const term = item.querySelector('.glossary-term').textContent.toLowerCase();
      const def = item.querySelector('.glossary-def').textContent.toLowerCase();
      const match = !q || term.includes(q) || def.includes(q);
      item.style.display = match ? '' : 'none';
      if (match) shown++;
    });
    if (count) count.textContent = `Showing ${shown} of ${items.length} terms`;
  });
}

/* --- Flashcards -------------------------------------------- */
function initFlashcards() {
  const container = document.querySelector('.flashcard-container');
  if (!container) return;

  const flashcard = container.querySelector('.flashcard');
  const frontTerm = container.querySelector('.fc-term');
  const backDef = container.querySelector('.fc-def');
  const counter = container.querySelector('.flashcard-counter');
  const prevBtn = container.querySelector('.fc-prev');
  const nextBtn = container.querySelector('.fc-next');
  const shuffleBtn = container.querySelector('.fc-shuffle');

  if (!window.FLASHCARD_DATA || !window.FLASHCARD_DATA.length) return;

  let cards = [...window.FLASHCARD_DATA];
  let idx = 0;

  function render() {
    flashcard.classList.remove('flipped');
    setTimeout(() => {
      frontTerm.textContent = cards[idx].term;
      backDef.textContent = cards[idx].def;
      counter.textContent = `${idx + 1} / ${cards.length}`;
    }, 150);
  }

  flashcard.addEventListener('click', () => flashcard.classList.toggle('flipped'));
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); idx = (idx - 1 + cards.length) % cards.length; render(); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); idx = (idx + 1) % cards.length; render(); });
  shuffleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    idx = 0;
    render();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft') { idx = (idx - 1 + cards.length) % cards.length; render(); }
    if (e.key === 'ArrowRight') { idx = (idx + 1) % cards.length; render(); }
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flashcard.classList.toggle('flipped'); }
  });

  render();
}

/* --- Quiz -------------------------------------------------- */
function initQuiz() {
  const quizContainer = document.querySelector('.quiz-container');
  if (!quizContainer || !window.QUIZ_DATA || !window.QUIZ_DATA.length) return;

  const submitBtn = document.querySelector('.quiz-submit');
  const resetBtn = document.querySelector('.quiz-reset');
  const progressBar = document.querySelector('.quiz-progress-bar');
  const scoreBox = document.querySelector('.quiz-score');
  const scoreNum = document.querySelector('.score-num');
  const scoreMsg = document.querySelector('.score-msg');
  let answered = 0;
  const total = window.QUIZ_DATA.length;

  // Render questions
  window.QUIZ_DATA.forEach((q, qi) => {
    const div = document.createElement('div');
    div.className = 'quiz-question';
    div.innerHTML = `
      <h3><span class="quiz-q-num">Q${qi + 1}.</span> ${q.question}</h3>
      <div class="quiz-options" data-qi="${qi}">
        ${q.options.map((opt, oi) => `
          <label>
            <input type="radio" name="q${qi}" value="${oi}">
            ${opt}
          </label>
        `).join('')}
      </div>
      <div class="quiz-explanation" id="exp-${qi}">${q.explanation}</div>
    `;
    quizContainer.appendChild(div);
  });

  // Track answers
  quizContainer.addEventListener('change', (e) => {
    if (e.target.type !== 'radio') return;
    const qi = parseInt(e.target.closest('.quiz-options').dataset.qi);
    const selected = parseInt(e.target.value);
    const q = window.QUIZ_DATA[qi];
    const labels = e.target.closest('.quiz-options').querySelectorAll('label');

    // Disable all in this question
    labels.forEach((l, i) => {
      l.querySelector('input').disabled = true;
      if (i === q.correct) l.classList.add('correct');
      if (i === selected && selected !== q.correct) l.classList.add('incorrect');
    });

    document.getElementById(`exp-${qi}`).classList.add('show');
    answered++;
    if (progressBar) progressBar.style.width = `${(answered / total) * 100}%`;

    if (answered === total && submitBtn) submitBtn.click();
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      let correct = 0;
      window.QUIZ_DATA.forEach((q, qi) => {
        const sel = document.querySelector(`input[name="q${qi}"]:checked`);
        if (sel && parseInt(sel.value) === q.correct) correct++;
      });
      const pct = Math.round((correct / total) * 100);
      if (scoreNum) scoreNum.textContent = `${correct}/${total}`;
      if (scoreMsg) scoreMsg.textContent = pct >= 80 ? '🎉 Excellent! You\'re well-prepared.' : pct >= 60 ? '👍 Good effort — review the explanations for topics you missed.' : '📖 Keep studying — revisit the chapters and try again.';
      if (scoreBox) scoreBox.classList.remove('hidden');
      scoreBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      answered = 0;
      if (progressBar) progressBar.style.width = '0%';
      if (scoreBox) scoreBox.classList.add('hidden');
      quizContainer.querySelectorAll('.quiz-question').forEach(q => q.remove());
      initQuiz();
    });
  }
}
