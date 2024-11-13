// Assuming geojsonCoordinates is in GeoJSON format: [longitude, latitude]
const leafletCoordinates = [coordinates[0][1], coordinates[0][0]];// Swap the coordinates for Leaflet


// Initialize the map and set its view to London
const map = L.map('map').setView(leafletCoordinates, 13);

// Add OpenStreetMap tiles to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Add a marker to the map
const marker = L.marker(leafletCoordinates).addTo(map)
.bindPopup('Exact location provided after booking.');
