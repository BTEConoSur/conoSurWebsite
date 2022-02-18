const kmlextractor = require('./kmlextractor');

const express= require('express')
const path = require('path');
const app = express();


app.use(express.static(__dirname + '/web'));

app.get('/', function(req,res){

    res.sendFile(path.join('./web/index.html'));
    //res.json('this is my webscraper')

})

app.get('/coorddata', async function(req,res){

    const archivo = await kmlextractor.readKML('BuildTheEarth__Chile.kml');
    
    res.json(archivo)
    
})

app.listen(3000)
console.log('Server started at http://localhost:' + '3000');
