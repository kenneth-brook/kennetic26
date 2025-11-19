export async function loadPartials() {
  const partials = [
    ["header", "/partials/header.html"],
    ["nav", "/partials/nav.html"],
    ["footer", "/partials/footer.html"]
  ];

  for (const [id, file] of partials) {
    const el = document.getElementById(id);
    if (el) {
      const html = await fetch(file).then(r => r.text());
      el.innerHTML = html;
    }
  }
}
