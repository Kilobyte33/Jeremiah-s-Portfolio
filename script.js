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

// Projects data directly embedded
const projectsData = [
  {
    "title": "Kilobyte Webapp",
    "description": "A comprehensive marketplace and e-commerce platform.",
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    "viewLink": "https://github.com/Kilobyte33/Kilobyte-WebApp"
  }
];

// Certificates data
const certificatesData = [
  {
    "title": "AWS AI Practitioner Challenge",
    "issuer": "Udacity",
    "date": "April 25, 2026",
    "image": "assets/certificates/aws-ai-practitioner.png",
    "description": "Completed the AWS AI Practitioner Challenge, demonstrating knowledge in AI services and machine learning concepts on AWS."
  }
];

// Load projects
function loadProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = "";
  if (projectsData.length === 0) {
    grid.innerHTML = '<p class="muted">No projects available.</p>';
    return;
  }

  for (const p of projectsData) {
    const card = document.createElement("article");
    card.className = "project-card-h fade-in";
    
    card.innerHTML = `
      <div class="project-img-wrapper" style="background-image: url('${p.image || ''}')"></div>
      <div class="project-info">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <a class="btn-view" target="_blank" rel="noopener" href="${p.viewLink || '#'}">View Project</a>
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
      </div>
    `;
    grid.appendChild(card);
  }
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

