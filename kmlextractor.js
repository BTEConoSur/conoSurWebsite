const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;
const express = require('express');
const app = express();

async function readKML(name) {

    let kmlString = fs.readFileSync(name).toString();

    let googlePolygons = [];
    let googleMarkers = [];

    var xmlDoc = null; 

    //Parse the kml 
    try { 
        //Internet Explorer 
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); 
        xmlDoc.async="false"; 
        xmlDoc.loadXML(kmlString); 
    } catch(e) { 
        try { 
        //Firefox, etc. 
        var parser = new DOMParser(); 
        xmlDoc = parser.parseFromString(kmlString,"text/kml"); 
        } 
        catch(e) { 
        //Failed to parse 
        alert(e.message); 
        return; 
        } 
    } 

    const placemark = xmlDoc.getElementsByTagName('Placemark');
    const polygon = xmlDoc.getElementsByTagName('Polygon');
    
    // console.log(placemark.toString())
    placemarkArray = [];
    polygonArray = [];
    namesArray = [];
    
    for(let i = 0; i < placemark.length; i++){

        if (placemark[i] == undefined && polygon[i] == undefined){

            break;
        }
        if (placemark[i] != undefined){
            placemarkArray.push(placemark[i]);
        };
        if (polygon[i] != undefined){
            polygonArray.push(polygon[i]);
        };

    };

    if (xmlDoc.documentElement.nodeName == "kml") {

        for (const item of placemarkArray) {

            let markers = item.getElementsByTagName('Point');
            
            /** POLYGONS PARSE **/
            for (const polygon of polygonArray) {
                let coords = polygon.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim();
                let points = coords.split(" ");

                let googlePolygonsPaths = [];
                for (const point of points) {
                    let coord = point.split(",");
                    googlePolygonsPaths.push({ lat: +coord[1], lng: +coord[0] });
                };
                googlePolygons.push(googlePolygonsPaths);
            };
            

            /** MARKER PARSE **/

            let markersArrray = [];

            for(let i = 0; i <1000; i++){

                if (markers[i] == undefined){
        
                    break;
                };                    
                
                markersArrray.push(markers[i]);;
        
            };
            
            for (const marker of markersArrray) {
                var coords = marker.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim();
                let coord = coords.split(",");
                googleMarkers.push({ lat: +coord[1], lng: +coord[0] });
            };
        }
    } else {
        throw "error while parsing";
    }

    // console.log({ markers: googleMarkers, polygons: googlePolygons});

    const result = { markers: googleMarkers, polygons: googlePolygons};

    return result;
}

module.exports.readKML = readKML;