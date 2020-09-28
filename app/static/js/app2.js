
let json_mun1 = "https://real-estate-mexico.herokuapp.com/municipalities"
let json_state1 = "https://real-estate-mexico.herokuapp.com/states"


// id = codestado + codmun
let json_mun3 = "https://real-estate-mexico.herokuapp.com/datos_municipio?mun1=15&mun2=21"


d3.json(json_state1).then(function (data) {
    let State1 = d3.select("#State")
    let State2 = d3.select("#State1")
    let State3 = d3.select("#State2")
    data.forEach(el => {
        State1.append("option").attr("value", el.cod_estado).text(el.estado)
        State2.append("option").attr("value", el.cod_estado).text(el.estado)
        State3.append("option").attr("value", el.cod_estado).text(el.estado)
    })
    console.log(State1.property("value"))
})

d3.selectAll(".Title").classed("headingsTitles", true)
d3.selectAll(".Title2").classed("headingsTitles2", true)

const round = (number, decimalPlaces) => {
    const factorOfTen = Math.pow(10, decimalPlaces)
    return Math.round(number * factorOfTen) / factorOfTen
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

d3.json(json_mun1).then(function (data) {

    function optionMun() {
        // d3.select("#Municipality").html("")
        // let dropdownMun = d3.select("#Municipality")
        // let dropState = d3.select("#State").property("value")
        // console.log(dropState)
        // //console.log(data)
        // dropdownMun.append("option").text("All")
        // let filteredData = data.filter(x => x.cod_estado == dropState)
        // console.log(filteredData)
        // json_estMun = `https://real-estate-mexico.herokuapp.com/datos_municipio_estado?state1=${dropState}`
        // filteredData.forEach(el => {
        //     //console.log(el.Municipio)
        //     d3.json(json_estMun).then(function (dataStMun) {
        //         let selected_mun = [];
        //         dataStMun.forEach(el=>{
        //             selected_mun.push(el.cod_municipio)
        //         })
        //         if(selected_mun.includes(el.cod_municipio)){
        //             dropdownMun.append("option").text(el.municipio)
        //         }else{
        //             dropdownMun.append("option").property("disabled", true).text(el.municipio)
        //         }
        //     })
        // });
        d3.select("#Municipality").html("")
        let dropdownMun = d3.select("#Municipality")
        let dropState = d3.select("#State").property("value")
        //console.log(dropState)
        dropdownMun.append("option").text("All")

        //console.log(data)
        let filteredData = data.filter(x => x.cod_estado == dropState)
        filteredData.forEach(el => {
            //console.log(el.Municipio)
            dropdownMun.append("option").text(el.municipio)
        });
    }

    function optionMun2() {
        d3.select("#Municipality1").html("")
        let dropdownMun = d3.select("#Municipality1")
        let dropState = d3.select("#State1").property("value")
        //console.log(dropState)
        dropdownMun.append("option").text("All")

        //console.log(data)
        let filteredData = data.filter(x => x.cod_estado == dropState)
        filteredData.forEach(el => {
            //console.log(el.Municipio)
            dropdownMun.append("option").text(el.municipio)
        });
    }

    function optionMun3() {
        d3.select("#Municipality2").html("")
        let dropdownMun = d3.select("#Municipality2")
        let dropState = d3.select("#State2").property("value")
        dropdownMun.append("option").text("All")

        //console.log(data)
        let filteredData = data.filter(x => x.cod_estado == dropState)
        filteredData.forEach(el => {
            //console.log(el.Municipio)
            dropdownMun.append("option").text(el.municipio)
        });
    }

    optionMun();
    optionMun2();
    optionMun3();

    function Graphs() {
        let valEst = parseInt(d3.select("#State").property("value"));
        let selectionMun = d3.select("#Municipality");
        let valMun = d3.select("#Municipality").property("value");

        let mun1;
        let valname = d3.select("#name")

        var config = { responsive: true };
        let layout4 = {
            //autosize: false,
            width: 480,
            height: 400,
            margin: { t: 25 }
        };

        if (valMun != "All") {
            function id() {
                let id_tracked = []
                data.forEach(el => {
                    if (valMun === el.municipio) {
                        id_tracked.push(el.cod_edo_mun)
                    }
                })
                return id_tracked[0]
            }

            mun1 = id();
            console.log(mun1)

            json_mun3 = `https://real-estate-mexico.herokuapp.com/datos_municipio?edomun1=${mun1}`
            d3.json(json_mun3).then(function (dataMunicipal) {
                if (dataMunicipal.length == 0) {
                    alert(`No data found for ${valMun}. Please choose another one`)
                    //valMun.text.classed("optionMun", true)
                } else {
                    // valname.html("")
                    // valname.append("h3").text(`Showing data of ${valMun}, ${textEst}`)
                    console.log(dataMunicipal)
                    let nameLabel = dataMunicipal[0].municipio
                    let textMpio = d3.selectAll(".TitleSingle")
                    textMpio.html("")
                    textMpio.append("h6").text(nameLabel)

                    // gauge 1

                    let valcount = dataMunicipal[0].count_inmuebles
                    let cardcount = d3.select("#gauge1")
                    cardcount.html("")
                    cardcount.append("h4").text(valcount)

                    let valprice = numberWithCommas(round(dataMunicipal[0].avg_precio, 2))
                    let cardprice = d3.select("#gauge2")
                    cardprice.html("")
                    cardprice.append("h4").text(`$${valprice} MXN`)

                    // gauge 4
                    let val_terreno = round(dataMunicipal[0].avg_superficie, 2)
                    let cardArea = d3.select("#gauge3")
                    cardArea.html("")
                    cardArea.append("h4").text(`${val_terreno} m2`)

                    // Bedrooms

                    let val_recamaras = round(dataMunicipal[0].avg_recamaras, 0)
                    let dataBed = d3.select("#Bedrooms")
                    dataBed.html("")
                    dataBed.append().text(val_recamaras)

                    // Bathrooms 

                    let val_bath = round(dataMunicipal[0].avg_banos, 0)
                    let dataBath = d3.select("#Bathrooms")
                    dataBath.html("")
                    dataBath.append().text(val_bath)

                    // Parking lot

                    let val_parking = round(dataMunicipal[0].avg_estacionamientos, 0)
                    let dataPark = d3.select("#Parking")
                    dataPark.html("")
                    dataPark.append().text(val_parking)


                    // Precio por metro cuadrado

                    let val_price_m2 = numberWithCommas(round(dataMunicipal[0].avg_precio_m2, 2))
                    let data_Price_m2 = d3.select("#gauge4")
                    data_Price_m2.html("")
                    data_Price_m2.append("h4").text(`${val_price_m2} $/m2`)

                    // Bar 

                    let stats = [];
                    let labels = ["Education", "Health", "Income", "HDI"];
                    dataMunicipal.forEach(el => {
                        stats.push(round(el.avg_education, 3), round(el.avg_health, 3), round(el.avg_income, 3), round(el.avg_idh, 3))
                    });

                    let nametrace = dataMunicipal[0].municipio

                    //Define trace
                    let plotData7 = [{
                        x: stats,
                        y: labels,
                        name:nametrace,
                        type: 'bar',
                        marker: {
                            color: '#027bce',
                        },
                        orientation: 'h'
                        //text: 
                    }]

                    //Display chart
                    Plotly.newPlot("barSingle", plotData7, layout4, config);
                }

            })
        } else {

            json_state3 = `https://real-estate-mexico.herokuapp.com/datos_estado?state1=${valEst}`
            d3.json(json_state3).then(function (dataEst) {

                let nameLabel = dataEst[0].estado
                let textEst = d3.selectAll(".TitleSingle")
                textEst.html("")
                textEst.append("h6").text(nameLabel)

                let valcount = dataEst[0].count_inmuebles
                let cardcount = d3.select("#gauge1")
                cardcount.html("")
                cardcount.append("h4").text(valcount)

                // gauge 2
                //console.log(filteredData3)
                let valprice = numberWithCommas(round(dataEst[0].avg_precio, 2))
                let cardprice = d3.select("#gauge2")
                cardprice.html("")
                cardprice.append("h4").text(`$${valprice} MXN`)

                // gauge 4
                let val_terreno = round(dataEst[0].avg_superficie, 2)

                let cardArea = d3.select("#gauge3")
                cardArea.html("")
                cardArea.append("h4").text(`${val_terreno} m2`)

                // Recamaras 

                let val_recamaras = round(dataEst[0].avg_recamaras, 0)
                let dataBed = d3.select("#Bedrooms")
                dataBed.html("")
                dataBed.append().text(val_recamaras)

                // Bathrooms 

                let val_bath = round(dataEst[0].avg_banos, 0)
                let dataBath = d3.select("#Bathrooms")
                dataBath.html("")
                dataBath.append().text(val_bath)

                // Parking lot

                let val_parking = round(dataEst[0].avg_estacionamientos, 0)
                let dataPark = d3.select("#Parking")
                dataPark.html("")
                dataPark.append().text(val_parking)


                // precio por metreo cuadrado

                let val_price_m2 = numberWithCommas(round(dataEst[0].avg_precio_m2, 2))
                let data_Price_m2 = d3.select("#gauge4")
                data_Price_m2.html("")
                data_Price_m2.append("h4").text(`${val_price_m2} $/m2`)

                // Bar 
                let stats = [];
                let labels = ["Education", "Health", "Income", "HDI"];
                dataEst.forEach(el => {
                    stats.push(round(el.avg_education, 3), round(el.avg_health, 3), round(el.avg_income, 3), round(el.avg_idh, 3))
                });

                let nametrace = dataEst[0].estado

                //Define trace
                let plotData7 = [{
                    x: stats,
                    y: labels,
                    name:nametrace,
                    type: 'bar',
                    marker: {
                        color: '#027bce',
                    },
                    orientation: 'h'
                    //text: 
                }]
                //Display chart
                Plotly.newPlot("barSingle", plotData7, layout4, config);

            })
        }
    }

    function Compare() {

        function CompareL() {
            let valEst1 = parseInt(d3.select("#State1").property("value"));
            let valMun1 = d3.select("#Municipality1").property("value");
            let mun2;


            console.log(valEst1)
            console.log(valMun1)

            if (valMun1 != "All") {
                function id() {
                    let id_tracked = []
                    data.forEach(el => {
                        if (valMun1 === el.municipio) {
                            id_tracked.push(el.cod_edo_mun)
                        }
                    })
                    return id_tracked[0]
                }
                mun2 = id();
                json_mun3 = `https://real-estate-mexico.herokuapp.com/datos_municipio?edomun1=${mun2}`
                d3.json(json_mun3).then(function (dataMunicipal2) {

                    if (dataMunicipal2.length == 0) {
                        alert(`No data found fot ${valMun1}. Please choose another one`)
                    } else {

                        let nameLabel = dataMunicipal2[0].municipio
                        let textMun = d3.selectAll(".Title")
                        textMun.html("")
                        textMun.append("h6").text(nameLabel)

                        console.log(dataMunicipal2)
                        let stats = [];
                        let labels = ["Education", "Health", "Income", "HDI"];
                        dataMunicipal2.forEach(el => {
                            stats.push(round(el.avg_education, 3), round(el.avg_health, 3), round(el.avg_income, 3), round(el.avg_idh, 3))
                        });


                        // gauges
                        let valcount = dataMunicipal2[0].count_inmuebles
                        let valprice = numberWithCommas(round(dataMunicipal2[0].avg_precio, 2))

                        let valcount_L = d3.select("#dataComp1")
                        valcount_L.html("")
                        valcount_L.append("h3").text(valcount)

                        let valprice_L = d3.select("#dataComp3")
                        valprice_L.html("")
                        valprice_L.append("h3").text(`$ ${valprice} MXN`)

                        let val_terreno = round(dataMunicipal2[0].avg_superficie, 2)
                        let cardArea = d3.select("#dataComp5")
                        cardArea.html("")
                        cardArea.append("h3").text(`${val_terreno} m2`)

                        // Bedrooms

                        let val_recamaras = round(dataMunicipal2[0].avg_recamaras, 0)
                        let dataBed = d3.select("#BedroomsComp1")
                        dataBed.html("")
                        dataBed.append().text(val_recamaras)

                        // Bathrooms 

                        let val_bath = round(dataMunicipal2[0].avg_banos, 0)
                        let dataBath = d3.select("#BathroomsComp1")
                        dataBath.html("")
                        dataBath.append().text(val_bath)

                        // Parking lot

                        let val_parking = round(dataMunicipal2[0].avg_estacionamientos, 0)
                        let dataPark = d3.select("#ParkingComp1")
                        dataPark.html("")
                        dataPark.append().text(val_parking)


                        // precio por metro cuadrado
                        let val_precio_m2 = numberWithCommas(round(dataMunicipal2[0].avg_precio_m2, 2))
                        let data_Price_m2 = d3.select("#dataComp7")
                        data_Price_m2.html("")
                        data_Price_m2.append("h3").text(`${val_precio_m2} $/m2`)
                    }
                })

            } else {
                json_state3 = `https://real-estate-mexico.herokuapp.com/datos_estado?state1=${valEst1}`
                d3.json(json_state3).then(function (dataEst2) {

                    //console.log(dataEst2)
                    let nameLabel = dataEst2[0].estado
                    let textEst = d3.selectAll(".Title")
                    textEst.html("")
                    textEst.append("h6").text(nameLabel)

                    console.log(dataEst2)
                    let stats = [];
                    let labels = ["Education", "Health", "Income", "HDI"];
                    dataEst2.forEach(el => {
                        stats.push(round(el.avg_education, 3), round(el.avg_health, 3), round(el.avg_income, 3), round(el.avg_idh, 3))
                    });

                    //gauges 

                    let valcount = dataEst2[0].count_inmuebles
                    let valprice = numberWithCommas(round(dataEst2[0].avg_precio, 2))

                    let valcount_L = d3.select("#dataComp1")
                    valcount_L.html("")
                    valcount_L.append("h3").text(valcount)

                    let valprice_L = d3.select("#dataComp3")
                    valprice_L.html("")
                    valprice_L.append("h3").text(`$ ${valprice} MXN`)

                    let val_terreno = round(dataEst2[0].avg_superficie, 2)
                    let cardArea = d3.select("#dataComp5")
                    cardArea.html("")
                    cardArea.append("h3").text(`${val_terreno} m2`)

                    // Bedrooms

                    let val_recamaras = round(dataEst2[0].avg_recamaras, 0)
                    let dataBed = d3.select("#BedroomsComp1")
                    dataBed.html("")
                    dataBed.append().text(val_recamaras)

                    // Bathrooms 

                    let val_bath = round(dataEst2[0].avg_banos, 0)
                    let dataBath = d3.select("#BathroomsComp1")
                    dataBath.html("")
                    dataBath.append().text(val_bath)

                    // Parking lot

                    let val_parking = round(dataEst2[0].avg_estacionamientos, 0)
                    let dataPark = d3.select("#ParkingComp1")
                    dataPark.html("")
                    dataPark.append().text(val_parking)

                    // precio por metro cuadrado
                    let val_precio_m2 = numberWithCommas(round(dataEst2[0].avg_precio_m2, 2))
                    let data_Price_m2 = d3.select("#dataComp7")
                    data_Price_m2.html("")
                    data_Price_m2.append("h3").text(`${val_precio_m2} $/m2`)
                })

            }

        }

        function CompareR() {
            let valEst2 = d3.select("#State2").property("value");
            let valMun2 = d3.select("#Municipality2").property("value");
            let mun3;

            if (valMun2 != "All") {
                function id() {
                    let id_tracked = []
                    data.forEach(el => {
                        if (valMun2 === el.municipio) {
                            id_tracked.push(el.cod_edo_mun)
                        }
                    })
                    return id_tracked[0]
                }
                mun3 = id();
                json_mun3 = `https://real-estate-mexico.herokuapp.com/datos_municipio?edomun1=${mun3}`
                d3.json(json_mun3).then(function (dataMunicipal3) {

                    if (dataMunicipal3.length == 0) {
                        alert(`No data found for ${valMun2}. Please choose another one`)
                    } else {

                        let nameLabel = dataMunicipal3[0].municipio
                        let textMun = d3.selectAll(".Title2")
                        textMun.html("")
                        textMun.append("h6").text(nameLabel)

                        let valcount = dataMunicipal3[0].count_inmuebles
                        let valprice = numberWithCommas(round(dataMunicipal3[0].avg_precio, 2))

                        let valcount_R = d3.select("#dataComp2")
                        valcount_R.html("")
                        valcount_R.append("h3").text(valcount)

                        let valprice_R = d3.select("#dataComp4")
                        valprice_R.html("")
                        valprice_R.append("h3").text(`$ ${valprice} MXN`)


                        let val_terreno = round(dataMunicipal3[0].avg_superficie, 2)
                        let cardArea = d3.select("#dataComp6")
                        cardArea.html("")
                        cardArea.append("h3").text(`${val_terreno} m2`)

                        // Bedrooms

                        let val_recamaras = round(dataMunicipal3[0].avg_recamaras, 0)
                        let dataBed = d3.select("#BedroomsComp2")
                        dataBed.html("")
                        dataBed.append().text(val_recamaras)

                        // Bathrooms 

                        let val_bath = round(dataMunicipal3[0].avg_banos, 0)
                        let dataBath = d3.select("#BathroomsComp2")
                        dataBath.html("")
                        dataBath.append().text(val_bath)

                        // Parking lot

                        let val_parking = round(dataMunicipal3[0].avg_estacionamientos, 0)
                        let dataPark = d3.select("#ParkingComp2")
                        dataPark.html("")
                        dataPark.append().text(val_parking)


                        // precio por metro cuadrado
                        let val_precio_m2 = numberWithCommas(round(dataMunicipal3[0].avg_precio_m2, 2))
                        let data_Price_m2 = d3.select("#dataComp8")
                        data_Price_m2.html("")
                        data_Price_m2.append("h3").text(`${val_precio_m2} $/m2`)

                    }
                })
            } else {
                json_state3 = `https://real-estate-mexico.herokuapp.com/datos_estado?state1=${valEst2}`
                d3.json(json_state3).then(function (dataEst2) {

                    let nameLabel = dataEst2[0].estado
                    let textEst = d3.selectAll(".Title2")
                    textEst.html("")
                    textEst.append("h6").text(nameLabel)

                    let valcount = dataEst2[0].count_inmuebles
                    let valprice = numberWithCommas(round(dataEst2[0].avg_precio, 2))

                    let valcount_R = d3.select("#dataComp2")
                    valcount_R.html("")
                    valcount_R.append("h3").text(valcount)

                    let valprice_R = d3.select("#dataComp4")
                    valprice_R.html("")
                    valprice_R.append("h3").text(`$ ${valprice} MXN`)

                    let val_terreno = round(dataEst2[0].avg_superficie, 2)
                    let cardArea = d3.select("#dataComp6")
                    cardArea.html("")
                    cardArea.append("h3").text(`${val_terreno} m2`)

                    // Bedrooms

                    let val_recamaras = round(dataEst2[0].avg_recamaras, 0)
                    let dataBed = d3.select("#BedroomsComp2")
                    dataBed.html("")
                    dataBed.append().text(val_recamaras)

                    // Bathrooms 

                    let val_bath = round(dataEst2[0].avg_banos, 0)
                    let dataBath = d3.select("#BathroomsComp2")
                    dataBath.html("")
                    dataBath.append().text(val_bath)

                    // Parking lot

                    let val_parking = round(dataEst2[0].avg_estacionamientos, 0)
                    let dataPark = d3.select("#ParkingComp2")
                    dataPark.html("")
                    dataPark.append().text(val_parking)

                    // precio por metro cuadrado

                    let val_precio_m2 = numberWithCommas(round(dataEst2[0].avg_precio_m2, 2))
                    let data_Price_m2 = d3.select("#dataComp8")
                    data_Price_m2.html("")
                    data_Price_m2.append("h3").text(`${val_precio_m2} $/m2`)
                })
            }

        }

        function barChart() {
            let valEst1 = parseInt(d3.select("#State1").property("value"));
            let valMun1 = d3.select("#Municipality1").property("value");
            let valEst2 = parseInt(d3.select("#State2").property("value"));
            let valMun2 = d3.select("#Municipality2").property("value");

            let mun1;
            let mun2;

            let layout1 = {
                barmode: 'group',
                height: 450,
                width: 450,
                margin: {
                    t: 0
                }
            };

            if (valMun1 != "All" && valMun2 != "All") {
                function id(mun) {
                    let id_tracked = []
                    data.forEach(el => {
                        if (mun === el.municipio) {
                            id_tracked.push(el.cod_edo_mun)
                        }
                    })
                    return id_tracked[0]
                }
                mun1 = id(valMun1);
                mun2 = id(valMun2);

                json_mun3 = `https://real-estate-mexico.herokuapp.com/datos_municipio?edomun1=${mun1}&edomun2=${mun2}`
                d3.json(json_mun3).then(function (dataCompMun) {

                    console.log(dataCompMun)
                    let stats1 = [];
                    let stats2 = [];
                    let labels = ["Education", "Health", "Income", "HDI"];

                    let first = dataCompMun.slice(0, 1)
                    console.log(first)
                    first.forEach(el => {
                        stats1.push(round(el.avg_education, 3), round(el.avg_health, 3), round(el.avg_income, 3), round(el.avg_idh, 3))
                    });
                    let seconnd = dataCompMun.slice(1, 2)
                    console.log(seconnd)
                    seconnd.forEach(el => {
                        stats2.push(round(el.avg_education, 3), round(el.avg_health, 3), round(el.avg_income, 3), round(el.avg_idh, 3))
                    });
                    console.log(stats1)
                    console.log(stats2)

                    let name1 = first[0].municipio

                    // console.log(name1)
                    let name2 = seconnd[0].municipio

                    let trace1 = {
                        x: stats1,
                        y: labels,
                        name: name1,
                        type: 'bar',
                        orientation: "h"
                    };

                    let trace2 = {
                        x: stats2,
                        y: labels,
                        name: name2,
                        type: 'bar',
                        orientation: "h"
                    };

                    let plotdata = [trace1, trace2];

                    Plotly.newPlot('barComp', plotdata, layout1);
                })

            } else if (valMun1 === "All" && valMun2 === "All") {
                console.log("Hola")
                json_state3 = `https://real-estate-mexico.herokuapp.com/datos_estado?state1=${valEst1}&state2=${valEst2}`
                d3.json(json_state3).then(function (dataCompEst) {
                    let stats1 = [];
                    let stats2 = [];
                    let labels = ["Education", "Health", "Income", "HDI"];

                    let first = dataCompEst.slice(0, 1)
                    first.forEach(el => {
                        stats1.push(round(el.avg_education, 3), round(el.avg_health, 3), round(el.avg_income, 3), round(el.avg_idh, 3))
                    });
                    let seconnd = dataCompEst.slice(1, 2)
                    seconnd.forEach(el => {
                        stats2.push(round(el.avg_education, 3), round(el.avg_health, 3), round(el.avg_income, 3), round(el.avg_idh, 3))
                    });
                    console.log(stats1)
                    console.log(stats2)

                    let name1 = first[0].estado
                    let name2 = seconnd[0].estado

                    let trace1 = {
                        x: stats1,
                        y: labels,
                        name: name1,
                        type: 'bar',
                        orientation: "h"
                    };

                    let trace2 = {
                        x: stats2,
                        y: labels,
                        name: name2,
                        type: 'bar',
                        orientation: "h"
                    };

                    let plotdata = [trace1, trace2];

                    Plotly.newPlot('barComp', plotdata, layout1);
                })
            } else {
                alert("Make sure to choose the correct inputs to make the comparisons()")
            }

        }

        function Bubble2() {

            let valEst1 = parseInt(d3.select("#State1").property("value"));
            //let valMun1 = d3.select("#Municipality1").property("value");
            let valEst2 = parseInt(d3.select("#State2").property("value"));
            //let valMun2 = d3.select("#Municipality2").property("value");

            let layout12 = {
                xaxis: {
                    title: 'Human Development index'
                },
                yaxis: {
                    title: 'Price per square meter'
                },
                showlegend: true,
                height: 380,
                width: 510,
                margin: { t: 15 }
            };

            json_mun3 = `https://real-estate-mexico.herokuapp.com/datos_municipio_estado?state1=${valEst1}&state2=${valEst2}`
            d3.json(json_mun3).then(function (dataMunicipiosComp) {

                // filtrar 1er estado
                let filtered1 = dataMunicipiosComp.filter(x => x.cod_estado === valEst1)
                //console.log(filtered)
                let x1 = filtered1.map(x => x.avg_idh)
                //console.log(x)
                let y_axis1 = filtered1.map(x => x.avg_precio_m2)
                //console.log(y_axis)
                let names1 = filtered1.map(x => x.municipio)
                let nameTrace1 = filtered1.map(x => x.estado)[0]

                console.log(nameTrace1)
                //var desired_maximum_marker_size = 50;

                //filtrar 2do estado
                let filtered2 = dataMunicipiosComp.filter(x => x.cod_estado === valEst2)
                //console.log(filtered)
                let x2 = filtered2.map(x => x.avg_idh)
                //console.log(x)
                let y_axis2 = filtered2.map(x => x.avg_precio_m2)
                //console.log(y_axis)
                let names2 = filtered2.map(x => x.municipio)
                let nameTrace2 = filtered2.map(x => x.estado)[0]

                console.log(nameTrace2)

                let trace1 = {
                    x: x1,
                    y: y_axis1,
                    hovertemplate: 'Municipality: <b>%{text}</b>' +
                        '<br>HDI<b>: %{x}</b><br>' +
                        'Price/m2: <b>%{y:.2f}</b>'
                    ,
                    mode: 'markers',
                    marker: {
                        color: 'royalblue',
                        size: 20,
                        //set 'sizeref' to an 'ideal' size given by the formula sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)
                        // sizeref: 2.0 * Math.max(...size) / (desired_maximum_marker_size ** 2),
                        // sizemode: 'area'
                    },
                    text: names1,
                    name: nameTrace1
                };

                let trace2 = {
                    x: x2,
                    y: y_axis2,
                    hovertemplate: 'Municipality: <b>%{text}</b>' +
                        '<br>HDI<b>: %{x}</b><br>' +
                        'Price/m2: <b>%{y:.2f}</b>'
                    ,
                    mode: 'markers',
                    marker: {
                        color: 'orangered',
                        size: 20,
                        //set 'sizeref' to an 'ideal' size given by the formula sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)
                        // sizeref: 2.0 * Math.max(...size) / (desired_maximum_marker_size ** 2),
                        // sizemode: 'area'
                    },
                    text: names2,
                    name: nameTrace2
                };

                let plotdata12 = [trace1, trace2]

                Plotly.newPlot('Bubble2', plotdata12, layout12);

            })

        }

        CompareL();
        CompareR();
        barChart();
        Bubble2();
    }


    function Bubble() {
        //console.log(data)
        let valMun = d3.select("#Municipality").property("value");
        let valEst = parseInt(d3.select("#State").property("value"));
        //console.log(dropvalEst)

        console.log(valEst)
        // $(document).ready(function () {
        //     $("#Bubble").show();

        // });
        json_mun3 = `https://real-estate-mexico.herokuapp.com/datos_municipio_estado?state1=${valEst}`
        d3.json(json_mun3).then(function (dataStateMun) {



            // let filtered = data_example.filter(x => x["Clave entidad"] === valEst)
            // console.log(filtered)
            let x = dataStateMun.map(x => x.avg_idh)
            console.log(x)
            let y_axis = dataStateMun.map(x => x.avg_precio_m2)
            console.log(y_axis)
            let names = dataStateMun.map(x => x.municipio)
            let nameTrace = dataStateMun.map(x => x.estado)[0]
            
            //var desired_maximum_marker_size = 50;

            let plotData8 = [{
                x: x,
                y: y_axis,
                hovertemplate: 'Municipality: <b>%{text}</b>' +
                    '<br>HDI<b>: %{x}</b><br>' +
                    'Price/m2: <b>%{y:.2f}</b>',

                mode: 'markers',
                marker: {
                    color: 'orange',
                    size: 20,
                    //set 'sizeref' to an 'ideal' size given by the formula sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)
                    // sizeref: 2.0 * Math.max(...size) / (desired_maximum_marker_size ** 2),
                    // sizemode: 'area'
                },
                text: names,
                name:nameTrace
            }];

            let layout8 = {
                xaxis: {
                    title: 'Human Development index'
                },
                yaxis: {
                    title: 'Price per square meter'
                },
                showlegend: false,
                height: 380,
                width: 500,
                margin: { t: 25 }
            };
            Plotly.newPlot('Bubble', plotData8, layout8);



        })

    }


    d3.select("#Search").on("click", function () {
        $(document).ready(function () {
            $(".info-card").show();
        });
        Graphs();
        Bubble();
    })

    d3.select("#SearchComp").on("click", function () {
        Compare();
        $(document).ready(function () {
            $(".info-card-2").show();
        });
    })

    d3.select("#State").on("change", optionMun)
    d3.select("#State1").on("change", optionMun2)
    d3.select("#State2").on("change", optionMun3)


});

$(document).ready(function () {
    $("#Compare").click(function () {
        $(".sectionComp2").show();
        $(".sectionComp1").hide();
    });
});

$(document).ready(function () {
    $("#Single").click(function () {
        $(".sectionComp1").show();
        $(".info-card-2").hide();
        $(".sectionComp2").hide();
    })
});