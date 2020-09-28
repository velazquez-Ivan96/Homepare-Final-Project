const ATTRIBUTION = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const URL_TEMPLATE = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
const M_DARK = L.tileLayer(URL_TEMPLATE, { attribution: ATTRIBUTION, maxZoom: 20, id: 'mapbox/dark-v10', accessToken: API_KEY});
const M_OUTDOORS = L.tileLayer(URL_TEMPLATE, { attribution: ATTRIBUTION, maxZoom: 20, id: 'mapbox/outdoors-v11', accessToken: API_KEY});
const BASE_MAPS = {"Dark": M_DARK, "Outdoors": M_OUTDOORS};
const MY_MAP = L.map("map", {center: [19.2558, -99.0759], zoom: 5, layers:[M_DARK, M_OUTDOORS]});
const vmapJson = "/vw_map"
URL_MARKS = '/raw_data_map'
URL_STATES = "/states"
URL_MUN = "/municipalities"
cboState = d3.select("#cbostate")
cboMun = d3.select("#cbomunicipality")
inputmax = d3.select("#max_price")
inputmin = d3.select("#min_price")
mapLayer = null


function fillStates(data){

  data.forEach(el => {
      cboState.append("option").text(`${el.estado} : ${el.properties_num}`).attr("value", el.cod_estado)
  })
}

function fillMunicipality(data){

  let filter = cboState.property("value")
  cboMun.selectAll("option").remove()
  data.forEach(el => {
      if (el.cod_estado == filter){
          cboMun.append("option").text(`${el.municipio} : ${el.properties_num}`).attr("value", el.cod_municipio)
      }
  })
}
function getMarkers(data){

  cities = []
  data.forEach(element => {
    let city = L.marker([element.lat, element.lon]).bindPopup(`<h4>${element.descripcion}</h4><h5>Direccion:${element.calle},${element.colonia}, ${element.cp}</h5><h6>Precio:${new Intl.NumberFormat("mx-ES").format(element.precio)} M.N </h6><hr> <a href = '${element.url}' target ='_blank'>Visitar publicacion</a>`)
    cities.push(city)                            
  });

  cities = L.layerGroup(cities);
  return cities;
}


function getCloro(data, valueProp, lowColow, highColor, title, symbol) {
  
    let layer = L.choropleth(data, {
        
        valueProperty: valueProp,
        scale: [lowColow, highColor],
        steps: 10,
        mode: "e",
        style: {
          // Border color
          color: "#fff",
          weight: 1,
          fillOpacity: 0.8
        },
        onEachFeature:(feature, layer) => {layer.bindPopup(`<h2>${feature.properties.ESTADO}</h2>
                                                <h3>Municipio: ${feature.properties.MUNICIPIO}</h3>
                                                <h4> ${title} </h4>
                                                <hr>
                                                <p>
                                               <strong>${new Intl.NumberFormat("mx-ES").format(feature.properties[valueProp])}${symbol} </strong></br>
                                               </p> `);}   



    
    }); 

    return layer;
  }

function getStates(data) {
  
  function chooseColor(codedo) {
    switch (codedo) {
    case 1:
      return "#755841";
    case 2:
      return "#ccaa66";      
    case 3:
      return "#adaa80";           
    case 4:
      return "#606618";       
    case 5:
      return "#9bb364";       
    case 6:  
      return "#17660c";       
    case 7:
      return "#85ab8d";     
    case 8:  
      return "#0d3328";      
    case 9:
      return "#e7e125";
    case 10:
      return "#93dbda";    
    case 11:
      return "#146a75";   
    case 12:
      return "#39667d";   
    case 13:
      return "#85af16";
    case 14:
      return "#a9b1c7";   
    case 15:
      return "#16af9c";
    case 16:
      return "#201652"; 
    case 17:
      return "#2535a7";
    case 18:
      return "#c2a2de";
    case 19:
      return "#b565b4";
    case 20:
      return "#5c1240";     
    case 21:
      return "#6025a7";
    case 22:
      return "#a68388";
    case 23:
      return "#d17354";
    case 24:
      return "#7a591b";
    case 25:
      return "#4a5c20";
    case 26:
      return "#4a4922";
    case 27:
      return "#1e241b";
    case 28:
      return "#3d5245";
    case 29:
      return "#d03166";
    case 30:
      return "#050c57";
    case 31:
      return "#3b5896";
    case 32:
      return "#91abb8";

    }
  }

    let layer = L.geoJSON(data, {
        

        
        style: (feature) => {return {opacity: 0.95, 
                                     fillOpacity: 0.60, 
                                     color: "gray",
                                     fillColor: chooseColor(feature.properties.COD_ESTADO),
                                      stroke: true, 
                                      weight: 0.75}},
        onEachFeature:(feature, layer) => {layer.bindPopup(`<h2>${feature.properties.ESTADO}</h2>
                                                <h3>Municipio: ${feature.properties.MUNICIPIO}</h3>
                                                <h4> # Propiedades: ${feature.properties.NUMERO}</h4>
                                            <hr>
                                            <p>
                  
                                               Precio:  <strong>${ new Intl.NumberFormat("mx-ES").format(feature.properties.PRECIO)} M.N </strong></br>
                                               Precio TerrenoM2:  <strong>${ new Intl.NumberFormat("mx-ES").format(feature.properties.PRECIO_M2)} M.N </strong></br>
                                               Precio Construccion M2:  <strong>${ new Intl.NumberFormat("mx-ES").format(feature.properties.PRECIO_CM2)} M.N </strong>
                                               </p> `);}   
    
    }); 

    return layer;
  }



  Promise.all([d3.json(vmapJson), d3.json(URL_STATES), d3.json(URL_MUN)]).then((data) =>{
    
    fillStates(data[1]);
    fillMunicipality(data[2]);
    let states = getStates(data[0])
    let prices = getCloro(data[0], "PRECIO_M2","#b0baf0", "#00157e", "PRECIO PROMEDIO DEL METRO CUADRADO", " M.N")
    let pib = getCloro(data[0], "PIB","#ddccff", "#220066", "PIB PROMEDIO DE LA REGION", " ")
    let idh = getCloro(data[0], "IDH","#d2fad1", "#005908", "INDICE DE DESARROLLO HUMANO", " ")
    let no_vivienda = getCloro(data[0], "NUMERO","#f4d9c7", "#cf5200", "NUMERO DE PROPIEDADES EVALUADAS", " Unidades")
    let overlayMaps = {"States": states, "Prices":prices,"PIB":pib, "IDH":idh, "# Propiedades":no_vivienda};

    let layerControl = L.control.layers(BASE_MAPS,overlayMaps).addTo(MY_MAP);
  
    cboState.on("change", function(){
      fillMunicipality(data[2])
    })
    
    d3.select("#button").on("click", function(){

      let currentState = cboState.property("value")
      let currentMun = cboMun.property("value")
      let min_price = inputmin.property("value")
      let max_price = inputmax.property("value")
      let strUrl = `${URL_MARKS}?state=${currentState}&mun=${currentMun}&min=${min_price}&max=${max_price}`

      d3.json(strUrl).then(function (data_r) {
         if (mapLayer != null){
          mapLayer.remove()
          layerControl.removeLayer(mapLayer)
         } 
         mapLayer = getMarkers(data_r)
         layerControl.addOverlay(mapLayer,"Marcadores")

      })

      states.eachLayer(function(layer){
        if (layer.feature.properties.COD_ESTADO == currentState && layer.feature.properties.COD_MUNICIPIO == currentMun){
        MY_MAP.fitBounds(layer.getBounds())
      }
      })


    
      

  })
    
});