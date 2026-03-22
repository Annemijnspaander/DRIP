function createMap(id) {
    const element = document.getElementById(id);
    if (!element) return null;

    const map = L.map(id, {
        zoomControl: true,
        preferCanvas: true
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap & CARTO",
        subdomains: "abcd",
        maxZoom: 20
    }).addTo(map);

    return map;
}

function makeFAIcon(iconClass, colorClass) {
    return L.divIcon({
        className: "custom-div-icon",
        html: `<i class="${iconClass} ${colorClass}"></i>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -10]
    });
}

const icons = {
    dam_rms: makeFAIcon("fa-solid fa-arrow-up-from-water-pump", "icon-rms"),
    dam_nijl: makeFAIcon("fa-solid fa-arrow-up-from-water-pump", "icon-nijl"),
    dam_mekong: makeFAIcon("fa-solid fa-arrow-up-from-water-pump", "icon-mekong"),

    conflict_rms: makeFAIcon("fa-solid fa-xmarks-lines", "icon-rms"),
    conflict_nijl: makeFAIcon("fa-solid fa-xmarks-lines", "icon-nijl"),
    conflict_mekong: makeFAIcon("fa-solid fa-xmarks-lines", "icon-mekong"),

    delta_rms: makeFAIcon("fa-solid fa-location-dot", "icon-rms"),
    delta_nijl: makeFAIcon("fa-solid fa-location-dot", "icon-nijl"),
    delta_mekong: makeFAIcon("fa-solid fa-location-dot", "icon-mekong")
};

function addMarkersAndFit(map, points) {
    if (!map || !points.length) return;

    const layers = [];

    points.forEach(point => {
        const marker = L.marker(point.coords, { icon: point.icon }).addTo(map);
        marker.bindPopup(`
            <div class="map-popup">
                <div class="tag ${point.tag}">${point.delta}</div>
                <h4>${point.title}</h4>
                <p>${point.text}</p>
            </div>
        `);
        layers.push(marker);
    });

    const group = L.featureGroup(layers);
    map.fitBounds(group.getBounds(), { padding: [30, 30] });

    setTimeout(() => {
        map.invalidateSize();
        map.fitBounds(group.getBounds(), { padding: [30, 30] });
    }, 200);
}

document.addEventListener("DOMContentLoaded", function () {
    const rmsMap = createMap("map-rms");
    const nileMap = createMap("map-nile");
    const mekongMap = createMap("map-mekong");

    const rmsPoints = [
        {
            coords: [47.56, 7.59],
            title: "Boven-Rijn / Basel",
            text: "Bovenstrooms knooppunt voor afvoer en internationale coördinatie.",
            icon: icons.conflict_rms,
            tag: "tag-rms",
            delta: "Rijn-Maas-Schelde"
        },
        {
            coords: [51.95, 4.14],
            title: "Maeslantkering",
            text: "Cruciaal waterveiligheidswerk in de Nederlandse delta.",
            icon: icons.dam_rms,
            tag: "tag-rms",
            delta: "Rijn-Maas-Schelde"
        },
        {
            coords: [51.64, 3.71],
            title: "Oosterscheldekering",
            text: "Belangrijk spanningspunt tussen veiligheid en ecologie.",
            icon: icons.dam_rms,
            tag: "tag-rms",
            delta: "Rijn-Maas-Schelde"
        },
        {
            coords: [51.98, 4.12],
            title: "Rotterdamse delta",
            text: "Benedenstrooms gebied waar afvoer, verzilting en economie samenkomen.",
            icon: icons.delta_rms,
            tag: "tag-rms",
            delta: "Rijn-Maas-Schelde"
        }
    ];

    const nilePoints = [
        {
            coords: [11.21, 35.09],
            title: "GERD",
            text: "Grote dam met invloed op afvoerregime en regionale spanningen.",
            icon: icons.dam_nijl,
            tag: "tag-nijl",
            delta: "Nijl"
        },
        {
            coords: [15.60, 32.53],
            title: "Khartoem",
            text: "Strategisch knooppunt voor waterverdeling tussen Blauwe en Witte Nijl.",
            icon: icons.conflict_nijl,
            tag: "tag-nijl",
            delta: "Nijl"
        },
        {
            coords: [23.97, 32.88],
            title: "Aswandam",
            text: "Reguleert wateropslag maar beperkt sedimentaanvoer naar de delta.",
            icon: icons.dam_nijl,
            tag: "tag-nijl",
            delta: "Nijl"
        },
        {
            coords: [30.90, 31.10],
            title: "Nijl-delta",
            text: "Kwetsbaar benedenstrooms gebied met verziltings- en overstromingsrisico.",
            icon: icons.delta_nijl,
            tag: "tag-nijl",
            delta: "Nijl"
        }
    ];

    const mekongPoints = [
        {
            coords: [25.02, 100.55],
            title: "Gongguoqiao Dam",
            text: "Onderdeel van de Chinese cascade in de bovenloop.",
            icon: icons.dam_mekong,
            tag: "tag-mekong",
            delta: "Mekong"
        },
        {
            coords: [24.79, 100.97],
            title: "Xiaowan Dam",
            text: "Grote opslagdam met invloed op seizoensregime en afvoer.",
            icon: icons.dam_mekong,
            tag: "tag-mekong",
            delta: "Mekong"
        },
        {
            coords: [22.64, 100.70],
            title: "Nuozhadu Dam",
            text: "Groot reservoir met invloed op sediment en waterstanden.",
            icon: icons.dam_mekong,
            tag: "tag-mekong",
            delta: "Mekong"
        },
        {
            coords: [19.25, 101.80],
            title: "Laotiaanse damcorridor",
            text: "Belangrijk spanningspunt rond hydropower en regionale afhankelijkheid.",
            icon: icons.conflict_mekong,
            tag: "tag-mekong",
            delta: "Mekong"
        },
        {
            coords: [10.20, 105.90],
            title: "Mekong-delta",
            text: "Benedenstrooms gebied met risico op verzilting en sedimenttekort.",
            icon: icons.delta_mekong,
            tag: "tag-mekong",
            delta: "Mekong"
        }
    ];

    addMarkersAndFit(rmsMap, rmsPoints);
    addMarkersAndFit(nileMap, nilePoints);
    addMarkersAndFit(mekongMap, mekongPoints);
});