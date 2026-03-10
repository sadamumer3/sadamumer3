/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
       1. NEON TORCH CURSOR TRACKING
    ========================================================= */

  const torch = document.getElementById("neon-torch");

  document.addEventListener("mousemove", (e) => {
    torch.style.left = e.clientX + "px";
    torch.style.top = e.clientY + "px";
  });

  /* =========================================================
       2. SCROLL PROGRESS BAR
    ========================================================= */

  const progressBar = document.getElementById("scroll-progress");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + "%";
  });

  /* =========================================================
       3. SECTION FADE-IN (Intersection Observer)
    ========================================================= */

  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    section.classList.add("section-hidden");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          entry.target.classList.remove("section-hidden");
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  /* =========================================================
       4. MODAL OPEN / CLOSE LOGIC
    ========================================================= */

  const modal = document.getElementById("abstract-modal");
  const closeBtn = document.getElementById("close-modal");
  const abstractButtons = document.querySelectorAll(".abstract-btn");

  // Open modal
  abstractButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal button
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});

/* =========================================================
       5. 3D TILT INTERACTION (Research Cards)
    ========================================================= */

const researchCards = document.querySelectorAll(".research-card");

researchCards.forEach((card) => {
  const inner = card.querySelector(".glass-card");

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    inner.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});

/* =========================================================
       6. SKILL ORBIT ROTATION SYSTEM
    ========================================================= */

const skills = document.querySelectorAll(".orbit-skill");
const orbitRadius = 200;
let orbitAngle = 0;

function rotateOrbit() {
  orbitAngle += 0.002; // speed

  skills.forEach((skill, index) => {
    const baseAngle = parseFloat(skill.dataset.angle) * (Math.PI / 180);
    const angle = baseAngle + orbitAngle;

    const x = orbitRadius * Math.cos(angle);
    const y = orbitRadius * Math.sin(angle);

    skill.style.transform = `translate(${x}px, ${y}px)`;
  });

  requestAnimationFrame(rotateOrbit);
}

rotateOrbit();

/* =========================================================
       7. ANIMATED METRIC COUNTERS
    ========================================================= */

const counters = document.querySelectorAll(".metric-number");
let counterStarted = false;

function animateCounters() {
  counters.forEach((counter) => {
    const target = +counter.dataset.target;
    let count = 0;
    const increment = target / 80;

    function update() {
      count += increment;
      if (count < target) {
        counter.textContent = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + "+";
      }
    }

    update();
  });
}

const metricSection = document.getElementById("metrics");

const metricObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !counterStarted) {
      animateCounters();
      counterStarted = true;
    }
  },
  { threshold: 0.4 },
);

metricObserver.observe(metricSection);

/* =========================================================
       8. THEME TOGGLE (Dark / Light Mode)
    ========================================================= */

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeToggle.textContent = "Dark Mode";
  } else {
    themeToggle.textContent = "Light Mode";
  }
});
