function initMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (!toggle || !nav) {
    console.warn("Menu introuvable");
    return;
  }

let menuTimeout;

function openMenu() {
  nav.classList.add("active");
  toggle.classList.add("active");
  clearTimeout(menuTimeout);

  // fermeture automatique après 5s d'inactivité
  menuTimeout = setTimeout(() => {
    closeMenu();
  }, 5000);
}

function closeMenu() {
  nav.classList.remove("active");
  toggle.classList.remove("active");
  clearTimeout(menuTimeout);
}

  toggle.onclick = null;

  toggle.onclick = (e) => {
    e.stopPropagation();

    if (nav.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // clic sur nav = reste ouvert
  nav.onclick = (e) => {
    e.stopPropagation();
    clearTimeout(menuTimeout); // reset timer
  };

  document.onclick = () => {
    closeMenu();
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