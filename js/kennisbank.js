(function () {
    const zoekInput      = document.getElementById('zoekInput');
    const zoekBtn        = document.getElementById('zoekBtn');
    const filterBtn      = document.getElementById('filterBtn');
    const filterLabel    = document.getElementById('filterLabel');
    const filterDropdown = document.getElementById('filterDropdown');
    const filterOpties   = document.querySelectorAll('.filter-optie');
    const kaarten        = document.querySelectorAll('.artikel-kaart');
    const geenResultaten = document.getElementById('geenResultaten');
    const teller         = document.getElementById('resultaatTeller');

    let actieveFilter = 'alles';

    // ── Filterdropdown openen/sluiten ──────────────────────────
    filterBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = filterDropdown.classList.toggle('open');
        filterBtn.setAttribute('aria-expanded', isOpen);
    });

    // Sluit dropdown bij klik buiten
    document.addEventListener('click', function () {
        filterDropdown.classList.remove('open');
        filterBtn.setAttribute('aria-expanded', 'false');
    });

    filterDropdown.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // ── Filteroptie selecteren ─────────────────────────────────
    filterOpties.forEach(function (optie) {
        optie.addEventListener('click', function () {
            filterOpties.forEach(function (o) { o.classList.remove('actief'); });
            optie.classList.add('actief');
            actieveFilter = optie.dataset.waarde;
            filterLabel.textContent = optie.textContent;
            filterDropdown.classList.remove('open');
            filterBtn.setAttribute('aria-expanded', 'false');
            filterEnZoek();
        });

        // Toetsenbord: Enter of Spatie activeert optie
        optie.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                optie.click();
            }
        });
    });

    // ── Zoeken bij klik op knop of Enter in input ──────────────
    zoekBtn.addEventListener('click', filterEnZoek);

    zoekInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') filterEnZoek();
    });

    // Live zoeken terwijl je typt
    zoekInput.addEventListener('input', filterEnZoek);

    // ── Hoofd filter + zoek functie ────────────────────────────
    function filterEnZoek() {
        const zoekterm = zoekInput.value.toLowerCase().trim();
        let aantalZichtbaar = 0;

        kaarten.forEach(function (kaart) {
            const deltaKaart  = kaart.dataset.delta;
            const zoektekst   = (kaart.dataset.zoektekst || '').toLowerCase();
            const titelTekst  = kaart.querySelector('.artikel-titel')
                                  ? kaart.querySelector('.artikel-titel').textContent.toLowerCase()
                                  : '';
            const metaTekst   = kaart.querySelector('.artikel-meta')
                                  ? kaart.querySelector('.artikel-meta').textContent.toLowerCase()
                                  : '';

            const deltaMatch = (actieveFilter === 'alles') || (deltaKaart === actieveFilter);
            const zoekMatch  = !zoekterm ||
                               zoektekst.includes(zoekterm) ||
                               titelTekst.includes(zoekterm) ||
                               metaTekst.includes(zoekterm);

            if (deltaMatch && zoekMatch) {
                kaart.classList.remove('verborgen');
                aantalZichtbaar++;
            } else {
                kaart.classList.add('verborgen');
            }
        });

        // Resultaatteller bijwerken
        if (zoekterm || actieveFilter !== 'alles') {
            teller.textContent = aantalZichtbaar + ' publicatie' +
                                 (aantalZichtbaar !== 1 ? 's' : '') + ' gevonden';
        } else {
            teller.textContent = '';
        }

        // Geen-resultaten melding
        geenResultaten.hidden = aantalZichtbaar > 0;
    }

})();
