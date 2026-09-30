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
  "tile": {
    "caption": "Ванная",
    "title": "Покраска плитки",
    "description": "Бежевую плитку перекрасили в светлый цвет, оставив её на месте. В блоге рассказываю, как подготовить поверхность и чем красить.",
    "facts": [
      "Очистка и подготовка плитки",
      "Выбор грунта и краски",
      "Покраска и уход за покрытием"
    ],
    "image": "assets/photos/bath-after-restored.webp",
    "alt": "Светлая плитка после покраски в ванной"
  },
  "boxes": {
    "caption": "Трубы в ванной",
    "title": "Съёмный короб",
    "description": "Трубы рядом с раковиной закрыли коробом с отделкой под дерево. Он снимается, когда нужен доступ к соединениям и счётчикам.",
    "facts": [
      "Замеры у раковины",
      "Сборка короба по размеру",
      "Доступ к трубам и счётчикам"
    ],
    "image": "assets/photos/bath-after-restored.webp",
    "alt": "Короб под дерево слева от раковины"
  },
  "furniture": {
    "caption": "Гостиная",
    "title": "Переделка тумбы",
    "description": "У тумбы оставили чёрные фасады, а столешницу и боковины оформили под дерево. На фото — результат в комнате.",
    "facts": [
      "Чёрные фасады",
      "Столешница под дерево",
      "Отделка боковин"
    ],
    "image": "assets/photos/tv-console-restored.webp",
    "alt": "Тумба под телевизор с чёрными фасадами и отделкой под дерево"
  },
  "bathroom": {
    "caption": "Детали переделки",
    "title": "Обновление ванной",
    "description": "Кроме плитки, в ванной поменялись тумба, зеркало и душевая стойка. На фото можно рассмотреть, как они сочетаются между собой.",
    "facts": [
      "Тумба с раковиной",
      "Зеркало с подсветкой",
      "Чёрная душевая стойка"
    ],
    "image": "assets/photos/bath-after-restored.webp",
    "alt": "Новая тумба, зеркало с подсветкой и душевая стойка в ванной"
  },
  "decor": {
    "caption": "Гостиная",
    "title": "Детали в комнате",
    "description": "Ваза с сухоцветами, чёрный торшер и тумба с отделкой под дерево. Несколько деталей, которые я собрал вместе в этой комнате.",
    "facts": [
      "Ваза с сухоцветами",
      "Чёрный торшер",
      "Дерево и чёрные фасады"
    ],
    "image": "assets/photos/tv-console-restored.webp",
    "alt": "Ваза с сухоцветами на тумбе и чёрный торшер рядом"
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
  image.style.objectFit = 'contain';

  if (serviceImageWrap) {
    serviceImageWrap.style.minHeight = '0';
  }
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
    if (image) {
      image.src = data.image;
      image.alt = data.alt;
    }
    normalizeServiceImageSize();
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

const comparisons = [...document.querySelectorAll('[data-compare]')];
comparisons.forEach((comparison) => {
  const range = comparison.querySelector('.compare-range');
  const beforeLabel = comparison.querySelector('.compare-label-before');
  const afterLabel = comparison.querySelector('.compare-label-after');
  if (!range) return;

  const updateComparison = () => {
    const value = Math.max(0, Math.min(100, Number(range.value)));
    comparison.style.setProperty('--position', `${value}%`);

    // «После» находится в раскрываемой левой части, «До» — в правой.
    // Подпись показываем только когда её версия действительно видна.
    afterLabel?.classList.toggle('is-hidden', value < 18);
    beforeLabel?.classList.toggle('is-hidden', value > 82);

    range.setAttribute('aria-valuetext', `${value}% изображения после ремонта, ${100 - value}% изображения до ремонта`);
  };

  range.addEventListener('input', updateComparison);
  range.addEventListener('change', updateComparison);
  updateComparison();
});
