/* ========================================================
   GYM SYSTEM — JAVASCRIPT
   Handles: scroll reveals, today highlight, mobile menu,
            table scroll hints, FULL language toggle, profile
   ======================================================== */

// ---- Full Arabic Translations ----
const translations = {
  // Nav
  navSchedule: 'الجدول', navPush: 'دفع', navPull: 'سحب', navLegs: 'أرجل',
  navTips: 'نصائح', navAdvLink: 'المتقدم ←', navBeginner: 'المبتدئ →',
  navAdvanced: 'المتقدم →', navBlocks: 'المراحل', navStrength: 'القوة',
  navHypertrophy: 'التضخم', navTechniques: 'التقنيات',

  // Beginner hero
  heroBadge: 'برنامج المبتدئين — الشهر 0 إلى 6',
  heroTitle1: 'نظام', heroTitle2: 'الجيم',
  heroSubtitle: 'دفع / سحب / أرجل — 5 حصص في الأسبوع — ساعة و30 دقيقة لكل حصة',

  // Stat labels (shared)
  sessionsWeek: 'حصص / أسبوع', minSession: 'دقيقة / حصة',
  setsExercise: 'مجموعات / تمرين', splitType: 'نوع التقسيم',
  viewSchedule: 'عرض الجدول',

  // Schedule
  weeklyTag: 'نظرة أسبوعية', scheduleTitle: 'جدول التدريب',
  scheduleDesc: 'خياران للتناوب — اختر ما يناسب أسبوعك. التقسيم يضمن تدريب كل مجموعة عضلية مرتين مع وقت كافٍ للتعافي.',

  // Workout headers
  workoutA: 'التمرين أ', workoutB: 'التمرين ب', workoutC: 'التمرين ج',
  pushTitle: 'يوم الدفع', pullTitle: 'يوم السحب', legsTitle: 'يوم الأرجل',
  pushTargets: 'يستهدف: الصدر، الأكتاف الأمامية والجانبية، الترايسبس',
  pullTargets: 'يستهدف: الظهر، البايسبس، الأكتاف الخلفية، الترابيز',
  legsTargets: 'يستهدف: الفخذ الأمامي، الفخذ الخلفي، المؤخرة، السمانة',

  // Tips section
  tipsTag: 'قاعدة المعرفة', tipsTitle: 'ملاحظات ونصائح عامة',
  tipsDesc: 'إرشادات أساسية لتدريبك — مهمة جداً كمبتدئ.',
  tip1Title: 'لا تتمرن حتى الفشل (الآن)',
  tip1Text: 'كمبتدئ، لا يجب أن تصل للفشل العضلي. بعد 4-5 أشهر من التدريب، يصبح الفشل ضرورياً للنمو.',
  tip2Title: 'التحميل التدريجي',
  tip2Text: 'ابدأ بأوزان مريحة وزدها تدريجياً. لا تبدأ بأوزان ثقيلة! مفاصلك وأوتارك تحتاج وقتاً للتكيف.',

  // Profile
  profileTag: 'ملف الرياضي', profileTitle: 'الإحصائيات الشخصية',
  ageLabel: 'العمر (سنة)', heightLabel: 'الطول (سم)',
  weightLabel: 'الوزن (كغ)', bmiLabel: 'مؤشر كتلة الجسم',
  bmiStatus: 'نطاق صحي ✓',

  // Timeline
  timelineTag: 'مسار التطور', timelineTitle: 'الجدول الزمني للبرنامج',
  timelineDesc: 'يجب أن يتطور تدريبك كلما أصبحت أقوى. إليك خارطة الطريق.',
  tl1Title: 'برنامج المبتدئين',
  tl1Text: 'تمرين 5 مرات/أسبوع · 3 مجموعات · 12→10→8 تكرارات · التركيز على تعلم الأداء الصحيح وبناء الاتصال العقلي العضلي. في عمر 21 وبطول 187سم ووزن 81كغ، أنت في وضع مثالي — هرمون التستوستيرون في ذروته. لا تتمرن حتى الفشل بعد. انتقل عندما لا تستطيع إضافة وزن كل أسبوع (عادة 4-6 أشهر).',
  tlYouAreHere: '← أنت هنا',
  tl2Title: 'البرنامج المتوسط',
  tl2Text: 'تمرين 6 مرات/أسبوع · 4 مجموعات للمركبات · تكرارات متدرجة (5-5-8-8) · إضافة الرفعة الميتة · التمرين حتى الفشل · تحميل تدريجي أسبوعي. انتقل هنا عندما يتوقف التقدم الخطي.',
  tlViewAdvanced: 'عرض البرنامج المتقدم ←',
  tl3Title: 'التدريب المتخصص',
  tl3Text: 'تقسيم دوري لمدة 12 أسبوع · مرحلة القوة (4 أسابيع) → مرحلة التضخم (6 أسابيع) → إراحة (أسبوعان) · تقنيات متقدمة (دروب سيت، ريست-بوز، ماي-ريبس) · تخصص نقاط الضعف.',
  tlViewSpec: 'عرض البرنامج المتخصص ←',

  // Advanced page
  advBadge: 'البرنامج المتقدم — بعد 6+ أشهر',
  advTitle1: 'البرنامج', advTitle2: 'المتقدم',
  advSubtitle: 'دفع / سحب / أرجل — 6 حصص في الأسبوع — حجم وشدة أعلى',
  advScheduleTitle: 'تقسيم 6 أيام',
  advScheduleDesc: 'كل مجموعة عضلية تُدرَّب مرتين في الأسبوع بحجم أعلى. يوم راحة واحد للتعافي.',
  diffTag: 'ما الذي تغيّر', diffTitle: 'مبتدئ → متقدم',
  diff1Title: '6 أيام بدل 5',
  diff1Text: 'كل مجموعة عضلية تُدرَّب مرتين في الأسبوع بتكرار كامل لتحفيز بناء البروتين العضلي.',
  diff2Title: '4 مجموعات للمركبات',
  diff2Text: 'التمارين المركبة الرئيسية تستخدم الآن 4 مجموعات بدل 3.',
  diff3Title: 'التمرين حتى الفشل',
  diff3Text: 'بعد 6+ أشهر، جسمك تكيّف. التمرين حتى الفشل أصبح ضرورياً للتقدم.',
  diff4Title: 'عمل القوة الثقيل',
  diff4Text: 'التمارين المركبة تبدأ بمجموعات ثقيلة (5 تكرارات) للقوة ثم تكرارات متوسطة للتضخم.',
  advPushTag: 'التمرين المتقدم أ', advPullTag: 'التمرين المتقدم ب',
  advLegsTag: 'التمرين المتقدم ج',

  // Specialized page
  specBadge: 'التدريب المتخصص — 18+ شهر',
  specTitle1: 'التدريب', specTitle2: 'المتخصص',
  specSubtitle: 'تقسيم دوري — 6 أيام/أسبوع — دورات القوة والتضخم',
  specWeekCycle: 'دورة أسبوعية', specPhases: 'مراحل التدريب',
  specOverviewTag: 'نظرة على التقسيم الدوري',
  specOverviewTitle: 'دورة تدريب 12 أسبوع',
  specOverviewDesc: 'بعد 18+ شهر، يتباطأ التقدم الخطي. جسمك يحتاج تنوعاً منظماً — التبديل بين مراحل القوة والتضخم والتعافي للاستمرار في التقدم.',
  specPhase: 'المرحلة',
  specBlock1Title: 'مرحلة القوة', specBlock1Dur: 'الأسابيع 1 – 4',
  specB1L1: 'تمارين مركبة ثقيلة (3-5 تكرارات)',
  specB1L2: '4-5 مجموعات لكل تمرين',
  specB1L3: 'راحة طويلة (3-5 دقائق)',
  specB1L4: 'شدة 8-9 من 10 (1-2 تكرار احتياطي)',
  specB1L5: 'تمارين عزل قليلة',
  specBlock2Title: 'مرحلة التضخم', specBlock2Dur: 'الأسابيع 5 – 10',
  specB2L1: 'أوزان معتدلة (8-12 تكرار)',
  specB2L2: '4 مجموعات، حجم أعلى',
  specB2L3: 'راحة 60-90 ثانية',
  specB2L4: 'تقنيات متقدمة (دروب سيت، ريست-بوز)',
  specB2L5: 'التمرين حتى الفشل في المجموعات الأخيرة',
  specBlock3Title: 'إراحة واختبار', specBlock3Dur: 'الأسابيع 11 – 12',
  specB3L1: 'تقليل الحجم بنسبة 50%',
  specB3L2: 'الحفاظ على شدة معتدلة (6-7 من 10)',
  specB3L3: 'اختبار أقصى وزن على التمارين الرئيسية',
  specB3L4: 'التركيز على التعافي والمرونة',
  specB3L5: 'ثم إعادة بدء الدورة',
  specStrPushTag: 'مرحلة القوة — دفع', specStrPushTitle: 'يوم الدفع (قوة)',
  specStrPushDesc: 'التركيز: مركبات ثقيلة للقوة القصوى. شدة 8-9.',
  specStrPullTag: 'مرحلة القوة — سحب', specStrPullTitle: 'يوم السحب (قوة)',
  specStrLegsTag: 'مرحلة القوة — أرجل', specStrLegsTitle: 'يوم الأرجل (قوة)',
  specHypTag: 'مرحلة التضخم — الأسابيع 5-10',
  specHypTitle: 'مرحلة التضخم',
  specHypDesc: 'حجم أعلى، أوزان معتدلة، تقنيات متقدمة. هذا هو المكان الذي يُبنى فيه حجم العضلات.',
  specHypPush: 'التضخم — دفع',
  specHypNote: 'أيام السحب والأرجل للتضخم تتبع نفس الهيكل — تكرارات أعلى (8-15)، 4 مجموعات، تقنيات متقدمة في المجموعات الأخيرة.',
  specTechTag: 'التقنيات المتقدمة', specTechTitle: 'تقنيات الشدة',
  specTechDesc: 'هذه التقنيات لمرحلة التضخم فقط. تدفع عضلاتك إلى ما بعد الفشل الطبيعي.',
  techDSTitle: 'دروب سيت (DS)',
  techDSText: 'اوصل للفشل، خفف الوزن 25-30% فوراً، واستمر للفشل مرة أخرى. مثال: بنش 80كغ × 8 ← فشل ← 60كغ × أقصى ← فشل ← 40كغ × أقصى.',
  techRPTitle: 'ريست-بوز (RP)',
  techRPText: 'اوصل للفشل، أرح الوزن، استرح 10-15 ثانية، ثم أعد أكبر عدد ممكن (عادة 2-4). كرر 1-2 مرة.',
  techMRTitle: 'ماي-ريبس (MR)',
  techMRText: 'قم بمجموعة تنشيط 12-20 تكرار قرب الفشل. استرح 5 ثوان، قم بمجموعات صغيرة 3-5 تكرارات بنفس الوزن مع 5 ثوان راحة.',
  techSSTitle: 'سوبرسيت',
  techSSText: 'نفذ تمرينين متتاليين بدون راحة. الأفضل للأزواج المتضادة (بايسبس/ترايسبس). يوفر الوقت ويزيد الضغط الأيضي.',
  specDeloadTitle: 'بروتوكول الإراحة (الأسبوع 11-12)',
  specDeloadDesc: 'التعافي هو حيث يحدث النمو. كل 10-12 أسبوع، خذ إراحة.',
  specDL1: 'الحجم', specDL1Desc: 'تقليل المجموعات بالنصف',
  specDL2: 'الشدة', specDL2Desc: 'الحفاظ على الوزن عند ~70%',
  specDL3: 'الجهد', specDL3Desc: 'أبقِ 4+ تكرارات احتياطية',

  // Table headers (shared)
  thExercise: 'التمرين', thSets: 'مجموعات', thReps: 'تكرارات',
  thTechnique: 'التقنية', thNotes: 'ملاحظات',

  // Footer
  footerText: 'جزء من نظام الحياة',
  footerCopy: 'الثبات يتغلب على الكمال. احضر كل يوم.',
  footBeginner: 'برنامج المبتدئين →', footAdvanced: 'البرنامج المتقدم',
  footHome: 'الصفحة الرئيسية',
};

