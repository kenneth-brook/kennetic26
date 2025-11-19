export async function loadPartials() {
  const partials = [
    ["header", "/partials/header.html"],
    ["nav", "/partials/nav.html"],
    ["footer", "/partials/footer.html"]
  ];

  let loadedCount = 0;

  for (const [id, file] of partials) {
    const target = document.getElementById(id);
    if (target) {
      const html = await fetch(file).then(r => r.text());
      target.innerHTML = html;
      loadedCount++;
    }
  }

  // FIRE THIS EVENT WHEN DONE
  if (loadedCount === partials.length) {
    window.dispatchEvent(new Event("partialsLoaded"));
  }
}
