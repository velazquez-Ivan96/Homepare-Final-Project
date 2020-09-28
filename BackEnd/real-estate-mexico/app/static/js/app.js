// Creating map object
var myMap = L.map("mapid", {
  center: [19.4326, -99.13],
  zoom: 8
});
// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);
// Load in GeoJson data
var geoData = "static/data/mun_indicators.geojson";
var geojson;

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

function style(feature) {
  return {
      //fillColor: getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}


function zoomToFeature(e) {
  myMap.fitBounds(e.target.getBounds());
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

geojson = d3.json(geoData, data => {
  console.log(data.features)
  console.log(data.features[345])
  L.choropleth(data, {
    valueProperty: 'Valor del Índice de Desarrollo Humano (IDH)', // which property in the features to use
    scale: ['white', 'blue'], // chroma.js scale - include as many as you like
    steps: 10, // number of breaks or steps in range
    mode: 'q', // q for quantile, e for equidistant, k for k-means
    style: style,
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`Estado: ${feature.properties.Estado}<br>Municipio: ${feature.properties.NOM_MUN}<br> IDH: ${feature.properties["Valor del Índice de Desarrollo Humano (IDH)"]}<br> Índice de ingreso: ${feature.properties["Índice de ingreso"]}<br> Índice de salud: ${feature.properties["Índice de salud"]}<br>Robos: ${feature.properties.Robo} | Homicidios: ${feature.properties.Homicidio}`),
      layer.on({
        //mouseover: highlightFeature,
        //mouseout: resetHighlight,
        click: zoomToFeature
    });
      }
  }).addTo(myMap)
})

// Dashboard

d3.csv("static/data/prices_indicators.csv", function(data){
  console.log(data)
  // Filter Data according to State
  let filteredDataBar = data.filter(x => x.Estado == "Hidalgo")
  console.log(filteredDataBar)

  // Get first 5 elements 
  let prices = filteredDataBar.slice(0, 5).sort((a,b)=>b.Precio - a.Precio)
  console.log(prices);

})