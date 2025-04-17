
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("spell-container");
  if (!container) return;

  const fileMap = {
    "grimoire.html": "grimoire.json",
    "the-cave.html": "the_cave.json",
    "creator-hub.html": "creator_hub.json",
    "utility.html": "utility.json"
  };

  const page = location.pathname.split("/").pop();
  const jsonFile = fileMap[page];

  fetch(jsonFile)
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
      container.textContent = "Failed to load data: " + err.message;
    });
});
