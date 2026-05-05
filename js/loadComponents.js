const basePath = "";

function loadComponent(id, file, callback) {
  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error("Erreur chargement " + file);
      return res.text();
    })
    .then(data => {
      const container = document.getElementById(id);
      container.innerHTML = data;
      if (typeof applySiteConfig === "function") {
        applySiteConfig(container);
      }

      if (callback && typeof callback === "function") {
        callback();
      }
    })
    .catch(err => console.error(err));
}

// Chargement composants
loadComponent("header", basePath + "components/header.html", () => {
  initMenu();
});

loadComponent("footer", basePath + "components/footer.html", () => {
  initFloatingCta();
});
