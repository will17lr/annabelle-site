window.SITE_CONFIG = {
  name: "Wilfried VOGLER",
  jobTitle: "Kinésithérapeute",
  phone: "+33684959411",
  phoneLabel: "06 84 95 94 11",
  email: "w.vogler@outlook.fr",
  addressLine1: "1 Av de Lagord Vendome",
  addressLine2: "17140 Lagord",
};

function formatPhoneLabel(label) {
  return label.replaceAll(" ", "\u00a0");
}

function applySiteConfig(root = document) {
  const config = window.SITE_CONFIG;
  if (!config) return;

  root.querySelectorAll("[data-site-phone-href]").forEach((link) => {
    link.setAttribute("href", `tel:${config.phone}`);
  });

  root.querySelectorAll("[data-site-phone-label]").forEach((node) => {
    node.textContent = formatPhoneLabel(config.phoneLabel);
  });

  root.querySelectorAll("[data-site-email-href]").forEach((link) => {
    link.setAttribute("href", `mailto:${config.email}`);
  });

  root.querySelectorAll("[data-site-email-label]").forEach((node) => {
    node.textContent = config.email;
  });
}

document.addEventListener("DOMContentLoaded", () => applySiteConfig());
