
document.addEventListener("DOMContentLoaded", () => {
  const containerId = document.querySelector("div[id$='container']")?.id;
  if (!containerId) return;

  const baseName = window.location.pathname.split("/").pop().replace(".html", "");
  const jsonFile = baseName.replace("-", "_") + ".json";

  fetch(jsonFile)
    .then(res => res.json())
    .then(data => renderEntries(data, containerId))
    .catch(err => console.error("Failed to load JSON:", err));
});

function renderEntries(entries, containerId) {
  const container = document.getElementById(containerId);
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
        meta.textContent = entry.metadata;
        card.appendChild(meta);
      }
    };

    card.appendChild(metaButton);
    container.appendChild(card);
  });
}
