const state = {
  search: "",
  modality: new Set(),
  license: new Set(),
  commercial: "",
  sort: "name",
};

const modalities = [...new Set(MODELS.map((m) => m.modality))];
const licenseTypes = [...new Set(MODELS.map((m) => m.licenseType))];

function buildChips(containerId, values, setRef) {
  const container = document.getElementById(containerId);
  values.forEach((value) => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = value;
    chip.dataset.value = value;
    chip.addEventListener("click", () => {
      if (setRef.has(value)) {
        setRef.delete(value);
        chip.classList.remove("active");
      } else {
        setRef.add(value);
        chip.classList.add("active");
      }
      syncStatStrip();
      render();
    });
    container.appendChild(chip);
  });
}

function buildStatStrip() {
  const strip = document.getElementById("stat-strip");
  const total = document.createElement("div");
  total.className = "stat-pill stat-all";
  total.innerHTML = `<strong>${MODELS.length}</strong> models`;
  total.addEventListener("click", () => {
    state.modality.clear();
    syncChipGroup("modality-filters", state.modality);
    syncStatStrip();
    render();
  });
  strip.appendChild(total);

  modalities.forEach((mod) => {
    const count = MODELS.filter((m) => m.modality === mod).length;
    const pill = document.createElement("div");
    pill.className = `stat-pill stat-${mod}`;
    pill.dataset.value = mod;
    pill.innerHTML = `<strong>${count}</strong> ${mod}`;
    pill.addEventListener("click", () => {
      if (state.modality.has(mod) && state.modality.size === 1) {
        state.modality.clear();
      } else {
        state.modality.clear();
        state.modality.add(mod);
      }
      syncChipGroup("modality-filters", state.modality);
      syncStatStrip();
      render();
    });
    strip.appendChild(pill);
  });
}

function syncChipGroup(containerId, setRef) {
  document.querySelectorAll(`#${containerId} .chip`).forEach((chip) => {
    chip.classList.toggle("active", setRef.has(chip.dataset.value));
  });
}

function syncStatStrip() {
  document.querySelectorAll(".stat-pill").forEach((pill) => {
    const value = pill.dataset.value;
    pill.classList.toggle(
      "active",
      value ? state.modality.has(value) : state.modality.size === 0,
    );
  });
}

function classify(value) {
  return value.replace(/\s+/g, "-");
}

function commercialBucket(value) {
  const v = value.toLowerCase();
  if (v.startsWith("full") || v === "yes") return "full";
  if (v.startsWith("no")) return "no";
  return "partial";
}

function matches(model) {
  const haystack = Object.values(model).join(" ").toLowerCase();
  if (state.search && !haystack.includes(state.search.toLowerCase()))
    return false;
  if (state.modality.size && !state.modality.has(model.modality)) return false;
  if (state.license.size && !state.license.has(model.licenseType)) return false;
  if (
    state.commercial &&
    commercialBucket(model.commercialUse) !== state.commercial
  )
    return false;
  return true;
}

function sortModels(list) {
  const sorted = [...list];
  switch (state.sort) {
    case "year-desc":
      sorted.sort((a, b) => parseInt(b.year) - parseInt(a.year));
      break;
    case "year-asc":
      sorted.sort((a, b) => parseInt(a.year) - parseInt(b.year));
      break;
    case "modality":
      sorted.sort(
        (a, b) =>
          a.modality.localeCompare(b.modality) ||
          a.model.localeCompare(b.model),
      );
      break;
    default:
      sorted.sort((a, b) => a.model.localeCompare(b.model));
  }
  return sorted;
}

function cardTemplate(model, index) {
  const card = document.createElement("article");
  card.className = "card modality-" + model.modality;
  card.style.animationDelay = `${Math.min(index * 35, 350)}ms`;
  const bucket = commercialBucket(model.commercialUse);
  const commLabel =
    bucket === "full" ? "commercial ok" : bucket === "no" ? "non-commercial" : "conditional";
  const commClass = bucket === "full" ? "comm-ok" : "comm-no";
  card.innerHTML = `
    <div class="card-bar"></div>
    <div class="card-body">
      <div class="card-head">
        <span class="card-modality">${model.modality}</span>
        <span class="card-license">${model.licenseType}</span>
      </div>
      <h3>${model.model}</h3>
      <p class="developer">${model.developer}</p>
      <div class="card-foot">
        <span class="commercial ${commClass}">${commLabel}</span>
      </div>
    </div>
  `;
  card.addEventListener("click", () => openModal(model));
  return card;
}

function render() {
  const grid = document.getElementById("card-grid");
  const noResults = document.getElementById("no-results");
  const count = document.getElementById("result-count");
  grid.innerHTML = "";

  const filtered = sortModels(MODELS.filter(matches));
  count.textContent = `${filtered.length} of ${MODELS.length} models`;

  if (!filtered.length) {
    noResults.hidden = false;
    return;
  }
  noResults.hidden = true;
  filtered.forEach((m, i) => grid.appendChild(cardTemplate(m, i)));
}

