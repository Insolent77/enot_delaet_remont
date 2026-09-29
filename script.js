const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealItems = [...document.querySelectorAll('.reveal')];

if (!reduceMotion && 'IntersectionObserver' in window) {
  revealItems.forEach((el, index) => {
    el.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 55}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add('is-visible'));
}

const header = document.querySelector('.site-header');
const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 40);
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const serviceData = {
  tile: {
    caption: 'Популярная переделка',
    title: 'Покраска плитки',
    description: 'Способ заметно освежить ванную без демонтажа старой плитки. В блоге — подготовка, материалы и весь процесс по шагам.',
    facts: ['Подготовка поверхности', 'Понятные материалы', 'Можно повторить самому'],
    image: 'https://images.unsplash.com/photo-1692890659058-03926b16b01c?auto=format&fit=crop&w=1400&q=82',
    alt: 'Обновлённая плитка в ванной'
  },
  boxes: {
    caption: 'Практичное решение',
    title: 'Съёмные короба',
    description: 'Закрывают трубы и коммуникации, но не перекрывают к ним доступ. Подходит для ванной, туалета и других небольших зон.',
    facts: ['Доступ к трубам сохраняется', 'Можно сделать по месту', 'Аккуратный внешний вид'],
    image: 'https://images.unsplash.com/photo-1721743169038-7fd6dade7d42?auto=format&fit=crop&w=1400&q=82',
    alt: 'Небольшая ванная с деревянной отделкой'
  },
  walls: {
    caption: 'Быстрое обновление',
    title: 'Покраска стен',
    description: 'Новый цвет и простая фактура могут полностью изменить комнату без сложного ремонта и больших затрат.',
    facts: ['Подбор подходящей краски', 'Подготовка без лишних этапов', 'Идеи для акцентных стен'],
    image: 'https://images.unsplash.com/photo-1597218868981-1b68e15f0065?auto=format&fit=crop&w=1400&q=82',
    alt: 'Окрашенная акцентная стена в интерьере'
  },
  baseboards: {
    caption: 'Мелочь, которая меняет вид',
    title: 'Обновление плинтусов',
    description: 'Покраска, подгонка и аккуратное восстановление старых плинтусов без полной замены по всей квартире.',
    facts: ['Без лишнего демонтажа', 'Ровные стыки и края', 'Подбор цвета под интерьер'],
    image: 'https://images.unsplash.com/photo-1597218868981-1b68e15f0065?auto=format&fit=crop&w=1400&q=82&crop=edges',
    alt: 'Интерьер с окрашенной стеной и плинтусом'
  },
  decor: {
    caption: 'Для атмосферы',
    title: 'Простой декор',
    description: 'Небольшие DIY-детали, фактурные поверхности и переделки, которые добавляют интерьеру характера без дорогих покупок.',
    facts: ['Простые материалы', 'Можно адаптировать под себя', 'Минимум инструментов'],
    image: 'https://images.unsplash.com/photo-1763485956350-1b7e230ad578?auto=format&fit=crop&w=1400&q=82',
    alt: 'Современный интерьер ванной с декоративной отделкой'
  }
};

const tabs = [...document.querySelectorAll('.service-tabs [role="tab"]')];
const panel = document.getElementById('service-panel');
const caption = document.getElementById('service-caption');
const title = document.getElementById('service-title');
const description = document.getElementById('service-description');
const fact1 = document.getElementById('service-fact-1');
const fact2 = document.getElementById('service-fact-2');
const fact3 = document.getElementById('service-fact-3');
const image = document.getElementById('service-image');
let switchTimer;

function renderService(key) {
  const data = serviceData[key];
  if (!data) return;

  clearTimeout(switchTimer);
  panel?.classList.add('is-switching');

  const updateContent = () => {
    if (caption) caption.textContent = data.caption;
    if (title) title.textContent = data.title;
    if (description) description.textContent = data.description;
    if (fact1) fact1.textContent = data.facts[0];
    if (fact2) fact2.textContent = data.facts[1];
    if (fact3) fact3.textContent = data.facts[2];
    if (image) {
      image.src = data.image;
      image.alt = data.alt;
    }
    panel?.classList.remove('is-switching');
  };

  if (reduceMotion) {
    updateContent();
  } else {
    switchTimer = window.setTimeout(updateContent, 130);
  }
}

function activateTab(tab) {
  tabs.forEach((item) => {
    const isActive = item === tab;
    item.classList.toggle('active', isActive);
    item.setAttribute('aria-selected', String(isActive));
    item.tabIndex = isActive ? 0 : -1;
  });
  renderService(tab.dataset.service);
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));

  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + direction + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    activateTab(tabs[nextIndex]);
  });
});

tabs.forEach((tab, index) => {
  tab.tabIndex = index === 0 ? 0 : -1;
});

const comparisonPhotos = [
  {
    selector: '.compare-card-left',
    before: 'https://www.bathroomremodelingplanotx.com/wp-content/uploads/2026/08/hf_20260802_020130_81b328b9-98d9-4c4b-a708-8baf97e5000f.webp',
    after: 'https://www.bathroomremodelingplanotx.com/wp-content/uploads/2026/08/hf_20260802_020838_7f208418-cf40-41a3-9d87-798722559734.webp',
    beforeAlt: 'Та же ванная до ремонта: старая плитка и деревянная тумба',
    afterAlt: 'Та же ванная после ремонта: светлая плитка и новая тумба',
    caption: 'Ванная · реальное до / после'
  },
  {
    selector: '.compare-card-right',
    before: 'https://www.bathroomremodelingplanotx.com/wp-content/uploads/2026/08/hf_20260802_020150_722313ab-edf9-4fbc-bb3c-924a61c71f64.webp',
    after: 'https://www.bathroomremodelingplanotx.com/wp-content/uploads/2026/08/hf_20260802_020903_707feb2e-8cef-40f5-bb41-5662b97f22fb.webp',
    beforeAlt: 'Та же душевая до ремонта: старая плитка и душевая кабина',
    afterAlt: 'Та же душевая после ремонта: новая плитка и стеклянные перегородки',
    caption: 'Душевая · реальное до / после'
  }
];

comparisonPhotos.forEach((item) => {
  const card = document.querySelector(item.selector);
  if (!card) return;

  const beforeImage = card.querySelector('.compare-base');
  const afterImage = card.querySelector('.compare-overlay img');
  const captionText = card.querySelector(':scope > p');

  if (beforeImage) {
    beforeImage.src = item.before;
    beforeImage.alt = item.beforeAlt;
  }

  if (afterImage) {
    afterImage.src = item.after;
    afterImage.alt = item.afterAlt;
  }

  if (captionText) captionText.textContent = item.caption;
});

const comparisons = [...document.querySelectorAll('[data-compare]')];
comparisons.forEach((comparison) => {
  const range = comparison.querySelector('.compare-range');
  const beforeLabel = comparison.querySelector('.compare-label-before');
  const afterLabel = comparison.querySelector('.compare-label-after');
  if (!range) return;

  const updateComparison = () => {
    const value = Math.max(0, Math.min(100, Number(range.value)));
    comparison.style.setProperty('--position', `${value}%`);

    // Слева раскрывается «После», справа остаётся «До».
    // Подпись скрывается, если соответствующей части почти не видно.
    afterLabel?.classList.toggle('is-hidden', value < 18);
    beforeLabel?.classList.toggle('is-hidden', value > 82);

    range.setAttribute('aria-valuetext', `${value}% изображения после ремонта, ${100 - value}% изображения до ремонта`);
  };

  range.addEventListener('input', updateComparison);
  range.addEventListener('change', updateComparison);
  updateComparison();
});
