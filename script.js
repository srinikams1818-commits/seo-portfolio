// ===== GSAP Scroll Reveal Setup =====
gsap.registerPlugin(ScrollTrigger);

// Utility: Reset ScrollTriggers on resize
ScrollTrigger.config({ ignoreMobileResize: true });
ScrollTrigger.clearScrollMemory('manual');

// 1. HERO SECTION — Staggered entrance
gsap.from(".hero-title", {
  opacity: 0,
  y: 40,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".hero-text", {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.3,
  ease: "power2.out"
});

gsap.from(".hero-cta .btn", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  stagger: 0.2,
  delay: 0.6,
  ease: "power2.out"
});

gsap.from(".hero-img", {
  opacity: 0,
  scale: 0.9,
  duration: 1.2,
  delay: 0.8,
  ease: "back.out(1.4)"
});

// 2. ABOUT SECTION
gsap.from(".about-text", {
  scrollTrigger: {
    trigger: ".about-text",
    start: "top 85%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  x: -60,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".about-stats", {
  scrollTrigger: {
    trigger: ".about-stats",
    start: "top 85%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  x: 60,
  duration: 1,
  ease: "power3.out"
});

// 3. SKILLS SECTION — Skill bars animate on scroll
gsap.utils.toArray(".skill-progress").forEach(bar => {
  gsap.from(bar, {
    scrollTrigger: {
      trigger: bar,
      start: "top 90%",
      toggleActions: "play none none none"
    },
    width: 0,
    duration: 1.2,
    ease: "power2.out"
  });
});

// Animate skill cards
gsap.from(".skills-grid .card", {
  scrollTrigger: {
    trigger: ".skills-grid",
    start: "top 80%"
  },
  opacity: 0,
  y: 40,
  stagger: 0.2,
  duration: 0.8,
  ease: "power2.out"
});

// 4. PROJECTS SECTION — Staggered zoom-in
gsap.from(".project-card", {
  scrollTrigger: {
    trigger: ".projects-grid",
    start: "top 80%"
  },
  opacity: 0,
  scale: 0.9,
  y: 30,
  stagger: 0.2,
  duration: 0.8,
  ease: "back.out(1.2)"
});

// 5. CASE STUDY SECTION
gsap.from(".case-card", {
  scrollTrigger: {
    trigger: ".case-grid",
    start: "top 80%"
  },
  opacity: 0,
  x: (i) => (i === 0 ? -50 : 50),
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});

// Results animate with counter (already handled by IntersectionObserver)
// But we'll ensure they're revealed smoothly
gsap.from(".results-grid", {
  scrollTrigger: {
    trigger: ".results-grid",
    start: "top 85%"
  },
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: "power2.out"
});

// 6. EDUCATION SECTION — Timeline fade up
gsap.from(".timeline-item", {
  scrollTrigger: {
    trigger: ".edu-grid",
    start: "top 85%"
  },
  opacity: 0,
  y: 20,
  stagger: 0.15,
  duration: 0.7,
  ease: "power2.out"
});

// 7. CONTACT SECTION
gsap.from(".contact-form", {
  scrollTrigger: {
    trigger: ".contact-grid",
    start: "top 85%"
  },
  opacity: 0,
  x: -40,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".contact-info", {
  scrollTrigger: {
    trigger: ".contact-grid",
    start: "top 85%"
  },
  opacity: 0,
  x: 40,
  duration: 1,
  delay: 0.2,
  ease: "power3.out"
});

// 8. FOOTER — Simple fade
gsap.from("footer", {
  scrollTrigger: {
    trigger: "footer",
    start: "top 90%"
  },
  opacity: 0,
  y: 20,
  duration: 0.8,
  ease: "power2.out"
});

// ===== Keep your existing code below =====

// Typed.js (unchanged)
new Typed('.typing-text', {
  strings: [
    'a Technical SEO Specialist',
    'a Frontend Developer',
    'a Digital Growth Architect',
    'focused on building fast, ranking websites'
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
  startDelay: 1000
});

// Mobile menu, scroll header, scroll-to-top (unchanged)
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const scrollToTopBtn = document.getElementById('scrollToTop');
const scrollProgress = document.getElementById('scrollProgress');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / scrollHeight) * 100;
  scrollProgress.style.width = `${scrolled}%`;

  if (window.scrollY > 400) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Stats counter animation (enhanced to work with GSAP timing)
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = end <= 10 ? 
      (progress * (end - start) + start).toFixed(2) :
      Math.floor(progress * (end - start) + start);
    element.textContent = end <= 10 ? `#${value}` : value;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Trigger counters when results are in view
const resultObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-value[data-target]').forEach(el => {
        const target = parseFloat(el.getAttribute('data-target'));
        animateValue(el, 0, target, 2000);
      });
      document.querySelectorAll('.result-value[data-target]').forEach(el => {
        const target = parseFloat(el.getAttribute('data-target'));
        animateValue(el, 0, target, 2000);
      });
      resultObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

resultObserver.observe(document.querySelector('.results-grid'));

// Form submission
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Message sent! (In production, this would email you.)');
});