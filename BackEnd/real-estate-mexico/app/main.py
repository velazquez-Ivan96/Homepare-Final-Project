from flask import Flask, render_template, jsonify
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, MetaData, Table, Integer, Column
from app import config as cfg
import simplejson

app = Flask(__name__)

engine = create_engine(cfg.DATABASE_URL)
m = MetaData(schema='dbo')
Base = automap_base(metadata=m)
Table('vw_datos_estado',m, Column('id', Integer, primary_key=True), autoload=True, autoload_with=engine)
Table('vw_datos_municipio',m, Column('id', Integer, primary_key=True), autoload=True, autoload_with=engine)
Base.prepare(engine, reflect=True)


House = Base.classes.house_data
House_prices = Base.classes.house_prices
Indicadores = Base.classes.indicadores
#Vw_House = Base.classes.vw_house_data
VW_Datos_Estado = Base.classes.vw_datos_estado
VW_Datos_Municipio = Base.classes.vw_datos_municipio


session = Session(engine)

@app.route("/")
def index():
    pagetitle = "Analysis: Housing prices in Mexico"
    pagecontent = "Please select an option to explore our dataset"

    return render_template("index.html", 
            mytitle = pagetitle, 
            mycontent = pagecontent)

@app.route("/map")
def map():
    return render_template("map1.html")

@app.route("/json_dataset1")
def getHouse1():
    result = session.query(House).all()
    recordlist = []
    #print(result[0].__dict__.keys())
    for ele in result:
        house = {}
        house["c_estado"] = ele.c_estado
        house["c_mnpio"] = ele.c_mnpio
        house["estado"] = ele.estado
        house["municipio"] = ele.municipio
        house["geometry"] = ele.geometry
        house["yr_prom_educ"] = ele.yr_prom_educ
        house["yur_esp_educ"] = ele.yur_esp_educ
        house["pib_anual_dls"] = ele.pib_anual_dls
        house["tasa_mor_inf"] = ele.tasa_mor_inf
        house["indice_edu"] = ele.indice_edu
        house["indice_salu"] = ele.indice_salu
        house["indice_inc"] = ele.indice_inc
        house["idh"] = ele.idh
        house["pos_idh_2015"] = ele.pos_idh_2015
        house["robo"] = ele.robo
        house["homicidio"] = ele.homicidio
        house["secuestro"] = ele.secuestro
        house["feminicidio"] = ele.feminicidio
        house["abuso_sex"] = ele.abuso_sex
        house["lesiones"] = ele.lesiones
        house["min_price"] = ele.min_price
        house["max_price"] = ele.max_price
        house["conteo_inm"] = ele.conteo_inm
        house["prom_precio"] = ele.prom_precio
        house["edomun"] = ele.edomun

        recordlist.append(house)
        response = jsonify(recordlist)
        response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/vw_datos_estado")
def get_vw_datos_estado():
    result = session.query(VW_Datos_Estado).all()
    recordlist = []
    #print(result[0].__dict__.keys())
    for ele in result:
        tmpdict = {}
        tmpdict["ESTADO"] = ele.estado
        tmpdict["PROM_IDH"] = ele.prom_idh
        tmpdict["PROM_INDICE_SALUD"] = ele.prom_indice_salud
        tmpdict["PROM_INDICE_INGRESO"] = ele.prom_indice_ingreso
        tmpdict["PROM_INDICE_EDUCACION"] = ele.prom_indice_educacion
        tmpdict["SUM_FEMINICIDIOS"] = ele.sum_feminicidios
        tmpdict["SUM_HOMICIDIOS"] = ele.sum_homicidios
        tmpdict["SUM_ROBOS"] = ele.sum_robos
        tmpdict["SUM_LESIONES"] = ele.sum_lesiones
        tmpdict["SUM_ABUSO_SEXUAL"] = ele.sum_abuso_sexual
        tmpdict["SUM_SECUESTRO"] = ele.sum_secuestro
        tmpdict["NO_INMUEBLES"] = ele.no_inmuebles
        tmpdict["PROM_PRECIO"] = ele.prom_precio
        tmpdict["PROM_TERRENO"] = ele.prom_terreno
        tmpdict["PROM_CONSTRUCCION"] = ele.prom_construccion
        tmpdict["PROM_RECAMARAS"] = ele.prom_recamaras

        recordlist.append(tmpdict)
        response = jsonify(recordlist)
        response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/vw_datos_municipio")
def get_vw_datos_municipio():
    result = session.query(VW_Datos_Municipio).all()
    recordlist = []
    #print(result[0].__dict__.keys())
    for ele in result:
        tmpdict = {}
        tmpdict["ESTADO"] = ele.estado
        tmpdict["MUNICIPIO"] = ele.municipio
        tmpdict["PROM_IDH"] = ele.prom_idh
        tmpdict["PROM_INDICE_SALUD"] = ele.prom_indice_salud
        tmpdict["PROM_INDICE_INGRESO"] = ele.prom_indice_ingreso
        tmpdict["PROM_INDICE_EDUCACION"] = ele.prom_indice_educacion
        tmpdict["SUM_FEMINICIDIOS"] = ele.sum_feminicidios
        tmpdict["SUM_HOMICIDIOS"] = ele.sum_homicidios
        tmpdict["SUM_ROBOS"] = ele.sum_robos
        tmpdict["SUM_LESIONES"] = ele.sum_lesiones
        tmpdict["SUM_ABUSO_SEXUAL"] = ele.sum_abuso_sexual
        tmpdict["SUM_SECUESTRO"] = ele.sum_secuestro
        tmpdict["NO_INMUEBLES"] = ele.no_inmuebles
        tmpdict["PROM_PRECIO"] = ele.prom_precio
        tmpdict["PROM_TERRENO"] = ele.prom_terreno
        tmpdict["PROM_CONSTRUCCION"] = ele.prom_construccion
        tmpdict["PROM_RECAMARAS"] = ele.prom_recamaras


        recordlist.append(tmpdict)
        response = jsonify(recordlist)
        response.headers.add("Access-Control-Allow-Origin", "*")
    return response
