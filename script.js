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
    "icon": `<div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0; box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></div>`,
    "description1": "Kilobyte Webapp is a full-stack marketplace and e-commerce platform that allows users to buy and sell products online.",
    "features": [
      "User authentication",
      "Product listings",
      "Shopping cart functionality",
      "Product management for sellers"
    ],
    "description2": "Simulated a real-world online marketplace enabling vendors to manage products while customers browse, search, and purchase items.",
    "viewLink": "#",
    "source": "https://github.com/Kilobyte33/Kilobyte-WebApp"
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
    
    if (p.features) {
      card.style.gridColumn = "1 / -1";
      card.style.maxWidth = "800px";
      card.style.justifySelf = "center";
      card.style.width = "100%";
      card.style.padding = "40px";
      card.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 24px;">
          ${p.icon ? p.icon : ''}
          <h3 style="margin: 0; font-size: 2rem;">${p.title}</h3>
        </div>
        <p class="muted" style="margin-bottom: 24px; font-size: 1.1rem; line-height: 1.6;">${p.description1}</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 28px 0; display: grid; gap: 14px;">
          ${p.features.map(f => `
            <li style="display: flex; align-items: flex-start; gap: 12px; color: var(--text-muted); font-size: 1.05rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 2px;"><polyline points="20 6 9 17 4 12"></polyline></svg> 
              ${f}
            </li>
          `).join('')}
        </ul>
        <p class="muted" style="margin-bottom: 36px; font-size: 1.05rem; line-height: 1.6;">${p.description2}</p>
        <div style="display: flex; gap: 16px; margin-top: auto; flex-wrap: wrap;">
          <a class="btn primary" target="_blank" rel="noopener" href="${p.viewLink || '#'}" style="border-radius: 8px; padding: 12px 24px;">View Project <span style="margin-left: 6px;">&rarr;</span></a>
          ${p.source ? `<a class="btn" target="_blank" rel="noopener" href="${p.source}" style="border-radius: 8px; padding: 12px 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);">GitHub Repo <span style="margin-left: 6px;">&rarr;</span></a>` : ''}
        </div>
      `;
    } else {
      card.innerHTML = `
        <h3>${p.title ?? "Untitled Project"}</h3>
        <p class="muted" style="margin-bottom: 24px;">${p.description ?? ""}</p>
        <div style="margin-top:auto; margin-bottom: 24px; display:flex; gap:8px; flex-wrap:wrap;">
          ${Array.isArray(p.tags) ? p.tags.map(t => `<span class="small muted" style="border:1px solid var(--primary); padding:4px 12px; border-radius:999px; background: rgba(59, 130, 246, 0.1); color: var(--primary); font-weight: 600;">${t}</span>`).join("") : ""}
        </div>
        <div style="display:flex; gap:12px;">
          ${p.demo ? `<a class="btn primary" target="_blank" rel="noopener" href="${p.demo}">Live Demo</a>` : ""}
          ${p.source ? `<a class="btn" target="_blank" rel="noopener" href="${p.source}">Source Code</a>` : ""}
        </div>
      `;
    }
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

