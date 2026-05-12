// Theme handling
const THEME_KEY = "prefers-theme";
const root = document.documentElement;

function applyTheme(theme) {
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);
}

const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme === "dark" ? "dark" : "light");

// Theme toggle
const themeButton = document.querySelector(".theme-toggle");
if (themeButton) {
  themeButton.addEventListener("click", () => {
    const willBeDark = !root.classList.contains("dark");
    applyTheme(willBeDark ? "dark" : "light");
    localStorage.setItem(THEME_KEY, willBeDark ? "dark" : "light");
    themeButton.textContent = willBeDark ? "🌙" : "☀️";
  });
  themeButton.textContent = root.classList.contains("dark") ? "🌙" : "☀️";
}

// Projects
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

// Certificates data
const certificatesData = [
  {
    "title": "AWS AI Practitioner Challenge",
    "issuer": "Udacity",
    "date": "April 25, 2026",
    "image": "assets/certificates/aws-ai-practitioner.jpg",
    "description": "Demonstrated exceptional proficiency and knowledge in AWS Cloud Fundamentals, AI and Machine Learning Concepts, AWS AI Services (SageMaker, Lex, Rekognition, Polly), security, and best practices."
  }
];

// Load projects
async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = "";
  const projectsData = await getProjectsData();
  if (projectsData.length === 0) {
    grid.innerHTML = '<p class="muted">No projects available.</p>';
    return;
  }

  for (const p of projectsData) {
    const title = p.title || "Untitled project";
    const description = p.description || "";
    const image = p.image || "";
    const tags = Array.isArray(p.tags) ? p.tags : [];
    const demo = p.demo || p.live || "";
    const source = p.source || p.github || p.viewLink || "";

    const card = document.createElement("article");
    card.className = "project-card-h fade-in";
    
    card.innerHTML = `
      <div class="project-img-wrapper" style="${image ? `background-image: url('${image}')` : ""}"></div>
      <div class="project-info">
        <h3>${title}</h3>
        <p>${description}</p>
        ${
          tags.length
            ? `<div class="project-tags">${tags
                .slice(0, 6)
                .map((t) => `<span class="tag-pill">${t}</span>`)
                .join("")}</div>`
            : ""
        }
        <div class="project-actions">
          ${demo ? `<a class="btn-view secondary" target="_blank" rel="noopener" href="${demo}">Live Demo</a>` : ""}
          ${source ? `<a class="btn-view" target="_blank" rel="noopener" href="${source}">Source</a>` : ""}
        </div>
      </div>
    `;
    grid.appendChild(card);
  }
}

// Load certificates
function loadCertificates() {
  const grid = document.getElementById("certificates-grid");
  if (!grid) return;

  grid.innerHTML = "";
  if (certificatesData.length === 0) {
    grid.innerHTML = '<p class="muted">No certificates available.</p>';
    return;
  }

  for (const c of certificatesData) {
    const card = document.createElement("article");
    card.className = "certificate-card fade-in";
    card.style.cursor = "pointer";
    card.onclick = () => openCertificateModal(c.image, c.title);
    
    card.innerHTML = `
      <div class="certificate-img-container">
        <img src="${c.image}" alt="${c.title}" class="certificate-img">
      </div>
      <div class="certificate-info">
        <h3>${c.title}</h3>
        <div class="certificate-meta">
          <span class="issuer">${c.issuer}</span>
          <span class="date">${c.date}</span>
        </div>
        <p>${c.description}</p>
        <button class="btn-view-cert">View Certificate</button>
      </div>
    `;
    grid.appendChild(card);
  }
}

// Modal handling
function openCertificateModal(imgSrc, title) {
  let modal = document.getElementById("cert-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "cert-modal";
    modal.className = "cert-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2 id="modal-title"></h2>
        <img id="modal-img" src="" alt="">
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".close-modal").onclick = () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    };

    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    };
  }

  document.getElementById("modal-img").src = imgSrc;
  document.getElementById("modal-title").innerText = title;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

loadProjects();
loadCertificates();

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

