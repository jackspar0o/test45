/* NoFap Counter Logic — Hardcoded start date */
document.addEventListener('DOMContentLoaded', () => {
  const daysEl = document.getElementById('nf-days');
  const ringEl = document.getElementById('nf-ring');
  const startDateEl = document.getElementById('nf-start-date');
  const streakEl = document.getElementById('nf-streak');
  const milestoneEl = document.getElementById('nf-milestone');
  const nextEl = document.getElementById('nf-next');

  // HARDCODED START DATE
  const START_DATE = new Date('2026-04-19T17:21:00');
  const MILESTONES = [7, 14, 30, 60, 90, 180, 365];
  const RING_CIRCUMFERENCE = 2 * Math.PI * 90; // 565.48

  function getDaysBetween(start, end) {
    return Math.floor((end - start) / (1000 * 60 * 60 * 24));
  }

  function getHoursBetween(start, end) {
    return Math.floor((end - start) / (1000 * 60 * 60));
  }

  function getCurrentMilestone(days) {
    let current = null;
    for (const m of MILESTONES) {
      if (days >= m) current = m;
    }
    return current;
  }

  function getNextMilestone(days) {
    for (const m of MILESTONES) {
      if (days < m) return m;
    }
    return null;
  }

  function formatMilestone(d) {
    if (d === 7) return '1 Week';
    if (d === 14) return '2 Weeks';
    if (d === 30) return '1 Month';
    if (d === 60) return '2 Months';
    if (d === 90) return '90 Days (Reboot)';
    if (d === 180) return '6 Months';
    if (d === 365) return '1 Year';
    return d + ' Days';
  }

  function animateNumber(el, target) {
    const duration = 1200;
    const start = parseInt(el.textContent) || 0;
    const diff = target - start;
    if (diff === 0) { el.textContent = target; return; }
    const startTime = performance.now();
    function step(t) {
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + diff * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function updateUI() {
    const now = new Date();
    const days = getDaysBetween(START_DATE, now);
    const hours = getHoursBetween(START_DATE, now);

    // Counter
    animateNumber(daysEl, days);

    // Ring progress (90 days = full ring)
    const progress = Math.min(days / 90, 1);
    ringEl.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress);

    // Start date
    startDateEl.textContent = START_DATE.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    // Streak
    if (days === 0) {
      streakEl.textContent = hours + ' hours';
    } else if (days < 30) {
      const remainingHrs = hours % 24;
      streakEl.textContent = days + 'd ' + remainingHrs + 'h';
    } else {
      const months = Math.floor(days / 30);
      const remaining = days % 30;
      streakEl.textContent = months + 'mo ' + remaining + 'd';
    }

    // Current milestone
    const cm = getCurrentMilestone(days);
    milestoneEl.textContent = cm ? '✓ ' + formatMilestone(cm) : 'Day ' + days + ' — Keep going!';

    // Next milestone
    const nm = getNextMilestone(days);
    if (nm) {
      const daysLeft = nm - days;
      nextEl.textContent = formatMilestone(nm) + ' (' + daysLeft + 'd left)';
    } else {
      nextEl.textContent = 'All milestones reached! 🏆';
    }

    // Highlight reached milestones
    document.querySelectorAll('.nf-mile').forEach(m => {
      const mDays = parseInt(m.getAttribute('data-days'));
      m.classList.toggle('nf-mile--reached', days >= mDays);
    });
  }

  updateUI();
  // Update every minute
  setInterval(updateUI, 60000);

  // Mobile menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav__links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => { navLinks.classList.toggle('active'); menuBtn.classList.toggle('active'); });
    navLinks.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', () => { navLinks.classList.remove('active'); menuBtn.classList.remove('active'); }));
  }

  // Scroll reveal
  document.querySelectorAll('.tip-card, .nf-science-card, .nf-mile, .section__header, .workout-note').forEach(el => el.classList.add('reveal'));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  document.querySelectorAll('.tip-card').forEach((c,i) => { c.style.transitionDelay = `${i*0.08}s`; });
  document.querySelectorAll('.nf-science-card').forEach((c,i) => { c.style.transitionDelay = `${i*0.1}s`; });
  document.querySelectorAll('.nf-mile').forEach((c,i) => { c.style.transitionDelay = `${i*0.06}s`; });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});
