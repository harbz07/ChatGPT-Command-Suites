document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname.split("/").pop();
  const map = {
    "grimoire.html": { file: "grimoire.json", target: "spell-container" },
    "the-cave.html": { file: "the_cave.json", target: "stim-container" },
    "creator-hub.html": { file: "creator_hub.json", target: "post-container" },
    "utility.html": { file: "utility.json", target: "command-container" }
  };

  const fallback = { file: "grimoire.json", target: "spell-container" };
  const { file, target } = map[path] || fallback;

  const container = document.getElementById(target);
  if (!container) return;

  fetch(file)
    .then(res => res.json())
    .then(data => {
      data.forEach(entry => {
        const card = document.createElement("div");
        card.className = "entry-card";

        const title = document.createElement("h2");
        title.textContent = entry.name;

        const flavor = document.createElement("p");
        flavor.className = "flavor";
        flavor.textContent = entry.flavor;

        const metadata = document.createElement("pre");
        metadata.className = "metadata";
        metadata.textContent = entry.metadata;

        card.appendChild(title);
        card.appendChild(flavor);
        card.appendChild(metadata);
        container.appendChild(card);
      });
    })
    .catch(err => {
      container.textContent = "Error loading entries: " + err.message;
    });
});
