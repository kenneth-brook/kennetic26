import { loadPartials } from "./includes.js";

// Load shared header/nav/footer
loadPartials();

// Example: Fade in hero text on page load
window.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.opacity = 0;
    setTimeout(() => {
      hero.style.transition = "opacity 0.8s ease";
      hero.style.opacity = 1;
    }, 100);
  }
});
