document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".contact-choice");
    const panels = document.querySelectorAll(".contact-panel-toggle");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.dataset.target;
            const targetPanel = document.getElementById(targetId);

            buttons.forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-expanded", "false");
            });

            panels.forEach(panel => {
                panel.classList.remove("is-open");
                panel.hidden = true;
            });

            this.classList.add("active");
            this.setAttribute("aria-expanded", "true");

            if (targetPanel) {
                targetPanel.hidden = false;
                targetPanel.classList.add("is-open");
            }
        });
    });
});