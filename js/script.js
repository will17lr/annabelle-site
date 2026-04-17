function initMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (!toggle || !nav) {
    console.warn("Menu introuvable");
    return;
  }

  // évite double binding
  toggle.onclick = null;

  toggle.onclick = () => {
    nav.classList.toggle("active");
    toggle.classList.toggle("active"); // utile pour animation burger
  };
}