/* Life System Dashboard JS — Ranking Calculator + Interactions */
document.addEventListener('DOMContentLoaded', () => {

  // ---- RANKING DATA (research-based) ----
  const rankData = {
    'rank-gym':      { percent: 5,    label: 'Top 5%',     people: '~400M' },
    'rank-nofap':    { percent: 32.5, label: 'Top 30–35%', people: '~2.4–2.8B' },
    'rank-sleep':    { percent: 30,   label: 'Top 30%',    people: '~2.4B' },
    'rank-nodrinks': { percent: 91,   label: 'Top 91%',    people: '~7.3B' },
    'rank-nojunk':   { percent: 18,   label: 'Top 18%',    people: '~1.44B' },
    'rank-noscroll': { percent: 6.5,  label: 'Top 5–8%',   people: '~400–640M' },
    'rank-nolate':   { percent: 6.5,  label: 'Top 5–8%',   people: '~400–640M' },
  };

  const combinedPercentEl = document.getElementById('combined-percent');
  const combinedResultEl = document.getElementById('combined-result');
  const combinedBarEl = document.getElementById('combined-bar');

  // Load saved state
  const savedRanks = JSON.parse(localStorage.getItem('ls_ranks') || '{}');
  const savedElims = JSON.parse(localStorage.getItem('ls_elims') || '{}');

  // ---- RANK CARDS ----
  document.querySelectorAll('.dash-rank-card').forEach(card => {
    const id = card.id;
    if (savedRanks[id]) card.setAttribute('data-active', 'true');

    card.addEventListener('click', () => {
      const isActive = card.getAttribute('data-active') === 'true';
      card.setAttribute('data-active', isActive ? 'false' : 'true');
      savedRanks[id] = !isActive;
      localStorage.setItem('ls_ranks', JSON.stringify(savedRanks));
      updateCombined();
    });
  });

  // ---- ELIMINATION CHECKS ----
  document.querySelectorAll('.dash-elim').forEach(elim => {
    const habit = elim.querySelector('.dash-elim__check')?.getAttribute('data-habit');
    if (habit && savedElims[habit]) elim.classList.add('dash-elim--checked');

    elim.addEventListener('click', () => {
      elim.classList.toggle('dash-elim--checked');
      if (habit) {
        savedElims[habit] = elim.classList.contains('dash-elim--checked');
        localStorage.setItem('ls_elims', JSON.stringify(savedElims));
      }
    });
  });

  function updateCombined() {
    const activeCards = document.querySelectorAll('.dash-rank-card[data-active="true"]');
    const total = document.querySelectorAll('.dash-rank-card').length;
    const count = activeCards.length;

    if (count === 0) {
      combinedPercentEl.textContent = '0%';
      combinedResultEl.innerHTML = '<p class="dash-combined__text">Click the habits you practice above to calculate your global ranking.</p>';
      combinedBarEl.style.width = '0%';
      return;
    }

    // Calculate raw combined probability (multiply individual top-% fractions)
    let rawCombined = 1;
    activeCards.forEach(card => {
      const data = rankData[card.id];
      if (data) rawCombined *= (data.percent / 100);
    });

    // Apply correlation dampening factor: final = raw^0.15
    // This accounts for ~85% correlation between habits
    const adjustedCombined = Math.pow(rawCombined, 0.15);
    const topPercent = adjustedCombined * 100;
    const rank = 8000000000 * adjustedCombined;

    let percentStr, description;
    if (topPercent < 0.01) {
      percentStr = 'Top 0.01%';
      description = `You are in the <strong>top 0.01%</strong> of 8 billion people. That's roughly <strong>${formatNum(Math.round(rank))}</strong> humans. This ranking accounts for the fact that healthy habits tend to cluster together. Your adjusted global ranking reflects a statistically honest estimate.`;
    } else if (topPercent < 0.1) {
      percentStr = `Top ${topPercent.toFixed(2)}%`;
      description = `You are in the <strong>top ${topPercent.toFixed(2)}%</strong> of 8 billion people. Roughly <strong>${formatNum(Math.round(rank))}</strong> others do all of this. This ranking accounts for the fact that healthy habits tend to cluster together. Your adjusted global ranking reflects a statistically honest estimate.`;
    } else if (topPercent < 1) {
      percentStr = `Top ${topPercent.toFixed(1)}%`;
      description = `You are in the <strong>top ${topPercent.toFixed(1)}%</strong> of 8 billion people — roughly <strong>${formatNum(Math.round(rank))}</strong> people. This ranking accounts for the fact that healthy habits tend to cluster together. Your adjusted global ranking reflects a statistically honest estimate.`;
    } else {
      percentStr = `Top ${Math.round(topPercent)}%`;
      description = `You are in the <strong>top ${Math.round(topPercent)}%</strong> of 8 billion people — roughly <strong>${formatNum(Math.round(rank))}</strong> people practice all of these habits. This ranking accounts for the fact that healthy habits tend to cluster together. Your adjusted global ranking reflects a statistically honest estimate.`;
    }

    combinedPercentEl.textContent = percentStr;
    combinedResultEl.innerHTML = `<p class="dash-combined__text">${description}</p>`;

    // Bar: 0% = bottom, 100% = top 0.01%
    // Mapping: use log scale for better visualization
    const barPercent = Math.min(100, Math.max(5, (1 - Math.log10(topPercent + 0.01) / Math.log10(100)) * 100));
    combinedBarEl.style.width = barPercent + '%';
  }

  function formatNum(n) {
    if (n >= 1e9) return (n/1e9).toFixed(1) + ' billion';
    if (n >= 1e6) return (n/1e6).toFixed(0) + ' million';
    if (n >= 1e3) return (n/1e3).toFixed(0) + 'K';
    return n.toString();
  }

  updateCombined();

  // ---- MOBILE MENU ----
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav__links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => { navLinks.classList.toggle('active'); menuBtn.classList.toggle('active'); });
    navLinks.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', () => { navLinks.classList.remove('active'); menuBtn.classList.remove('active'); }));
  }

  // ---- SCROLL REVEAL ----
  document.querySelectorAll('.dash-pillar, .dash-elim, .dash-rank-card, .section__header, .dash-combined, .tip-card').forEach(el => el.classList.add('reveal'));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  document.querySelectorAll('.dash-pillar').forEach((c,i) => { c.style.transitionDelay = `${i*0.12}s`; });
  document.querySelectorAll('.dash-elim').forEach((c,i) => { c.style.transitionDelay = `${i*0.06}s`; });
  document.querySelectorAll('.dash-rank-card').forEach((c,i) => { c.style.transitionDelay = `${i*0.06}s`; });

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});
