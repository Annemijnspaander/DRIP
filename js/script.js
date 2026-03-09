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

// Sluit het menu ook wanneer er op een thema wordt geklikt
const themeLinks = document.querySelectorAll(".menu a");
themeLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

