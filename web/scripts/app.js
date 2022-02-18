
var markers = [];

console.log(markers)
console.log(typeof markers)

let mapOptions = {
    center:[-16.57650446085035, -64.90850859197836],
    zoom:3,
}

let map = new L.map('map', mapOptions);
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');


fetch('http://localhost:3000/coorddata')
    .then(response => {return response.json()})
    .then(data => {
        

        data['markers'].forEach(mark =>{
            
            let marker = new L.Marker(mark);

            markers.push([[marker['lat'], marker['lng']]])
            
            marker.addTo(map);

        })

    })
    .catch(err => console.log(err))

map.addLayer(layer);

