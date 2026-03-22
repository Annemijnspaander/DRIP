document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".legend button")
    const cards = document.querySelectorAll(".event-card")
    const blocks = document.querySelectorAll(".detail-block")

    buttons.forEach(btn => {

        btn.addEventListener("click", () => {

            const filter = btn.dataset.filter

            buttons.forEach(b => b.classList.remove("active"))
            btn.classList.add("active")

            cards.forEach(card => {

                if (
                    filter === "all" ||
                    card.dataset.delta === filter
                ) {
                    card.style.display = ""
                } else {
                    card.style.display = "none"
                }

            })

            blocks.forEach(block => {

                if (
                    filter === "all" ||
                    block.dataset.delta === filter
                ) {
                    block.style.display = ""
                } else {
                    block.style.display = "none"
                }

            })

        })

    })

})
document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.querySelector(".timeline-shell");
    if (!timeline) return;

    function updateTimelineCompact() {
        if (window.scrollY > 220) {
            timeline.classList.add("is-compact");
        } else {
            timeline.classList.remove("is-compact");
        }
    }

    window.addEventListener("scroll", updateTimelineCompact);
    updateTimelineCompact();
});