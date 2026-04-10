const features = document.querySelectorAll('[data-feature]');
let highlightIndex = 0;
let featureTimer;

const menuToggle = document.querySelector('[data-menu-toggle]');
const siteNav = document.querySelector('[data-site-nav]');

const setMenuState = (isOpen) => {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.setAttribute('aria-expanded', String(isOpen));
  siteNav.classList.toggle('is-open', isOpen);
};

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  setMenuState(!isOpen);
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      setMenuState(false);
    }
  });
});

const highlightFeature = (index) => {
  features.forEach((feature, idx) => {
    feature.classList.toggle('active', idx === index);
  });
};

const cycleFeatures = () => {
  if (!features.length) {
    return;
  }
  highlightIndex = (highlightIndex + 1) % features.length;
  highlightFeature(highlightIndex);
};

if (features.length > 0) {
  highlightFeature(highlightIndex);
  featureTimer = setInterval(cycleFeatures, 4200);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(featureTimer);
      return;
    }
    featureTimer = setInterval(cycleFeatures, 4200);
  });
}

const flameStage = document.querySelector('.flame-stage');
if (flameStage) {
  let phase = 0;
  const animateFlame = () => {
    phase += 0.03;
    flameStage.style.transform = `translateY(${Math.sin(phase) * 6}px)`;
    requestAnimationFrame(animateFlame);
  };
  requestAnimationFrame(animateFlame);
}
