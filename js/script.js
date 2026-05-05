const ctaSection = document.querySelector("section.cta");

function hideSectionCta() {
  if (ctaSection) {
    ctaSection.style.opacity = "0";
    ctaSection.style.pointerEvents = "none";
    ctaSection.style.transition = "opacity 0.3s ease";
  }
}

function showSectionCta() {
  if (ctaSection) {
    ctaSection.style.opacity = "1";
    ctaSection.style.pointerEvents = "auto";
    ctaSection.style.transition = "opacity 0.3s ease";
  }
}

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
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fermer le menu");
    clearTimeout(menuTimeout);

    menuTimeout = setTimeout(() => {
      closeMenu();
    }, 5000);
  }

  function closeMenu() {
    nav.classList.remove("active");
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
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

  nav.onclick = (e) => {
    e.stopPropagation();
    clearTimeout(menuTimeout);
  };

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.onclick = () => {
    closeMenu();
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

// ==========================
// CTA FLOTTANT
// caché dans le hero
// replié pendant le scroll
// déployé à l'arrêt
// CTA section masqué seulement en cas de collision
// ==========================

let ctaInitialized = false;

function initFloatingCta() {
  if (ctaInitialized) return;

  const ctaButtons = document.querySelectorAll(".cta-mobile .cta-btn");
  const ctaMobile = document.querySelector(".cta-mobile");
  const hero = document.querySelector(".hero");

  if (!ctaButtons.length || !ctaMobile) {
    return;
  }

  ctaInitialized = true;

  let scrollTimeout;
  let isScrolling = false;

  function openCta() {
    ctaButtons.forEach((btn) => btn.classList.add("expanded"));
  }

  function closeCta() {
    ctaButtons.forEach((btn) => btn.classList.remove("expanded"));
  }

  function hideCta() {
    ctaMobile.style.opacity = "0";
    ctaMobile.style.pointerEvents = "none";
  }

  function showCta() {
    ctaMobile.style.opacity = "1";
    ctaMobile.style.pointerEvents = "auto";
  }

  function isMobileViewport() {
    return window.innerWidth <= 930;
  }

  function isInHeroZone() {
    if (!hero) return false;
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    return window.scrollY < heroBottom - 100;
  }

  function hasVisualCollision() {
    if (!ctaSection || !isMobileViewport()) return false;
    if (ctaMobile.style.opacity === "0") return false;

    const sectionRect = ctaSection.getBoundingClientRect();
    const floatingRect = ctaMobile.getBoundingClientRect();

    const verticalOverlap =
      sectionRect.bottom > floatingRect.top - 16 &&
      sectionRect.top < floatingRect.bottom + 16;

    const horizontalOverlap =
      sectionRect.right > floatingRect.left - 16 &&
      sectionRect.left < floatingRect.right + 16;

    return verticalOverlap && horizontalOverlap;
  }

  function updateSectionCtaVisibility() {
    if (!ctaSection) return;

    if (!isMobileViewport()) {
      showSectionCta();
      return;
    }

    if (hasVisualCollision()) {
      hideSectionCta();
    } else {
      showSectionCta();
    }
  }

  function updateCtaState() {
    if (!isMobileViewport()) {
      hideCta();
      showSectionCta();
      return;
    }

    if (isInHeroZone()) {
      hideCta();
      showSectionCta();
      return;
    }

    showCta();
    updateSectionCtaVisibility();
  }

  // état initial
  updateCtaState();

  if (isMobileViewport() && !isInHeroZone()) {
    openCta();
  } else {
    closeCta();
  }

  window.addEventListener("scroll", () => {
    updateCtaState();

    if (!isMobileViewport()) {
      closeCta();
      clearTimeout(scrollTimeout);
      isScrolling = false;
      return;
    }

    if (isInHeroZone()) {
      closeCta();
      clearTimeout(scrollTimeout);
      isScrolling = false;
      return;
    }

    if (!isScrolling) {
      closeCta();
      isScrolling = true;
    }

    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      openCta();
      updateSectionCtaVisibility();
      isScrolling = false;
    }, 800);
  });

  window.addEventListener("resize", () => {
    updateCtaState();

    if (!isMobileViewport()) {
      closeCta();
    } else if (!isInHeroZone()) {
      openCta();
    }
  });
}
