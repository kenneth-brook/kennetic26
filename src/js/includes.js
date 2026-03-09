export async function loadPartials() {
  const partials = [
    ["header", "/partials/header.html"],
    ["nav", "/partials/nav.html"],
    ["footer", "/partials/footer.html"]
  ];

  const results = await Promise.all(
    partials.map(async ([id, file]) => {
      const target = document.getElementById(id);

      if (!target) {
        return { id, file, loaded: false, reason: "missing-target" };
      }

      try {
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        target.innerHTML = await response.text();
        return { id, file, loaded: true };
      } catch (error) {
        console.error(`Failed to load partial: ${file}`, error);
        return { id, file, loaded: false, reason: "fetch-failed" };
      }
    })
  );

  window.dispatchEvent(
    new CustomEvent("partialsLoaded", {
      detail: { results }
    })
  );
}
