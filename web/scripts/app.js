

var markers = [];

console.log(markers)
console.log(typeof markers)

let mapOptions = {
    center:[-33.97528470931967, -70.70828607706429],
    zoom:4,
}

let map = new L.map('map', mapOptions);


const deflate_features = L.deflate({minSize: 20});

deflate_features.addTo(map);

let markerslayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

var polygon = null;

fetch('http://localhost:3000/coorddata')
    .then(response => {return response.json()})
    .then(data => {
        
        data['markers'].forEach(mark =>{
            
            const marker = new L.Marker(mark, {});
            map.addLayer(marker)

            
        })

        polygon = L.polygon(data['polygons'], {color: 'yellow', weight:10, opacity:50, fillOpacity:50});
        
    })
    .catch(err => console.log(err))



map.on("zoomend", function () {

    var newMapZoom = map.getZoom();

    if (newMapZoom < 14.5) {
        
        map.removeLayer(polygon)

    } else {
        // Removing entire geoJson layer that contains the points.
        
        map.addLayer(polygon)
        
    }
});

map.addLayer(markerslayer)


