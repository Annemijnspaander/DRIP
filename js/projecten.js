document.addEventListener("DOMContentLoaded", function () {
 
  // ── Burger menu ──
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const overlay = document.getElementById("overlay");
 
  function toggleMenu() {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
  }
  const menuSluit = document.getElementById("menuSluit");
if (menuSluit) menuSluit.addEventListener("click", closeMenu);
 
  function closeMenu() {
    menu.classList.remove("active");
    overlay.classList.remove("active");
  }
 
  if (burger) burger.addEventListener("click", toggleMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);
 
  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
 
  // ── Card expand/collapse ──
  // Must be on window because HTML calls onclick="toggleCard(...)"
  window.toggleCard = function (id) {
    const card = document.getElementById(id);
    if (card) card.classList.toggle("open");
  };
 
  // ── Active nav link highlight ──
  document.querySelectorAll(".hp-nav a").forEach(anchor => {
    anchor.addEventListener("click", function () {
      document.querySelectorAll(".hp-nav a").forEach(a => a.classList.remove("active"));
      this.classList.add("active");
    });
  });
 
  // ── Scroll effects (hero fade + delta vlakken) ──
  const heroOverlay = document.getElementById("heroOverlay");
  const vlakken = document.querySelectorAll(".delta-vlak");
  const deltaIntro = document.getElementById("deltaIntro");
 
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
 
    const fadePct = Math.min(scrollY / (vh * 0.3), 1);
    if (heroOverlay) heroOverlay.style.opacity = 1 - fadePct;
 
    if (deltaIntro) {
      const introTop = deltaIntro.getBoundingClientRect().top;
      if (introTop < vh * 0.85) {
        vlakken.forEach(v => v.classList.add("zichtbaar"));
      }
    }
  });
 
});
 