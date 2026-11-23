/**
 * app.js - Interactive UI Engine & State Persistence
 * Powers the Monkeytype-inspired matte black / soft purple interface,
 * interactive photo hotspots, runbook checklists, and manual upload viewer.
 */

const AppEngine = {
  activeView: "landing", // "landing" | "diagrams" | "runbooks" | "database" | "manual"
  activeDiagramId: "foh-rack-1",
  activeHotspotId: null,
  selectedShowKey: "spring-musical",
  searchQuery: "",
  categoryFilter: "all",
  checklistState: {},
  manualNotes: [],

  init() {
    this.loadState();
    this.bindGlobalEvents();
    this.render();
  },

  loadState() {
    try {
      const savedChecklist = localStorage.getItem("boulder_runbook_v2");
      if (savedChecklist) this.checklistState = JSON.parse(savedChecklist);

      const savedShow = localStorage.getItem("boulder_show_v2");
      if (savedShow && ShowConfigs[savedShow]) this.selectedShowKey = savedShow;

      const savedNotes = localStorage.getItem("boulder_manual_notes_v2");
      if (savedNotes) this.manualNotes = JSON.parse(savedNotes);
    } catch (e) {
      console.warn("Storage unavailable:", e);
    }
  },

  saveState() {
    try {
      localStorage.setItem("boulder_runbook_v2", JSON.stringify(this.checklistState));
      localStorage.setItem("boulder_show_v2", this.selectedShowKey);
      localStorage.setItem("boulder_manual_notes_v2", JSON.stringify(this.manualNotes));
    } catch (e) {
      console.warn("Storage save failed:", e);
    }
  },

  navigateTo(viewName) {
    this.activeView = viewName;
    this.render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  bindGlobalEvents() {
    // Top Nav & Landing Trigger Buttons
    document.addEventListener("click", (e) => {
      const navBtn = e.target.closest("[data-nav]");
      if (navBtn) {
        this.navigateTo(navBtn.dataset.nav);
      }
    });

    // Search Input
    const searchInput = document.getElementById("master-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderDatabaseView();
      });
    }

    // Category Filter
    const categorySelect = document.getElementById("category-filter-select");
    if (categorySelect) {
      categorySelect.addEventListener("change", (e) => {
        this.categoryFilter = e.target.value;
        this.renderDatabaseView();
      });
    }

    // Show Selector
    const showSelect = document.getElementById("show-profile-select");
    if (showSelect) {
      showSelect.addEventListener("change", (e) => {
        this.selectedShowKey = e.target.value;
        this.saveState();
        this.renderRunbookView();
      });
    }

    // Manual / Reference Upload Handler
    const manualFileInput = document.getElementById("manual-file-input");
    if (manualFileInput) {
      manualFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const viewer = document.getElementById("pdf-preview-frame");
        const statusLabel = document.getElementById("manual-file-status");
        const fileURL = URL.createObjectURL(file);
        if (viewer) {
          viewer.src = fileURL;
          viewer.classList.remove("hidden");
        }
        if (statusLabel) {
          statusLabel.textContent = `loaded: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
        }
      });
    }
  },

  render() {
    const header = document.getElementById("app-header");
    const views = ["landing", "diagrams", "runbooks", "database", "manual"];

    // Hide top nav bar on pure Monkeytype welcome screen
    if (header) {
      if (this.activeView === "landing") {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }
    }

    // Update active nav tab underline
    document.querySelectorAll(".top-nav-link").forEach((btn) => {
      if (btn.dataset.nav === this.activeView) {
        btn.classList.add("text-[#9d7cd8]", "border-b", "border-[#9d7cd8]");
        btn.classList.remove("text-neutral-500");
      } else {
        btn.classList.remove("text-[#9d7cd8]", "border-b", "border-[#9d7cd8]");
        btn.classList.add("text-neutral-500");
      }
    });

    // Toggle Sections
    views.forEach((v) => {
      const el = document.getElementById(`view-${v}`);
      if (el) {
        if (v === this.activeView) {
          el.classList.remove("hidden");
        } else {
          el.classList.add("hidden");
        }
      }
    });

    // Render Active View Contents
    if (this.activeView === "diagrams") this.renderDiagramsView();
    if (this.activeView === "runbooks") this.renderRunbookView();
    if (this.activeView === "database") this.renderDatabaseView();
    if (this.activeView === "manual") this.renderManualView();
  },
  // --- VIEW 1: INTERACTIVE RACK & CONSOLE DIAGRAMS ---
  renderDiagramsView() {
    const selectorContainer = document.getElementById("diagram-selector-tabs");
    const stageContainer = document.getElementById("diagram-interactive-stage");
    const inspectorContainer = document.getElementById("diagram-inspector-panel");
    if (!selectorContainer || !stageContainer || !inspectorContainer) return;

    // Render sub-tabs for each photo diagram
    selectorContainer.innerHTML = InteractiveDiagrams.map((diag) => {
      const isActive = diag.id === this.activeDiagramId;
      return `
        <button 
          data-diagram-id="${diag.id}"
          class="diagram-tab px-3 py-1.5 text-xs font-mono transition-colors ${
            isActive
              ? "text-[#9d7cd8] bg-neutral-900 border border-[#9d7cd8]/40"
              : "text-neutral-500 hover:text-neutral-300 border border-neutral-900"
          }"
        >
          ${diag.title.split("//")[0].trim()}
        </button>
      `;
    }).join("");

    selectorContainer.querySelectorAll(".diagram-tab").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.activeDiagramId = e.currentTarget.dataset.diagramId;
        this.activeHotspotId = null;
        this.renderDiagramsView();
      });
    });

    const currentDiag = InteractiveDiagrams.find((d) => d.id === this.activeDiagramId) || InteractiveDiagrams[0];
    if (!this.activeHotspotId && currentDiag.hotspots.length > 0) {
      this.activeHotspotId = currentDiag.hotspots[0].id;
    }

    // Render Interactive Photo + Coordinate Pins
    stageContainer.innerHTML = `
      <div class="mb-3">
        <h2 class="text-sm font-mono text-neutral-200">${currentDiag.title}</h2>
        <p class="text-xs font-mono text-neutral-500">${currentDiag.subtitle}</p>
      </div>

      <div class="relative w-full bg-neutral-950 border border-neutral-900 overflow-hidden select-none">
        <img 
          src="${currentDiag.image}" 
          alt="${currentDiag.title}"
          onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');"
          class="w-full h-auto max-h-[680px] object-contain mx-auto block opacity-90"
        />
        <!-- Fallback Schematic Grid if image asset isn't dropped into /assets yet -->
        <div class="hidden py-24 px-6 text-center border border-dashed border-neutral-800 m-4">
          <p class="text-xs font-mono text-[#9d7cd8] mb-1">[ IMAGE ASSET PENDING ]</p>
          <p class="text-xs font-mono text-neutral-400">${currentDiag.fallbackNote}</p>
          <p class="text-[11px] font-mono text-neutral-600 mt-2">Select any pin below or in the index to inspect hardware specs.</p>
        </div>

        <!-- Coordinate Pins -->
        ${currentDiag.hotspots
          .map((hs, idx) => {
            const isSelected = hs.id === this.activeHotspotId;
            return `
            <button
              data-hotspot-id="${hs.id}"
              style="left: ${hs.x}%; top: ${hs.y}%;"
              title="${hs.label}"
              class="hotspot-pin absolute -translate-x-1/2 -translate-y-1/2 group flex items-center gap-2 focus:outline-none z-10"
            >
              <span class="flex items-center justify-center w-6 h-6 rounded-full font-mono text-[11px] transition-all ${
                isSelected
                  ? "bg-[#9d7cd8] text-black font-bold ring-4 ring-[#9d7cd8]/30 scale-110"
                  : "bg-black/85 text-[#9d7cd8] border border-[#9d7cd8] hover:scale-110"
              }">
                ${idx + 1}
              </span>
              <span class="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono bg-black/90 border ${
                isSelected ? "border-[#9d7cd8] text-neutral-100" : "border-neutral-800 text-neutral-400"
              } whitespace-nowrap">
                ${hs.label.split("//")[1]?.trim() || hs.label}
              </span>
            </button>
          `;
          })
          .join("")}
      </div>

      <!-- Quick Pin Selector Strip -->
      <div class="flex flex-wrap gap-2 mt-3">
        ${currentDiag.hotspots
          .map((hs, idx) => {
            const isSelected = hs.id === this.activeHotspotId;
            return `
            <button 
              data-hotspot-id="${hs.id}"
              class="hotspot-pin text-left px-2.5 py-1 text-xs font-mono transition-colors ${
                isSelected
                  ? "bg-[#9d7cd8]/15 text-[#9d7cd8] border border-[#9d7cd8]/50"
                  : "bg-neutral-950 text-neutral-500 border border-neutral-900 hover:text-neutral-300"
              }"
            >
              0${idx + 1}. ${hs.label.split("//")[1]?.trim() || hs.label}
            </button>
          `;
          })
          .join("")}
      </div>
    `;

    // Render Inspector Drawer for Active Hotspot
    const activeSpot = currentDiag.hotspots.find((h) => h.id === this.activeHotspotId) || currentDiag.hotspots[0];
    if (activeSpot) {
      inspectorContainer.innerHTML = `
        <div class="border border-neutral-900 bg-neutral-950/80 p-5 h-full flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between border-b border-neutral-900 pb-3 mb-4">
              <span class="text-xs font-mono text-[#9d7cd8]">${activeSpot.label}</span>
              <span class="text-[11px] font-mono text-neutral-600">${activeSpot.assetId}</span>
            </div>

            <h3 class="text-base font-mono font-semibold text-neutral-100 mb-2">${activeSpot.title}</h3>
            <p class="text-xs font-mono text-neutral-400 leading-relaxed mb-5">${activeSpot.summary}</p>

            <div class="space-y-2.5 border-t border-neutral-900 pt-4">
              <span class="block text-[11px] font-mono text-neutral-600 uppercase tracking-wider">Field Specifications & SOP</span>
              ${activeSpot.specs
                .map(
                  (spec) => `
                <div class="text-xs font-mono text-neutral-300 pl-3 border-l border-[#9d7cd8]/60 py-0.5">
                  ${spec}
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <div class="mt-8 pt-4 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>click pins on diagram to inspect</span>
            <button data-nav="runbooks" class="text-[#9d7cd8] hover:underline">open runbook &rarr;</button>
          </div>
        </div>
      `;
    }

    // Bind Pin Clicks
    stageContainer.querySelectorAll(".hotspot-pin").forEach((pin) => {
      pin.addEventListener("click", (e) => {
        this.activeHotspotId = e.currentTarget.dataset.hotspotId;
        this.renderDiagramsView();
      });
    });
  },

  // --- VIEW 2: ACTIVE SHOW RUNBOOKS ---
  renderRunbookView() {
    const container = document.getElementById("runbook-content-area");
    if (!container) return;

    const profile = ShowConfigs[this.selectedShowKey];
    if (!profile) return;

    const showSelect = document.getElementById("show-profile-select");
    if (showSelect && showSelect.value !== this.selectedShowKey) {
      showSelect.value = this.selectedShowKey;
    }

    const headerHTML = `
      <div class="border border-neutral-900 bg-neutral-950 p-5 mb-6">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h2 class="text-base font-mono font-semibold text-neutral-100">${profile.name}</h2>
          <span class="text-xs font-mono text-[#9d7cd8]">${profile.tag}</span>
        </div>
        <p class="text-xs font-mono text-neutral-400 mb-3">${profile.description}</p>
        <p class="text-[11px] font-mono text-neutral-600 mb-4">${profile.timeline}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-neutral-900 text-xs font-mono">
          <div>
            <span class="text-neutral-600 block">PRIMARY INPUT</span>
            <span class="text-neutral-200">${profile.overrides.primaryInput}</span>
          </div>
          <div>
            <span class="text-neutral-600 block">CONTROL & MIXING</span>
            <span class="text-neutral-200">${profile.overrides.controlMode}</span>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-neutral-900">
          <span class="text-[11px] font-mono text-neutral-600 block mb-2">CREW DIVISION OF RESPONSIBILITIES</span>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            ${profile.crewSplit
              .map(
                (c) => `
              <div class="bg-black border border-neutral-900 p-3">
                <div class="text-xs font-mono text-[#9d7cd8] mb-1">${c.role}</div>
                <div class="text-[11px] font-mono text-neutral-400 leading-relaxed">${c.task}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;

    const phasesHTML = Object.entries(profile.phases)
      .map(([phaseTitle, steps], phaseIdx) => {
        const doneCount = steps.filter(
          (_, stepIdx) => !!this.checklistState[`${this.selectedShowKey}_${phaseIdx}_${stepIdx}`]
        ).length;

        return `
        <div class="border border-neutral-900 bg-neutral-950 p-5 mb-4">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-neutral-900">
            <h3 class="text-xs font-mono font-semibold text-neutral-200">${phaseTitle}</h3>
            <span class="text-xs font-mono ${doneCount === steps.length ? "text-[#9d7cd8]" : "text-neutral-600"}">
              ${doneCount}/${steps.length}
            </span>
          </div>
          <div class="space-y-2">
            ${steps
              .map((step, stepIdx) => {
                const key = `${this.selectedShowKey}_${phaseIdx}_${stepIdx}`;
                const checked = !!this.checklistState[key];
                return `
                <label class="flex items-start gap-3 py-1.5 px-2 hover:bg-neutral-900/50 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    data-key="${key}"
                    ${checked ? "checked" : ""}
                    class="rb-check mt-0.5 accent-[#9d7cd8] bg-black border-neutral-800 cursor-pointer"
                  />
                  <span class="text-xs font-mono leading-relaxed ${
                    checked ? "line-through text-neutral-600" : "text-neutral-300"
                  }">
                    ${step}
                  </span>
                </label>
              `;
              })
              .join("")}
          </div>
        </div>
      `;
      })
      .join("");

    container.innerHTML = headerHTML + phasesHTML;

    container.querySelectorAll(".rb-check").forEach((box) => {
      box.addEventListener("change", (e) => {
        this.checklistState[e.target.dataset.key] = e.target.checked;
        this.saveState();
        this.renderRunbookView();
      });
    });
  },

  // --- VIEW 3: SYSTEM ASSET INDEX ---
  renderDatabaseView() {
    const listContainer = document.getElementById("asset-list-container");
    const countLabel = document.getElementById("asset-count-display");
    if (!listContainer) return;

    const filtered = SystemDB.filter((item) => {
      const catMatch = this.categoryFilter === "all" || item.metadata.category === this.categoryFilter;
      const q = this.searchQuery;
      const textMatch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.signalPath.input.toLowerCase().includes(q) ||
        item.signalPath.output.toLowerCase().includes(q) ||
        (item.metadata.notes && item.metadata.notes.toLowerCase().includes(q));
      return catMatch && textMatch;
    });

    if (countLabel) {
      countLabel.textContent = `${filtered.length} / ${SystemDB.length} units`;
    }

    listContainer.innerHTML = filtered
      .map(
        (item) => `
      <div class="border-b border-neutral-900 py-4 px-2 hover:bg-neutral-950 transition-colors">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div class="flex items-center gap-3">
            <span class="text-xs font-mono text-[#9d7cd8]">${item.id}</span>
            <h3 class="text-sm font-mono font-medium text-neutral-100">${item.name}</h3>
          </div>
          <span class="text-[11px] font-mono ${
            item.metadata.status === "Active" ? "text-neutral-500" : "text-[#9d7cd8]"
          }">
            [${item.metadata.status.toLowerCase()}]
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-mono text-neutral-400 mb-2">
          <div><span class="text-neutral-600">loc:</span> ${item.location} (${item.rackPosition})</div>
          <div><span class="text-neutral-600">in:</span> ${item.signalPath.input}</div>
          <div><span class="text-neutral-600">out:</span> ${item.signalPath.output}</div>
        </div>

        ${
          item.metadata.notes
            ? `<p class="text-[11px] font-mono text-neutral-500">&gt; ${item.metadata.notes}</p>`
            : ""
        }
      </div>
    `
      )
      .join("");
  },

  // --- VIEW 4: X32 MANUAL & KNOWLEDGE BASE ---
  renderManualView() {
    const notesList = document.getElementById("team-notes-list");
    const addNoteForm = document.getElementById("add-note-form");
    if (!notesList) return;

    const defaultNotes = [
      {
        title: "TheatreMix DCA Bus Workflow",
        body: "Scenes auto-populate active speakers onto the right-hand fader bank. Do not rely on automated fader levels—ride vocals manually by ear for each performance."
      },
      {
        title: "Wireless Backup Swap Protocol",
        body: "All 27 Shure BLX4R receivers stay in FOH Rack 01. If a pack fails understage, swap cord/element or switch to a spare pack, solo on Genelecs via PFL, then unmute."
      },
      {
        title: "Post-Show Charging & XLR Rule",
        body: "Pull all AA batteries into the 70-cell FOH charger, dock all walkies, power down X32 and Antimi units, and leave XLR runs patched in place."
      }
    ];

    const allNotes = [...defaultNotes, ...this.manualNotes];

    notesList.innerHTML = allNotes
      .map(
        (n) => `
      <div class="border border-neutral-900 bg-neutral-950 p-4">
        <h4 class="text-xs font-mono text-[#9d7cd8] mb-1">${n.title}</h4>
        <p class="text-xs font-mono text-neutral-400 leading-relaxed">${n.body}</p>
      </div>
    `
      )
      .join("");

    if (addNoteForm && !addNoteForm.dataset.bound) {
      addNoteForm.dataset.bound = "true";
      addNoteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const titleInput = document.getElementById("note-title-input");
        const bodyInput = document.getElementById("note-body-input");
        if (titleInput.value.trim() && bodyInput.value.trim()) {
          this.manualNotes.push({
            title: titleInput.value.trim(),
            body: bodyInput.value.trim()
          });
          this.saveState();
          titleInput.value = "";
          bodyInput.value = "";
          this.renderManualView();
        }
      });
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  AppEngine.init();
});