function workflowPath(wf, file) {
  return (
    "Image Audio Video Models/" +
    encodeURIComponent(wf.folder) +
    "/" +
    encodeURIComponent(file)
  );
}

function openModal(model) {
  const overlay = document.getElementById("modal-overlay");
  const content = document.getElementById("modal-content");
  const wf = model.workflow || null;

  const licensing = [
    ["License Type", model.licenseType],
    ["License Name", model.licenseName],
    ["Commercial Use?", model.commercialUse],
    ["Open Source?", model.openSource],
  ];
  const dataProvenance = [
    ["Training Data Disclosed?", model.dataDisclosed],
    ["Training Data Source(s)", model.dataSources],
    ["Attribution Mechanism", model.attribution],
    ["Key Data / IP Gap", model.dataGap],
  ];
  const technical = [
    ["Modality", model.modality],
    ["Input → Output", model.io],
    ["Fine-tune / Train from Scratch?", model.finetune],
    ["Checkpoint Released?", model.checkpoint],
    ["API Available?", model.api],
    ["Output Export Format", model.exportFormat],
  ];

  const section = (title, fields) => `
    <div class="modal-section">
      <p class="modal-section-title">${title}</p>
      <dl>${fields.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>
    </div>
  `;

  const detailsHTML =
    section("Licensing", licensing) +
    section("Data Provenance", dataProvenance) +
    section("Technical", technical) +
    section("Notes / Ecosystem Fit", [["Summary", model.notes]]);

  const tabBar = wf
    ? `<div class="modal-tabs" role="tablist">
        <button class="modal-tab active" data-tab="details">Details</button>
        <button class="modal-tab" data-tab="output">Output</button>
        <button class="modal-tab" data-tab="workflow">Workflow JSON</button>
      </div>`
    : "";

  content.innerHTML = `
    <div class="modal-top">
      <div>
        <h2>${model.model}</h2>
        <p class="developer">${model.developer} · ${model.year}</p>
      </div>
      <button class="modal-close" id="modal-close" aria-label="Close">✕</button>
    </div>
    ${model.url ? `<a class="model-link" href="${model.url}" target="_blank" rel="noopener">Visit model →</a>` : ""}
    ${tabBar}
    <div class="modal-tab-panel" data-panel="details">${detailsHTML}</div>
    ${wf ? `<div class="modal-tab-panel hidden" data-panel="output">
      <div class="workflow-output">
        <img src="${workflowPath(wf, wf.image)}" alt="Model output example" class="workflow-img">
      </div>
    </div>
    <div class="modal-tab-panel hidden" data-panel="workflow">
      <div class="workflow-json-wrap">
        <pre class="workflow-json" id="workflow-json-pre"><span class="wf-loading">Loading…</span></pre>
      </div>
    </div>` : ""}
  `;

  overlay.hidden = false;
  document.getElementById("modal-close").addEventListener("click", closeModal);

  if (!wf) return;

  // Tab switching
  content.querySelectorAll(".modal-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      content.querySelectorAll(".modal-tab").forEach((t) => t.classList.remove("active"));
      content.querySelectorAll(".modal-tab-panel").forEach((p) => p.classList.add("hidden"));
      tab.classList.add("active");
      content.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.remove("hidden");

      // Lazy-load JSON when workflow tab first opened
      if (tab.dataset.tab === "workflow") {
        const pre = document.getElementById("workflow-json-pre");
        if (pre && pre.querySelector(".wf-loading")) {
          fetch(workflowPath(wf, wf.json))
            .then((r) => r.json())
            .then((data) => {
              pre.textContent = JSON.stringify(data, null, 2);
            })
            .catch(() => {
              pre.textContent = "Could not load workflow JSON.";
            });
        }
      }
    });
  });
}

function closeModal() {
  document.getElementById("modal-overlay").hidden = true;
}

document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target.id === "modal-overlay") closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    return;
  }
  if (e.key === "/" && document.activeElement.id !== "search") {
    e.preventDefault();
    document.getElementById("search").focus();
  }
});

document.getElementById("search").addEventListener("input", (e) => {
  state.search = e.target.value;
  render();
});

document.getElementById("commercial-filter").addEventListener("change", (e) => {
  state.commercial = e.target.value;
  render();
});

document.getElementById("sort-by").addEventListener("change", (e) => {
  state.sort = e.target.value;
  render();
});

document.getElementById("reset-filters").addEventListener("click", () => {
  state.search = "";
  state.modality.clear();
  state.license.clear();
  state.commercial = "";
  state.sort = "name";
  document.getElementById("search").value = "";
  document.getElementById("commercial-filter").value = "";
  document.getElementById("sort-by").value = "name";
  document
    .querySelectorAll(".chip.active")
    .forEach((c) => c.classList.remove("active"));
  syncStatStrip();
  render();
});

buildStatStrip();
buildChips("modality-filters", modalities, state.modality);
buildChips("license-filters", licenseTypes, state.license);
syncStatStrip();
render();
