
URL_STATES = "/states"
URL_MUN = "/municipalities"
URL_DATA = "/raw_data"
cboState = d3.select("#cbostate")
cboMun = d3.select("#cbomunicipality")
inputmax = d3.select("#max_price")
inputmin = d3.select("#min_price")

page_number = 0
currentState = 0
currentMun = 0
min_price = 0
max_price = 99999999

function change_page(offset){

    if (page_number + offset > 0){
        page_number += offset
        let strUrl = `${URL_DATA}?state=${currentState}&mun=${currentMun}&min=${min_price}&max=${max_price}&page=${page_number}`
        fillTable(strUrl);
    }
}

function fillTable(strUrl){
    let tableContent = d3.select("#tableContent")
    

    d3.json(strUrl).then(function(data){
        
        if (data.length > 0){
            tableContent.selectAll("td").remove();
            data.forEach(el => {

                let tblrow = tableContent.append("tr");
                tblrow.append("td").text(el.id);
                tblrow.append("td").text(el.colonia);
                tblrow.append("td").text(el.calle);
                tblrow.append("td").text(el.descripcion);
                tblrow.append("td").text(`$${new Intl.NumberFormat().format(el.precio)}`);
                tblrow.append("td").html(`<a href = '${el.url}' target ="_blank">Visit</a>`)
                }) 
        }
    })
    
}


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

function getData(){

    currentState = cboState.property("value")
    currentMun = cboMun.property("value")
    min_price = inputmin.property("value")
    max_price = inputmax.property("value")

    let strUrl = `${URL_DATA}?state=${currentState}&mun=${currentMun}&min=${min_price}&max=${max_price}&page=1`
    page_number = 1
    fillTable(strUrl);

}



Promise.all([d3.json(URL_STATES), d3.json(URL_MUN)]).then((data) =>{

fillStates(data[0]);
fillMunicipality(data[1]);


cboState.on("change", function(){
    fillMunicipality(data[1])
})

d3.select("#button").on("click", function(){
    getData();
})

d3.select("#button_next").on("click", function(){
    change_page(1);
})

d3.select("#button_previous").on("click", function(){
    change_page(-1);
})

});