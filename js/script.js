document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  // MENU BURGER
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // DROPDOWN MOBILE UNIQUEMENT
  document.querySelectorAll(".dropdown-toggle").forEach(btn => {
    btn.addEventListener("click", (e) => {

      // Empêche comportement parasite
      e.preventDefault();
      e.stopPropagation();

      const parent = btn.parentElement;

      // Ferme les autres dropdowns (pro)
      document.querySelectorAll(".dropdown").forEach(d => {
        if (d !== parent) d.classList.remove("active");
      });

      parent.classList.toggle("active");
    });
  });

});