// Theme handling
const THEME_KEY = "prefers-theme";
const root = document.documentElement;
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === "light") {
  root.classList.add("light");
}

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

// Projects data directly embedded to fix local file protocol fetching issues
const projectsData = [
  {
    "title": "Kilobyte Webapp",
    "description": "Kilobyte Webapp is a full-stack marketplace and e-commerce platform that allows users to buy and sell products online. The system includes features such as user authentication, product listings, shopping cart functionality, and product management for sellers.<br><br>The application was built to simulate a real-world online marketplace where vendors can manage their products and customers can browse, search, and purchase items efficiently.",
    "tags": ["Python", "Django", "HTML & CSS", "SQLite"],
    "source": "https://github.com/yourusername/kilobyte"
  }
];

// Load projects
function loadProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = "";
  if (projectsData.length === 0) {
    const card = document.createElement("article");
    card.className = "card fade-in";
    card.innerHTML = `
      <h3>Projects unavailable</h3>
      <p class="muted">Add projects to the projectsData array in script.js to populate this section.</p>
    `;
    grid.appendChild(card);
    return;
  }

  for (const p of projectsData) {
    const card = document.createElement("article");
    card.className = "card fade-in";
    card.innerHTML = `
      <h3>${p.title ?? "Untitled Project"}</h3>
      <p class="muted">${p.description ?? ""}</p>
      <div style="margin-top:10px; margin-bottom: auto; display:flex; gap:8px; flex-wrap:wrap;">
        ${Array.isArray(p.tags) ? p.tags.map(t => `<span class="small muted" style="border:1px solid var(--border); padding:4px 10px; border-radius:999px; background: color-mix(in oklab, var(--bg) 50%, transparent);">${t}</span>`).join("") : ""}
      </div>
      <div style="margin-top:20px; display:flex; gap:10px;">
        ${p.demo ? `<a class="btn primary" target="_blank" rel="noopener" href="${p.demo}">Live Demo</a>` : ""}
        ${p.source ? `<a class="btn" target="_blank" rel="noopener" href="${p.source}">Source Code</a>` : ""}
      </div>
    `;
    grid.appendChild(card);
  }
}
loadProjects();

// Scroll effects for header
const handleScroll = () => {
  if (window.scrollY > 20) {
    document.documentElement.setAttribute('data-scroll', 'true');
  } else {
    document.documentElement.setAttribute('data-scroll', 'false');
  }
};
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section .container > *, .card');
  sections.forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
  });
});

