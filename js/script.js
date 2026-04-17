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