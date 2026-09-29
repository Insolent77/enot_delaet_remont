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

const PHOTO_ATLAS = 'assets/enot-works.webp';
const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
const photoPositions = {
  bathAfter: '0% 0%',
  bathBefore: '50% 0%',
  boxAfter: '100% 0%',
  boxBefore: '0% 100%',
  cabinet: '50% 100%',
  towel: '100% 100%'
};

function applyAtlasPhoto(img, position, alt = '') {
  if (!img) return;
  img.src = TRANSPARENT_PIXEL;
  img.alt = alt;
  img.style.backgroundImage = `url("${PHOTO_ATLAS}")`;
  img.style.backgroundSize = '300% auto';
  img.style.backgroundPosition = position;
  img.style.backgroundRepeat = 'no-repeat';
  img.style.backgroundColor = '#deded9';
}

const heroImage = document.querySelector('.hero-bg');
if (heroImage) {
  heroImage.src = 'assets/enot-hero.webp';
  heroImage.alt = 'Обновлённая ванная из работ Енота';
}

const serviceData = {
  tile: {
    caption: 'Популярная переделка',
    title: 'Покраска плитки',
    description: 'Способ заметно освежить ванную без демонтажа старой плитки. В блоге — подготовка, материалы и весь процесс по шагам.',
    facts: ['Подготовка поверхности', 'Понятные материалы', 'Можно повторить самому'],
    photo: photoPositions.bathAfter,
    alt: 'Плитка после покраски в ванной Енота'
  },
  boxes: {
    caption: 'Практичное решение',
    title: 'Съёмные короба',
    description: 'Закрывают трубы и коммуникации, но не перекрывают к ним доступ. Подходит для ванной, туалета и других небольших зон.',
    facts: ['Доступ к трубам сохраняется', 'Можно сделать по месту', 'Аккуратный внешний вид'],
    photo: photoPositions.boxAfter,
    alt: 'Съёмный короб для труб в ванной Енота'
  },
  walls: {
    caption: 'Быстрое обновление',
    title: 'Покраска стен',
    description: 'Новый цвет и простая фактура могут полностью изменить комнату без сложного ремонта и больших затрат.',
    facts: ['Подбор подходящей краски', 'Подготовка без лишних этапов', 'Идеи для акцентных стен'],
    photo: photoPositions.cabinet,
    alt: 'Светлая стена и переделанная ТВ-тумба из работ Енота'
  },
  baseboards: {
    caption: 'Мелочь, которая меняет вид',
    title: 'Обновление плинтусов',
    description: 'Покраска, подгонка и аккуратное восстановление старых плинтусов без полной замены по всей квартире.',
    facts: ['Без лишнего демонтажа', 'Ровные стыки и края', 'Подбор цвета под интерьер'],
    photo: photoPositions.cabinet,
    alt: 'Готовый интерьер после небольшой переделки Енота'
  },
  decor: {
    caption: 'Для атмосферы',
    title: 'Простой декор',
    description: 'Небольшие DIY-детали, фактурные поверхности и переделки, которые добавляют интерьеру характера без дорогих покупок.',
    facts: ['Простые материалы', 'Можно адаптировать под себя', 'Минимум инструментов'],
    photo: photoPositions.towel,
    alt: 'Полотенцесушитель и плитка из работ Енота'
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
const serviceImageWrap = document.querySelector('.service-image-wrap');
let switchTimer;

function normalizeServiceImageSize() {
  if (!image) return;

  let imageHeight = 426;
  if (window.innerWidth <= 720) imageHeight = 300;
  else if (window.innerWidth <= 980) imageHeight = 380;

  image.style.width = '100%';
  image.style.height = `${imageHeight}px`;
  image.style.minHeight = `${imageHeight}px`;
  image.style.maxHeight = `${imageHeight}px`;
  image.style.objectFit = 'cover';

  if (serviceImageWrap) serviceImageWrap.style.minHeight = '0';
}

normalizeServiceImageSize();
window.addEventListener('resize', normalizeServiceImageSize, { passive: true });

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
    applyAtlasPhoto(image, data.photo, data.alt);
    normalizeServiceImageSize();
    panel?.classList.remove('is-switching');
  };

  if (reduceMotion) updateContent();
  else switchTimer = window.setTimeout(updateContent, 130);
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
renderService('tile');

const comparisonPhotos = [
  {
    selector: '.compare-card-left',
    before: photoPositions.bathBefore,
    after: photoPositions.bathAfter,
    beforeAlt: 'Ванная Енота до покраски плитки',
    afterAlt: 'Та же ванная Енота после покраски плитки',
    caption: 'Покраска плитки · до / после'
  },
  {
    selector: '.compare-card-right',
    before: photoPositions.boxBefore,
    after: photoPositions.boxAfter,
    beforeAlt: 'Трубы рядом с раковиной до установки короба',
    afterAlt: 'Те же трубы после установки съёмного короба',
    caption: 'Короб для труб · до / после'
  }
];

comparisonPhotos.forEach((item) => {
  const card = document.querySelector(item.selector);
  if (!card) return;

  const beforeImage = card.querySelector('.compare-base');
  const afterImage = card.querySelector('.compare-overlay img');
  const captionText = card.querySelector(':scope > p');

  applyAtlasPhoto(beforeImage, item.before, item.beforeAlt);
  applyAtlasPhoto(afterImage, item.after, item.afterAlt);
  if (captionText) captionText.textContent = item.caption;
});

const caseImages = document.querySelectorAll('.case-card img');
applyAtlasPhoto(caseImages[0], photoPositions.bathAfter, 'Покрашенная плитка в ванной Енота');
applyAtlasPhoto(caseImages[1], photoPositions.boxAfter, 'Съёмный короб для труб Енота');
applyAtlasPhoto(caseImages[2], photoPositions.cabinet, 'Переделанная ТВ-тумба и стена Енота');

const benefitImages = document.querySelectorAll('.benefit-image-card img');
applyAtlasPhoto(benefitImages[0], photoPositions.towel, 'Полотенцесушитель из работ Енота');
applyAtlasPhoto(benefitImages[1], photoPositions.bathAfter, 'Готовая ванная после переделки Енота');

const materialImages = document.querySelectorAll('.material-thumbs img');
applyAtlasPhoto(materialImages[0], photoPositions.bathAfter, 'Крашеная плитка');
applyAtlasPhoto(materialImages[1], photoPositions.boxAfter, 'Деревянный короб');
applyAtlasPhoto(materialImages[2], photoPositions.cabinet, 'Переделанная ТВ-тумба');

const comparisons = [...document.querySelectorAll('[data-compare]')];
comparisons.forEach((comparison) => {
  const range = comparison.querySelector('.compare-range');
  const beforeLabel = comparison.querySelector('.compare-label-before');
  const afterLabel = comparison.querySelector('.compare-label-after');
  if (!range) return;

  const updateComparison = () => {
    const value = Math.max(0, Math.min(100, Number(range.value)));
    comparison.style.setProperty('--position', `${value}%`);

    afterLabel?.classList.toggle('is-hidden', value < 18);
    beforeLabel?.classList.toggle('is-hidden', value > 82);

    range.setAttribute('aria-valuetext', `${value}% изображения после ремонта, ${100 - value}% изображения до ремонта`);
  };

  range.addEventListener('input', updateComparison);
  range.addEventListener('change', updateComparison);
  updateComparison();
});
