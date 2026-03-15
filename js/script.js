const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");

function toggleMenu() {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
}
function closeMenu() {
    menu.classList.remove("active");
    overlay.classList.remove("active");
}

burger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", closeMenu);

const themeLinks = document.querySelectorAll(".menu a");
themeLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Hero-tekst vervaagt bij scrollen, delta-vlakken komen in beeld
const heroOverlay = document.getElementById("heroOverlay");
const vlakken = document.querySelectorAll(".delta-vlak");
const deltaIntro = document.getElementById("deltaIntro");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    // DRIP-tekst vervaagt in eerste 30% van scroll
    const fadePct = Math.min(scrollY / (vh * 0.3), 1);
    if (heroOverlay) heroOverlay.style.opacity = 1 - fadePct;

    // Vlakken schuiven in beeld zodra ze in de viewport komen
    if (deltaIntro) {
        const introTop = deltaIntro.getBoundingClientRect().top;
        if (introTop < vh * 0.85) {
            vlakken.forEach(v => v.classList.add("zichtbaar"));
        }
    }
});