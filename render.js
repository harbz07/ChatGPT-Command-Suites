
document.addEventListener("DOMContentLoaded", () => {
  const pageName = window.location.pathname.split("/").pop();
  fetch("manifest.json")
    .then(res => res.json())
    .then(manifest => {
      const page = manifest.pages.find(p => p.html === pageName);
      if (!page) throw new Error("Page not listed in manifest.");

      const container = document.getElementById(page.container);
      if (!container) throw new Error("Container not found on this page.");

      return fetch(page.json)
        .then(res => {
          if (!res.ok) throw new Error("Failed to load JSON data");
          return res.json();
        })
        .then(data => renderEntries(data, container));
    })
    .catch(err => {
      document.body.innerHTML += `<p style='color:red;'>⚠️ Error: ${err.message}</p>`;
      console.error(err);
    });
});

function renderEntries(entries, container) {
  container.innerHTML = "";
  entries.forEach(entry => {
    const card = document.createElement("div");
    card.className = "entry-card";
    card.innerHTML = `
      <h2>${entry.name}</h2>
      <p><strong>Category:</strong> ${entry.category}</p>
      <p><strong>Label:</strong> ${entry.label}</p>
      <p class="flavor">${entry.flavor}</p>
    `;

    const metaButton = document.createElement("button");
    metaButton.textContent = "What does this do?";
    metaButton.onclick = () => {
      if (!card.querySelector(".metadata")) {
        const meta = document.createElement("div");
        meta.className = "metadata";
        meta.innerHTML = `
          <p><strong>Tone:</strong> ${entry.metadata.tone}</p>
          <p><strong>Usage:</strong> ${entry.metadata.usage}</p>
          <p><strong>Output Format:</strong> ${entry.metadata.output_format}</p>
          <p><strong>Constraint:</strong> ${entry.metadata.constraint}</p>
        `;
        card.appendChild(meta);
      }
    };

    card.appendChild(metaButton);
    container.appendChild(card);
  });
}
