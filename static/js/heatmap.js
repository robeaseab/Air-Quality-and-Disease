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
  center: [41.881832, -40.623177],
  zoom: 2
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 20,
  id: "mapbox.streets",
  accessToken: MAPBOX_API_KEY
}).addTo(myMap);

var url = `/world`
var heatArray = [];
var lats = [];
var lngs = [];
var latLngs = [];
var PM = [];

d3.json(url, function (error, airData) {
  if (error) return console.warn(error);
  console.log("hey hey", airData)
  console.log("hey length", airData.lat.length)

  for (var i = 0; i < airData.lat.length; i++) {
    var lat = +airData.lat[i];
    var lng = +airData.lng[i];
    var PMl = +airData.PM25[i];
    var latLng = L.latLng(lat, lng);
    lats.push(lat);
    lngs.push(lng);
    PM.push(PMl);
    latLngs.push(latLng)

    // Define a markerSize function that will give each quake a different radius based on its mag

    function markerColor(PMl) {
      if (PMl >= 250.4) {
        return "#7e0023";
      }
      else if (PMl >= 150.4) {
        return "#8f3f97";
      }
      else if (PMl >= 55.4) {
        return "#ff0000";
      }
      else if (PMl >= 35.4) {
        return "#ff7e00";
      }
      else if (PMl >= 12.0) {
        return "#ffff00";
      }
      else {
        return "#00e400";
      }

    }


    function markerSize(PMl) {
      return PMl * 2000;
    }

    L.circle(latLng, {
      fillOpacity: .30,
      color: markerColor(PMl),
      fillColor: markerColor(PMl),
      // Setting our circle's radius equal to the output of our markerSize function
      radius: markerSize(PMl)
    }).bindPopup("<h3>Date:  " + airData.date[i] + "</h3><h1>PM 2.5:  " + PMl + "</h1>").addTo(myMap);
  }
  console.log("PM", PM)
});


var legend = L.control({ position: 'bottomleft' });
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    scale = ["#00e400", "#ffff00", "#ff7e00", "#ff0000", "#8f3f97", "#7e0023"],
    labels = ["Good", "Moderate", "Unhealthy for Sensitive Groups", "Unhealthy", "Very Unhealthy", "Hazardous"];

  for (var i = 0; i < scale.length; i++) {
    div.innerHTML +=
      '<i style="background:' + scale[i] + '"></i>' + labels[i] + '<br>';
  }
  return div;
};
legend.addTo(myMap);