function loadComponent(id, file, callback) {
  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error("Erreur chargement " + file);
      return res.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // FIX PATH LINKS (si dans /pages/)
      const links = document.querySelectorAll("nav a");
      links.forEach(link => {
        const href = link.getAttribute("href");
        if (href && !href.startsWith("http")) {
          link.setAttribute("href", basePath + href.replace("../",  ""));
        }
      });

      // Exécute après injection
      if (callback && typeof callback === "function") {
        callback();
      }
    })
    .catch(err => console.error(err));
}

const basePath = window.location.pathname.includes("/pages/") ? "../" : "";

// ⚠️ IMPORTANT : on passe une fonction anonyme
loadComponent("header", basePath + "components/header.html", () => {
  initMenu();
});

loadComponent("footer", basePath + "components/footer.html");