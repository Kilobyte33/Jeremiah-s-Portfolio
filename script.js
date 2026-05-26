const THEME_KEY = "prefers-theme";
const root = document.documentElement;

function setThemeButtonIcon(button, isDark) {
  if (!button) return;

  button.innerHTML = isDark
    ? '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path><path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path><path d="M1 12h2"></path><path d="M21 12h2"></path><path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path></svg>'
    : '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"></path></svg>';
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);

  if (themeButton) {
    setThemeButtonIcon(themeButton, isDark);
    const nextThemeLabel = isDark ? "Switch to light theme" : "Switch to dark theme";
    themeButton.setAttribute("aria-label", nextThemeLabel);
    themeButton.setAttribute("title", nextThemeLabel);
  }
}

const themeButton = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme === "dark" ? "dark" : "light");

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const willBeDark = !root.classList.contains("dark");
    applyTheme(willBeDark ? "dark" : "light");
    localStorage.setItem(THEME_KEY, willBeDark ? "dark" : "light");
  });
}

/* Intersection Observer for Fade-in Scroll Animations */
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, activeObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      entry.target.style.opacity = "1";
      activeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

/* Dynamic Data Loading */
async function getProjectsData() {
  try {
    const res = await fetch("projects.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`projects.json HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function getCertificatesData() {
  try {
    const res = await fetch("certificates.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`certificates.json HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildProjectLink(url, label, className) {
  if (!url) return "";

  const escapedUrl = escapeHtml(url);
  const escapedLabel = escapeHtml(label);
  const isExternal = /^(https?:)?\/\//i.test(url);
  const targetAttrs = isExternal ? ' target="_blank" rel="noopener"' : "";

  return `<a class="${className}" href="${escapedUrl}"${targetAttrs}>${escapedLabel}</a>`;
}

async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = "";
  const projectsData = await getProjectsData();

  if (projectsData.length === 0) {
    grid.innerHTML = '<p class="muted">No projects available.</p>';
    return;
  }

  for (const project of projectsData) {
    const title = project.title || "Untitled project";
    const description = project.description || "";
    const problem = project.problem || "";
    const built = project.built || "";
    const role = project.role || "";
    const image = project.image || "";
    const tags = Array.isArray(project.tags) ? project.tags : [];
    const demo = project.demo || project.live || "";
    const source = project.source || project.github || project.viewLink || "";
    const article = document.createElement("article");

    if (project.id) {
      article.id = project.id;
    }

    article.className = "project-card-h";
    article.style.opacity = "0";
    article.innerHTML = `
      <div class="project-img-wrapper" style="${image ? `background-image: url('${escapeHtml(image)}')` : ""}"></div>
      <div class="project-info">
        ${role ? `<div class="project-role">${escapeHtml(role)}</div>` : ""}
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(description)}</p>
        ${problem ? `<p class="project-section-copy"><strong>Problem:</strong> ${escapeHtml(problem)}</p>` : ""}
        ${built ? `<p class="project-section-copy"><strong>What I built:</strong> ${escapeHtml(built)}</p>` : ""}
        ${
          tags.length
            ? `<div class="project-tags">${tags
                .slice(0, 7)
                .map((tag) => `<span class="tag-pill">${escapeHtml(tag)}</span>`)
                .join("")}</div>`
            : ""
        }
        <div class="project-actions">
          ${buildProjectLink(demo, "Live Demo", "btn-view secondary")}
          ${buildProjectLink(source, "Source", "btn-view")}
        </div>
      </div>
    `;

    grid.appendChild(article);
    observer.observe(article);
  }
}

function closeCertificateModal() {
  const modal = document.getElementById("cert-modal");
  if (!modal) return;

  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

async function loadCertificates() {
  const grid = document.getElementById("certificates-grid");
  if (!grid) return;

  grid.innerHTML = "";
  const certificatesData = await getCertificatesData();

  if (certificatesData.length === 0) {
    grid.innerHTML = '<p class="muted">No certificates available.</p>';
    return;
  }

  const isMini = grid.classList.contains("mini");
  const displayData = isMini ? certificatesData.slice(0, 1) : certificatesData;

  for (const certificate of displayData) {
    const card = document.createElement("article");
    card.className = "certificate-card";
    card.style.opacity = "0";
    card.style.cursor = "pointer";
    card.addEventListener("click", () => openCertificateModal(certificate.image, certificate.title));

    card.innerHTML = `
      <div class="certificate-img-container">
        <img src="${escapeHtml(certificate.image)}" alt="${escapeHtml(certificate.title)}" class="certificate-img">
      </div>
      <div class="certificate-info">
        <h3>${escapeHtml(certificate.title)}</h3>
        <div class="certificate-meta">
          <span class="issuer">${escapeHtml(certificate.issuer)}</span>
          <span class="date">${escapeHtml(certificate.date)}</span>
        </div>
        <p>${escapeHtml(certificate.description)}</p>
        <button class="btn-view-cert" type="button">View Certificate</button>
      </div>
    `;

    grid.appendChild(card);
    observer.observe(card);
  }
}

function openCertificateModal(imgSrc, title) {
  let modal = document.getElementById("cert-modal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "cert-modal";
    modal.className = "cert-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <button class="close-modal" type="button" aria-label="Close certificate preview">&times;</button>
        <h2 id="modal-title"></h2>
        <img id="modal-img" src="" alt="">
      </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector(".close-modal").addEventListener("click", closeCertificateModal);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeCertificateModal();
      }
    });
  }

  document.getElementById("modal-img").src = imgSrc;
  document.getElementById("modal-img").alt = title;
  document.getElementById("modal-title").textContent = title;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCertificateModal();
  }
});

loadProjects();
loadCertificates();

const handleScroll = () => {
  document.documentElement.setAttribute("data-scroll", window.scrollY > 20 ? "true" : "false");
};

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

document.addEventListener("DOMContentLoaded", () => {
  const staticElements = document.querySelectorAll(
    ".profile-card, .skill-card-modern, .contact-card, .overview-stat-card, .overview-card, .about-cta-box, .about-image"
  );
  staticElements.forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });
});
