console.log("Welcome to my portfolio!");

// Professional Portfolio Website JavaScript
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Professional portfolio website loaded successfully!");

  // Loading Screen
  const loadingScreen = document.querySelector(".loading-screen");

  // Hide loading screen after page loads
  window.addEventListener("load", function () {
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      document.body.classList.add("loaded");
    }, 1500);
  });

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(10, 10, 10, 0.98)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)";
      navbar.style.boxShadow = "none";
    }
  });

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Scroll animations with Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".skill-category, .project-card, .timeline-item, .contact-item"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Skill progress bars animation
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px) scale(1.05)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0) scale(1)";
    });

    // Add click functionality
    item.addEventListener("click", function () {
      const skillName = this.getAttribute("data-skill");
      const skillLevel = this.getAttribute("data-level");
      showNotification(`Skill: ${skillName} - Level: ${skillLevel}%`, "info");

      // Add a brief highlight effect
      this.style.transform = "scale(1.1)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);
    });
  });

  // Project cards functionality
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // About highlight items functionality
  const highlightItems = document.querySelectorAll(".highlight-item");
  highlightItems.forEach((item) => {
    item.addEventListener("click", function () {
      const text = this.querySelector("span").textContent;
      showNotification(`Feature: ${text}`, "info");
    });
  });

  // Contact items functionality
  const contactItems = document.querySelectorAll(".contact-item");
  contactItems.forEach((item) => {
    item.addEventListener("click", function () {
      const icon = this.querySelector("i");
      const title = this.querySelector("h4").textContent;
      const value = this.querySelector("p").textContent;

      if (icon.classList.contains("fa-envelope")) {
        copyToClipboard(value);
        showNotification("Email copied to clipboard!", "success");
      } else if (icon.classList.contains("fa-phone")) {
        copyToClipboard(value);
        showNotification("Phone number copied to clipboard!", "success");
      } else if (icon.classList.contains("fa-map-marker-alt")) {
        showNotification(`Location: ${value}`, "info");
      } else if (icon.classList.contains("fa-calendar")) {
        showNotification("Opening calendar...", "info");
      }
    });
  });

  // Contact form handling
  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const subject = this.querySelector('input[placeholder="Subject"]').value;
      const message = this.querySelector("textarea").value;

      // Validation
      if (!name || !email || !subject || !message) {
        showNotification("Please fill in all fields", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address", "error");
        return;
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.querySelector("span").textContent;
      submitBtn.querySelector("span").textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification(
          "Message sent successfully! I'll get back to you soon.",
          "success"
        );
        this.reset();
        submitBtn.querySelector("span").textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Counter animation for stats
  const statNumbers = document.querySelectorAll(".hero-stat-number");
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + (target === 100 ? "%" : "+");
    }, 50);
  };

  // Trigger counter animation when stats section is visible
  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-target"));
          animateCounter(stat, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  });

  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) {
    statsObserver.observe(heroStats);
  }

  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  // Cursor trail effect
  let cursorTrail = [];
  const maxTrailLength = 20;

  document.addEventListener("mousemove", function (e) {
    const dot = document.createElement("div");
    dot.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--gradient-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 3}px;
            top: ${e.clientY - 3}px;
            transition: all 0.1s ease;
        `;

    document.body.appendChild(dot);
    cursorTrail.push(dot);

    if (cursorTrail.length > maxTrailLength) {
      const oldDot = cursorTrail.shift();
      if (oldDot && oldDot.parentNode) {
        oldDot.parentNode.removeChild(oldDot);
      }
    }

    // Fade out trail dots
    cursorTrail.forEach((trailDot, index) => {
      const opacity = (index / cursorTrail.length) * 0.5;
      trailDot.style.opacity = opacity;
      trailDot.style.transform = `scale(${
        0.5 + (index / cursorTrail.length) * 0.5
      })`;
    });
  });

  // Typing animation for hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 2000);
  }

  // Parallax effect for hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });

  // Add CSS for notification styles
  const notificationStyles = document.createElement("style");
  notificationStyles.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
        
        .nav-link.active {
            color: var(--primary-color);
        }
        
        .nav-link.active::after {
            width: 100%;
        }

        .fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
        }
    `;
  document.head.appendChild(notificationStyles);

  // Initialize tooltips for skill items
  skillItems.forEach((item) => {
    const skillName = item.getAttribute("data-skill");
    const skillLevel = item.getAttribute("data-level");
    if (skillName) {
      item.setAttribute("title", `${skillName} - ${skillLevel}%`);
    }
  });

  // Performance optimization: Throttle scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Apply throttling to scroll events
  const throttledScrollHandler = throttle(function () {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(10, 10, 10, 0.98)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)";
      navbar.style.boxShadow = "none";
    }
  }, 16);

  window.addEventListener("scroll", throttledScrollHandler);

  console.log("✨ All JavaScript functionality initialized successfully!");

  // --- Hero Section Upgrades ---
  // Animated grid background
  window.addEventListener("DOMContentLoaded", () => {
    const gridCanvas = document.getElementById("heroGridBg");
    if (gridCanvas) {
      const ctx = gridCanvas.getContext("2d");
      function resizeGrid() {
        gridCanvas.width = gridCanvas.offsetWidth;
        gridCanvas.height = gridCanvas.offsetHeight;
      }
      function drawGrid() {
        ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
        ctx.strokeStyle = "rgba(180, 180, 255, 0.08)";
        ctx.lineWidth = 1;
        const spacing = 40;
        for (let x = 0; x < gridCanvas.width; x += spacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, gridCanvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < gridCanvas.height; y += spacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(gridCanvas.width, y);
          ctx.stroke();
        }
      }
      function animateGrid() {
        drawGrid();
        requestAnimationFrame(animateGrid);
      }
      resizeGrid();
      window.addEventListener("resize", resizeGrid);
      animateGrid();
    }

    // Floating particles
    const particlesDiv = document.querySelector(".hero-particles");
    if (particlesDiv) {
      for (let i = 0; i < 18; i++) {
        const p = document.createElement("div");
        p.className = "hero-particle";
        p.style.left = Math.random() * 100 + "%";
        p.style.top = Math.random() * 100 + "%";
        p.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
        particlesDiv.appendChild(p);
      }
    }

    // Animated counters
    document.querySelectorAll(".hero-stat-num").forEach((el) => {
      const target = +el.getAttribute("data-count");
      let count = 0;
      const step = Math.ceil(target / 40);
      function update() {
        count += step;
        if (count > target) count = target;
        el.textContent = count;
        if (count < target) requestAnimationFrame(update);
      }
      update();
    });

    // 3D tilt/parallax on profile card
    const tiltCard = document.querySelector(".hero-profile-card.tilt");
    if (tiltCard) {
      tiltCard.addEventListener("mousemove", (e) => {
        const rect = tiltCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 12;
        const rotateY = (centerX - x) / 12;
        tiltCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
      });
      tiltCard.addEventListener("mouseleave", () => {
        tiltCard.style.transform = "";
      });
    }

    // Button ripple effect
    document.querySelectorAll(".btn.ripple").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.className = "ripple-anim";
        ripple.style.left = e.offsetX - 100 + "px";
        ripple.style.top = e.offsetY - 100 + "px";
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  });

  // --- Crazy Hero Card Interactive Particles ---
  window.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".hero-profile-card.crazy-wow");
    const particlesContainer = document.querySelector(
      ".profile-card-particles"
    );
    const holoImg = document.querySelector(".profile-card-holo-img");
    if (card && particlesContainer && holoImg) {
      // Floating orbs
      for (let i = 0; i < 8; i++) {
        const orb = document.createElement("div");
        orb.className = "crazy-particle";
        orb.style.width = orb.style.height = 18 + Math.random() * 18 + "px";
        orb.style.left = 10 + Math.random() * 80 + "%";
        orb.style.top = 10 + Math.random() * 80 + "%";
        orb.style.background = `radial-gradient(circle, #fff 0%, #${
          Math.random() > 0.5 ? "8b5cf6" : "34d399"
        } 60%, transparent 100%)`;
        orb.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
        particlesContainer.appendChild(orb);
      }
      // Burst on hover/move
      card.addEventListener("mousemove", (e) => {
        const rect = holoImg.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        for (let i = 0; i < 4; i++) {
          const p = document.createElement("div");
          p.className = "crazy-particle";
          const size = 8 + Math.random() * 10;
          p.style.width = p.style.height = size + "px";
          p.style.left = "50%";
          p.style.top = "38%";
          p.style.background = `radial-gradient(circle, #fff 0%, #${
            Math.random() > 0.5 ? "8b5cf6" : "34d399"
          } 60%, transparent 100%)`;
          p.style.opacity = 0.8;
          p.style.transform = `translate(-50%, -50%)`;
          particlesContainer.appendChild(p);
          // Animate outward
          setTimeout(() => {
            p.style.transition = "all 1s cubic-bezier(.77,0,.18,1)";
            const dist = 60 + Math.random() * 40;
            p.style.left = `calc(50% + ${
              Math.cos(angle + (Math.random() - 0.5) * 0.5) * dist
            }px)`;
            p.style.top = `calc(38% + ${
              Math.sin(angle + (Math.random() - 0.5) * 0.5) * dist
            }px)`;
            p.style.opacity = 0;
          }, 10);
          setTimeout(() => p.remove(), 1100);
        }
      });
    }
  });

  // --- HERO SECTION ENHANCEMENTS ---
  window.addEventListener("DOMContentLoaded", () => {
    // Typewriter effect for subtitle
    const typewriter = document.getElementById("heroTypewriter");
    if (typewriter) {
      const textSpan = typewriter.querySelector(".typewriter-text");
      const text = textSpan.textContent;
      textSpan.textContent = "";
      let i = 0;
      function type() {
        if (i < text.length) {
          textSpan.textContent += text.charAt(i);
          i++;
          setTimeout(type, 60);
        }
      }
      setTimeout(type, 600);
    }

    // Animate floating blobs (handled by CSS, but can randomize position if desired)
    // Already handled by CSS keyframes for now

    // Animated counters for hero stats
    document.querySelectorAll(".hero-stat-num").forEach((el) => {
      const target = +el.getAttribute("data-count");
      let count = 0;
      const step = Math.ceil(target / 40);
      function update() {
        count += step;
        if (count > target) count = target;
        el.textContent = count;
        if (count < target) requestAnimationFrame(update);
      }
      update();
    });

    // Button microinteractions (ripple already present, add 3D effect)
    document.querySelectorAll(".cta-btn").forEach((btn) => {
      btn.addEventListener("mousedown", () => {
        btn.style.transform = "scale(0.97)";
      });
      btn.addEventListener("mouseup", () => {
        btn.style.transform = "";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  });

  // Typewriter animation for README.md (about-journey-text)
  const journeyText = document.querySelector(".about-journey-text");
  if (journeyText) {
    const fullText = `I'm a full stack developer driven by curiosity and a deep love for building things that matter. From sleek user interfaces to resilient backend systems, I enjoy bridging the gap between design and functionality. My journey is rooted in realworld projects, late-night debugging marathons, and an eagerness to learn beyond the classroom. I don't just code I solve problems, optimize performance, and craft experiences that users enjoy. Whether it's contributing to open source or collaborating on team projects, I'm always seeking ways to grow, give back, and push the limits of what the web can do.`;
    journeyText.textContent = "";
    let j = 0;
    function typeJourney() {
      if (j < fullText.length) {
        journeyText.textContent += fullText.charAt(j);
        j++;
        setTimeout(typeJourney, 13);
      }
    }
    setTimeout(typeJourney, 900); // Delay to start after code block
  }
});

// Global functions
function scrollToSection(sectionId) {
  const section = document.querySelector(`#${sectionId}`);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openProject(projectType) {
  const projectNames = {
    ecommerce: "E-Commerce Platform",
    taskmanager: "Task Management App",
    analytics: "Analytics Dashboard",
    chat: "Real-time Chat App",
  };

  const projectName = projectNames[projectType] || "Project";
  showNotification(`Opening ${projectName}...`, "info");
}

function showFeature(feature) {
  showNotification(`Feature: ${feature}`, "info");
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Copied to clipboard:", text);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
}

function showLocation() {
  showNotification("Location: Mumbai, India", "info");
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    info: "#3b82f6",
    warning: "#f59e0b",
  };

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// --- About Section Interactivity ---
function copyAboutCode() {
  const codeBlock = document.getElementById("aboutCodeBlock");
  if (!codeBlock) return;
  const text = codeBlock.innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector(".copy-code-btn");
    if (btn) {
      btn.classList.add("copied");
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = '<i class="fas fa-copy"></i>';
      }, 1200);
    }
  });
}

