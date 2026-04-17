function initMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (!toggle || !nav) {
    console.warn("Menu introuvable");
    return;
  }

  toggle.onclick = null;

  toggle.onclick = (e) => {
    e.stopPropagation();
    nav.classList.toggle("active");
    toggle.classList.toggle("active");
  };

  nav.onclick = (e) => {
    e.stopPropagation();
  };

  document.onclick = () => {
    nav.classList.remove("active");
    toggle.classList.remove("active");
  };
}

// ==========================
// CTA FLOTTANT
// petit pendant le scroll
// ouvert à l'arrêt
// ==========================

let ctaInitialized = false;

function initFloatingCta() {
  if (ctaInitialized) return;

  const ctaButtons = document.querySelectorAll('.cta-btn');

  if (!ctaButtons.length) {
    console.warn("CTA introuvable");
    return;
  }

  ctaInitialized = true;

  let scrollTimeout;

  function openCta() {
    ctaButtons.forEach(btn => btn.classList.add('expanded'));
  }

  function closeCta() {
    ctaButtons.forEach(btn => btn.classList.remove('expanded'));
  }

  // ouverts au chargement
  openCta();

  // fermés pendant le scroll puis réouverture avec latence
  window.addEventListener('scroll', () => {
    closeCta();

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      openCta();
    }, 600);
  });
}

// sécurité : si le footer est déjà là au load
window.addEventListener('load', () => {
  initFloatingCta();
});