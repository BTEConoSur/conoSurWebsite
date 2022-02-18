const kmlextractor = require('./kmlextractor');
const PORT = 3000;
const express= require('express')
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/web'));

app.get('/', function(req,res){

    res.sendFile(path.join('./web/index.html'));

});

app.get('/coorddata', async function(req,res){

    const archivo = await kmlextractor.readKML('BuildTheEarth__Chile.kml');
    
    res.json(archivo);
    
});

app.listen(PORT);

console.log('Server started at http://localhost:' + PORT);