// --- About Code Block Typewriter Animation ---
window.addEventListener("DOMContentLoaded", () => {
  const codeBlock = document.querySelector("#aboutCodeBlock code");
  if (codeBlock) {
    const originalHTML = `<span class="code-key">const</span> <span class="code-var">developer</span> <span class="code-eq">=</span> <span class="code-brace">&#123;</span>\n  <span class="code-prop styled-prop">name</span>: <span class="code-str link-str">\"Sumit Jalan\"</span>,\n  <span class="code-prop styled-prop">role</span>: <span class="code-str link-str">\"Full Stack Developer\"</span>,\n  <span class="code-prop styled-prop">location</span>: <span class="code-str link-str">\"Lucknow, India\"</span>,\n  <span class="code-prop styled-prop">degree</span>: <span class="code-str link-str">\"B.Tech Computer Science\"</span>,\n  <span class="code-prop styled-prop">experience</span>: <span class="code-str link-str">\"2+ Years\"</span>,\n  <span class="code-prop styled-prop">skills</span>: [\n    <span class="code-str">\"React\"</span>, <span class="code-str">\"Node.js\"</span>, <span class="code-str">\"TypeScript\"</span>,\n    <span class="code-str">\"MongoDB\"</span>, <span class="code-str">\"Express.js\"</span>, <span class="code-str">\"AWS\"</span>,\n    <span class="code-str">\"Tailwind CSS\"</span>, <span class="code-str">\"PostgreSQL\"</span>, <span class="code-str">\"Docker\"</span>, <span class="code-str">\"Git\"</span>, <span class="code-str">\"REST APIs\"</span>, <span class="code-str">\"C\"</span>, <span class="code-str">\"C++\"</span>\n  ],\n  <span class="code-prop styled-prop">passion</span>: <span class="code-str link-str">\"Building modern web apps with intuitive UI & scalable backend\"</span>,\n  <span class="code-prop styled-prop">status</span>: <span class="code-str link-str">\"Available\"</span>,\n  <span class="code-prop styled-prop">portfolio</span>: <span class="code-str link-str">\"https://sumitjalan.dev\"</span>,\n  <span class="code-prop styled-prop">github</span>: <span class="code-str link-str">\"https://github.com/Sumitjalan35\"</span>,\n  <span class="code-prop styled-prop">linkedin</span>: <span class="code-str link-str">\"https://linkedin.com/in/sumitjalan\"</span>,\n  <span class="code-prop styled-prop">email</span>: <span class="code-str link-str">\"sumitjalan@example.com\"</span>,\n  <span class="code-prop styled-prop">languages</span>: [<span class="code-str">\"English\"</span>, <span class="code-str">\"Hindi\"</span>],\n  <span class="code-prop styled-prop">interests</span>: [<span class="code-str">\"Open Source\"</span>, <span class="code-str">\"UI/UX Design\"</span>, <span class="code-str">\"AI Integration\"</span>],\n  <span class="code-prop styled-prop">currentlyLearning</span>: [<span class="code-str">\"Backend Development\"</span>, <span class="code-str">\"Next.js\"</span>, <span class="code-str">\"Prisma\"</span>],\n  <span class="code-prop styled-prop">projectsCount</span>: <span class="code-str">\"5+\"</span>,\n  <span class="code-prop styled-prop">motto</span>: <span class="code-str">\"Code. Create. Collaborate.\"</span>\n<span class="code-brace">&#125;</span>`;
    codeBlock.innerHTML = "";
    let i = 0;
    // Split HTML by character, but preserve tags
    const chars = [];
    let tag = false,
      charBuffer = "";
    for (let c of originalHTML) {
      if (c === "<") tag = true;
      if (!tag) {
        chars.push(c);
      } else {
        charBuffer += c;
      }
      if (c === ">") {
        tag = false;
        chars.push(charBuffer);
        charBuffer = "";
      }
    }
    function typeWriter() {
      if (i < chars.length) {
        codeBlock.innerHTML += chars[i];
        i++;
        setTimeout(typeWriter, 13); // Typing speed
      } else {
        // After typing, make links clickable
        makeLinksClickable();
      }
    }
    setTimeout(typeWriter, 600); // Delay before typing starts
    function makeLinksClickable() {
      const linkMap = {
        'portfolio': { href: 'https://sumitjalan.dev', target: '_blank' },
        'github': { href: 'https://github.com/Sumitjalan35', target: '_blank' },
        'linkedin': { href: 'https://linkedin.com/in/sumitjalan', target: '_blank' },
        'email': { href: 'mailto:sumitjalan@example.com', target: '_blank' }
      };
      Object.keys(linkMap).forEach((key) => {
        const prop = codeBlock.querySelector(`.code-prop:contains('${key}')`);
        if (prop) {
          const str = prop.nextElementSibling;
          if (str && str.classList.contains('link-str')) {
            const url = linkMap[key].href;
            const isEmail = key === 'email';
            const display = str.innerHTML.replace(/&quot;|\"/g, '');
            str.innerHTML = `<a href="${url}" target="${linkMap[key].target}" style="color:#8b5cf6;text-decoration:underline;word-break:break-all;">${display}</a>`;
          }
        }
      });
    }
    // Add style for .styled-prop
    const style = document.createElement('style');
    style.textContent = `.styled-prop { font-family: 'Fira Mono', 'JetBrains Mono', 'Menlo', 'Consolas', monospace; font-weight: 900; color: #a18fff; letter-spacing: 0.03em; font-size: 1.08em; background: linear-gradient(90deg,#43e9fe22 0%,#a18fff22 100%); border-radius: 4px; padding: 0 0.2em; }`;
    document.head.appendChild(style);
  }
  // Animate About stats counter
  const aboutStats = document.querySelectorAll(".about-stat-number");
  aboutStats.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target"));
    if (!isNaN(target)) {
      let current = 0;
      const increment = Math.max(1, Math.floor(target / 40));
      const update = () => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + "+";
        } else {
          stat.textContent = current + "+";
          requestAnimationFrame(update);
        }
      };
      update();
    }
  });
});
