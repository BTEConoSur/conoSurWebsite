var markers = [];

let mapOptions = {
    center:[-33.97528470931967, -70.70828607706429],
    zoom:4,
}

let map = new L.map('map', mapOptions);


const deflate_features = L.deflate({minSize: 20});

deflate_features.addTo(map);

let markerslayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {minZoom:4});
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {minZoom:4});

var polygon = null;
var polygons = [];

fetch('http://localhost:3000/coorddata')
    .then(response => {return response.json()})
    .then(data => {
        
        data['markers'].forEach(mark =>{

            setTimeout(() => {
                       
                const marker = new L.Marker(mark, {});
                map.addLayer(marker);

            }, 1000);
            
        })

        const datPol = data['polygons'];

        for (let i = 0; i < 51; i++){
        
            polygons[i] = L.polygon(datPol.splice(0, 50), {color: 'yellow', fill: false, fillColor:'yellow', weight:5., opacity:10, fillOpacity:20, smoothFactor:2.0});
        
        };
        
    })
    .catch(err => console.log(err))

map.on("zoomend", function () {

    var newMapZoom = map.getZoom();

    try{

        if (newMapZoom < 8.5) {

            polygons.forEach(polygon =>{
                
                setTimeout(() => {
                    map.removeLayer(polygon)

                }, 100);

            })
        } else {
            // Removing entire geoJson layer that contains the points.
            
            polygons.forEach(polygon =>{

                setTimeout(() => {
                    map.addLayer(polygon);

                }, 100);

            });     
        
    }}catch{
        
    };
});

map.addLayer(markerslayer);

