document.addEventListener('DOMContentLoaded', () => {

    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.event-card[data-delta]');
    const details = document.querySelectorAll('.detail-block[data-delta]');

    const activeFilters = new Set(['rms','nile','mekong']);

    function updateView() {

        cards.forEach(card => {

            const delta = card.dataset.delta;

            if(activeFilters.has(delta)) {
                card.classList.remove('is-hidden');
            } else {
                card.classList.add('is-hidden');
            }

        });

        details.forEach(detail => {

            const delta = detail.dataset.delta;

            if(activeFilters.has(delta)) {
                detail.classList.remove('is-hidden');
            } else {
                detail.classList.add('is-hidden');
            }

        });

    }

    buttons.forEach(button => {

        button.addEventListener('click', () => {

            const filter = button.dataset.filter;

            if(filter === "all") {

                activeFilters.clear();
                activeFilters.add("rms");
                activeFilters.add("nile");
                activeFilters.add("mekong");

                updateView();
                return;
            }

            if(activeFilters.has(filter)) {

                if(activeFilters.size > 1) {
                    activeFilters.delete(filter);
                }

            } else {

                activeFilters.add(filter);

            }

            updateView();

        });

    });

    updateView();

});