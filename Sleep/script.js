/* Sleep System JS — Live Clock + Status */
document.addEventListener('DOMContentLoaded', () => {
  const clockEl = document.getElementById('sleep-clock');
  const statusEl = document.getElementById('sleep-status');
  const barEl = document.getElementById('sleep-bar');

  function updateClock() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    clockEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

    const totalMin = h * 60 + m;
    const bedtime = 21 * 60 + 30; // 21:30
    const wakeup = 6 * 60 + 30;   // 06:30
    const windDown = 20 * 60;      // 20:00

    statusEl.classList.remove('sleep-clock__status--sleep','sleep-clock__status--awake','sleep-clock__status--wind');

    if (totalMin >= bedtime || totalMin < wakeup) {
      statusEl.textContent = '😴 SLEEP TIME — You should be in bed';
      statusEl.classList.add('sleep-clock__status--sleep');
      // Progress through night
      let elapsed;
      if (totalMin >= bedtime) elapsed = totalMin - bedtime;
      else elapsed = (24 * 60 - bedtime) + totalMin;
      const total = (24 * 60 - bedtime) + wakeup; // total sleep window
      barEl.style.width = Math.min((elapsed / total) * 100, 100) + '%';
    } else if (totalMin >= windDown && totalMin < bedtime) {
      statusEl.textContent = '🌅 WIND DOWN — No screens, dim lights';
      statusEl.classList.add('sleep-clock__status--wind');
      const elapsed = totalMin - windDown;
      const total = bedtime - windDown;
      barEl.style.width = Math.min((elapsed / total) * 100, 100) + '%';
    } else {
      statusEl.textContent = '☀️ AWAKE — Make the most of your day';
      statusEl.classList.add('sleep-clock__status--awake');
      const elapsed = totalMin - wakeup;
      const total = windDown - wakeup;
      barEl.style.width = Math.min((elapsed / total) * 100, 100) + '%';
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  // Mobile menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav__links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => { navLinks.classList.toggle('active'); menuBtn.classList.toggle('active'); });
    navLinks.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', () => { navLinks.classList.remove('active'); menuBtn.classList.remove('active'); }));
  }

  // Scroll reveal
  document.querySelectorAll('.tip-card, .section__header, .sleep-routine__item, .workout-note').forEach(el => el.classList.add('reveal'));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  document.querySelectorAll('.tip-card').forEach((c,i) => { c.style.transitionDelay = `${i*0.08}s`; });
  document.querySelectorAll('.sleep-routine__item').forEach((c,i) => { c.style.transitionDelay = `${i*0.1}s`; });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});
