let lang = "ar";

// Initialize language display
function initializeText() {
  document.querySelectorAll("[data-ar]").forEach(el => {
    el.textContent = el.dataset[lang];
  });
}

// Smooth Language Toggle with Animation
function toggleLang() {
  lang = lang === "ar" ? "en" : "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-ar]").forEach((el, index) => {
    el.style.animation = "none";
    setTimeout(() => {
      el.textContent = el.dataset[lang];
      el.style.animation = `slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s both`;
    }, 10);
  });
}

// Theme Toggle with System Detection
function toggleTheme() {
  const isDark = document.body.classList.toggle("light");
  localStorage.setItem("theme", isDark ? "light" : "dark");
  
  // Smooth color transition
  document.body.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
}

// Detect System Theme Preference
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
if (localStorage.getItem("theme") === "light" || 
    (!localStorage.getItem("theme") && prefersDark.matches === false)) {
  document.body.classList.add("light");
}

// Image Zoom Modal
const createZoomModal = () => {
  const modal = document.createElement("div");
  modal.className = "zoom-modal";
  modal.innerHTML = `
    <div class="zoom-modal-content">
      <button class="zoom-modal-close">×</button>
      <img id="zoom-modal-img" src="" alt="Zoomed Image">
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("#zoom-modal-img");
  const closeBtn = modal.querySelector(".zoom-modal-close");

  // Click to zoom image
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("zoomable-img")) {
      modalImg.src = e.target.src;
      modal.classList.add("active");
    }
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove("active");
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
};

// Scroll Animations - Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 
        entry.target.classList.contains("slide-up") 
          ? "slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards"
          : "fadeInScale 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll(".section, .hero, .feature, .step").forEach(el => {
  observer.observe(el);
});

// Cursor Effect - Smooth Following Gradient
const cursor = { x: 0, y: 0 };
const targetCursor = { x: 0, y: 0 };

document.addEventListener("mousemove", (e) => {
  targetCursor.x = e.clientX;
  targetCursor.y = e.clientY;
});

function animateCursor() {
  cursor.x += (targetCursor.x - cursor.x) * 0.1;
  cursor.y += (targetCursor.y - cursor.y) * 0.1;

  // Update glow effect on interactive elements
  document.querySelectorAll(".glass, .primary-btn, .support-btn").forEach(el => {
    const rect = el.getBoundingClientRect();
    const x = cursor.x - rect.left - rect.width / 2;
    const y = cursor.y - rect.top - rect.height / 2;
    
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  });

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Scroll Progress Indicator
const createScrollProgress = () => {
  const scrollProgress = document.createElement("div");
  scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #38bdf8, #22c55e);
    width: 0%;
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(scrollProgress);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrolled + "%";
  });
};

createScrollProgress();

// Smooth Button Ripple Effect
document.querySelectorAll(".primary-btn, .support-btn, .nav-actions button").forEach(btn => {
  btn.addEventListener("click", function(e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      top: ${y}px;
      left: ${x}px;
      pointer-events: none;
      animation: ripple 0.6s ease-out;
    `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation keyframe if not exists
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Parallax Effect on Scroll
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const bg = document.querySelector(".bg");
  if (bg) {
    bg.style.transform = `translateY(${scrollY * 0.5}px)`;
  }
});

// Enhanced Initial Load Animation
window.addEventListener("load", () => {
  document.querySelectorAll("h1, h2, .feature, .step").forEach((el, index) => {
    el.style.animation = `none`;
    setTimeout(() => {
      el.style.animation = `slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s both`;
    }, 50);
  });
});

// Active Navigation Indicator
const updateNavIndicator = () => {
  const scrollTop = window.scrollY;
  document.querySelectorAll(".section").forEach(section => {
    const { offsetTop, offsetHeight } = section;
    if (scrollTop >= offsetTop - 100 && scrollTop < offsetTop + offsetHeight) {
      // Can be used to highlight active section
    }
  });
};

window.addEventListener("scroll", updateNavIndicator);

// Performance: Debounce scroll event
let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    updateNavIndicator();
  }, 50);
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeText();
  createZoomModal();
});
