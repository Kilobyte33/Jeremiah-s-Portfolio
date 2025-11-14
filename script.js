// Theme handling
const THEME_KEY = "prefers-theme";
const root = document.documentElement;
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === "light") {
  root.classList.add("light");
}

// Update year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Theme toggle
const themeButton = document.querySelector(".theme-toggle");
if (themeButton) {
  themeButton.addEventListener("click", () => {
    const willBeLight = !root.classList.contains("light");
    root.classList.toggle("light", willBeLight);
    localStorage.setItem(THEME_KEY, willBeLight ? "light" : "dark");
    themeButton.textContent = willBeLight ? "☀️" : "🌙";
  });
  themeButton.textContent = root.classList.contains("light") ? "☀️" : "🌙";
}

// Load projects
async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  try {
    const res = await fetch("projects.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load projects.json");
    const projects = await res.json();
    if (!Array.isArray(projects)) throw new Error("projects.json must be an array");
    grid.innerHTML = "";
    for (const p of projects) {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <h3>${p.title ?? "Untitled Project"}</h3>
        <p class="muted">${p.description ?? ""}</p>
        <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
          ${Array.isArray(p.tags) ? p.tags.map(t => `<span class="small muted" style="border:1px solid var(--border); padding:2px 8px; border-radius:999px;">${t}</span>`).join("") : ""}
        </div>
        <div style="margin-top:12px; display:flex; gap:10px;">
          ${p.demo ? `<a class="btn" target="_blank" rel="noopener" href="${p.demo}">Live</a>` : ""}
          ${p.source ? `<a class="btn" target="_blank" rel="noopener" href="${p.source}">Source</a>` : ""}
        </div>
      `;
      grid.appendChild(card);
    }
  } catch (err) {
    console.error(err);
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>Projects unavailable</h3>
      <p class="muted">Add a <code>projects.json</code> file to populate this section.</p>
    `;
    document.getElementById("projects-grid").appendChild(card);
  }
}
loadProjects();

// Contact form demo (prevent real submit)
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    alert(`Thanks, ${name}! This demo form doesn't send yet. Configure it in script.js.`);
    form.reset();
  });
}


