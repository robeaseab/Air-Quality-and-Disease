var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper
var svg = d3
  .select("#map")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  
var myMap = L.map("map", {
  center: [41.881832, -87.623177],
  zoom: 2
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: MAPBOX_API_KEY
}).addTo(myMap);

var file = "static/js/worldairdata.csv";
var heatArray = [];
var lat = [];
var lng = [];
var latlng = [];
var PM = [];

// Load data from hours-of-tv-watched.csv
d3.csv(file, function(error, airData) {
  if (error) return console.warn(error);

  // console.log(airData);
    for (var i = 0; i < airData.length; i++) {
      lat.push(airData[i].lat);
      lng.push(airData[i].lng);
      var PMl = +airData[i].PM25
      PM.push(PMl);
      latlng.push(L.latLng(lat, lng));
      heatArray.push(latlng);
    }
      
    
    console.log(heatArray);
    console.log(PM);
    
      
    
      var heat = L.heatLayer(lat, lng, PM, {radius: 5}).addTo(map);
    
});







  



    