const originals = {};
let isArabic = false;

document.addEventListener('DOMContentLoaded', () => {

  // ---- Profile Age Calculator ----
  const birthday = new Date(2004, 4, 30); // May 30, 2004
  const now = new Date();
  const ageEl = document.getElementById('profile-age');
  const bdayEl = document.getElementById('profile-birthday');

  if (ageEl) {
    let age = now.getFullYear() - birthday.getFullYear();
    const m = now.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthday.getDate())) age--;
    ageEl.textContent = age;
  }

  if (bdayEl) {
    let nextBday = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());
    if (nextBday <= now) nextBday.setFullYear(nextBday.getFullYear() + 1);
    const diffMs = nextBday - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;
    bdayEl.textContent = months > 0
      ? `${months}mo ${days}d until next birthday`
      : `${days} days until next birthday`;
  }

  // ---- Highlight Today ----
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const today = dayNames[now.getDay()];
  document.querySelectorAll('.day-card__day').forEach(el => {
    if (el.textContent.trim() === today) el.closest('.day-card').classList.add('day-card--today');
  });

  // ---- Scroll Reveal ----
  const revealEls = document.querySelectorAll(
    '.workout-header, .workout-note, .warmup-link, .table-wrapper, ' +
    '.tip-card, .rotation, .rep-explainer, .section__header, ' +
    '.profile-card, .timeline__item, .block-card'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => obs.observe(el));

  // Stagger animations
  document.querySelectorAll('.tip-card').forEach((c, i) => { c.style.transitionDelay = `${i * 0.08}s`; });
  document.querySelectorAll('.profile-card').forEach((c, i) => { c.style.transitionDelay = `${i * 0.1}s`; });
  document.querySelectorAll('.timeline__item').forEach((c, i) => { c.style.transitionDelay = `${i * 0.15}s`; });
  document.querySelectorAll('.block-card').forEach((c, i) => { c.style.transitionDelay = `${i * 0.12}s`; });

  // ---- Mobile Menu ----
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav__links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.classList.toggle('active');
    });
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => { navLinks.classList.remove('active'); menuBtn.classList.remove('active'); });
    });
  }

  // ---- Language Toggle (Full) ----
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    // Store ALL originals
    document.querySelectorAll('[data-i18n]').forEach(el => {
      originals[el.getAttribute('data-i18n')] = el.innerHTML;
    });

    langBtn.addEventListener('click', () => {
      isArabic = !isArabic;
      if (isArabic) {
        document.body.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
        langBtn.innerHTML = '<span>English</span>';
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (translations[key]) el.textContent = translations[key];
        });
      } else {
        document.body.removeAttribute('dir');
        document.documentElement.setAttribute('lang', 'en');
        langBtn.innerHTML = '<span class="lang-btn__en">عربي</span>';
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (originals[key]) el.innerHTML = originals[key];
        });
      }
    });
  }

  // ---- Table Scroll Hint ----
  document.querySelectorAll('.table-wrapper').forEach(w => {
    const check = () => {
      const scrollable = w.scrollWidth > w.clientWidth;
      const notEnd = w.scrollLeft + w.clientWidth < w.scrollWidth - 2;
      w.classList.toggle('scrollable', scrollable && notEnd);
    };
    check(); w.addEventListener('scroll', check); window.addEventListener('resize', check);
  });

  // ---- Smooth Scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ---- Active Nav ----
  const sections = document.querySelectorAll('.section, .hero');
  const allNavLinks = document.querySelectorAll('.nav__link');
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute('id');
        allNavLinks.forEach(l => l.classList.toggle('nav__link--active', l.getAttribute('href') === `#${id}`));
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => { if (s.id) navObs.observe(s); });

  // ---- Row Hover ----
  document.querySelectorAll('.exercise-table tbody tr').forEach(r => {
    r.addEventListener('mouseenter', () => { r.style.transform = 'scale(1.005)'; });
    r.addEventListener('mouseleave', () => { r.style.transform = ''; });
  });
});
