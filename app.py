from pathlib import Path
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, render_template
import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import pymysql
pymysql.install_as_MySQLdb()

app = Flask(__name__)
database = {
    'user': 'SecondProject',
    'password': 'p2password',
    'port': '3306',
    'host': 'localhost',
    'database': 'project2',
    'dialect': 'mysql',
    'driver': None
}

db_prefix = database['dialect']
if database['driver'] is not None:
    db_prefix += database['driver']
DATABASE_URL = f"{db_prefix}://{database['user']}:{database['password']}@{database['host']}:{database['port']}/{database['database']}"

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

Base = automap_base()
Base.prepare(db.engine, reflect=True)
print(Base.metadata.tables.keys())
Summary2016 = Base.classes.summary_2016
AirSummary = Base.classes.air_summary
WorldAir = Base.classes.worldaire


@app.route("/")
def index():
    """Homepage"""
    return render_template("index.html")


@app.route("/heatmap")
def heatmap():
    return render_template("heatmap.html")


@app.route("/politicians")
def politicians():
    return render_template("politicians.html")


@app.route("/names")
def names():
    """Return City Names"""

    stmt = db.session.query(AirSummary).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    return jsonify(list(df.columns)[1:])


@app.route("/data/<citydata>")
def summary2016(citydata):
    """Return the MetaData for a given sample."""
    sel = [
        Summary2016.City,
        Summary2016.State,
        Summary2016.Asthma_Prevalence,
        Summary2016.COPD_Prevalence,
        Summary2016.Stroke_Prevalence,
        Summary2016.Heart_Prevalence,
    ]

    results = db.session.query(
        *sel).filter(Summary2016.City == citydata).all()

    # Create a dictionary entry for each row of metadata information
    Summary2016_dict = {}
    for result in results:
        Summary2016_dict["-City"] = result[0]
        Summary2016_dict["-State"] = result[1]
        Summary2016_dict["Asthma(Prevalence)"] = result[2]
        Summary2016_dict["COPD(Prevalence)"] = result[3]
        Summary2016_dict["Stroke(Prevalence)"] = result[4]
        Summary2016_dict["Heart(Prevalence)"] = result[5]

    print(Summary2016_dict)
    return jsonify(Summary2016_dict)


@app.route("/airquality/<airquality>")
def airquality(airquality):
    """Return `Year`, `data_values`."""
    stmt = db.session.query(AirSummary).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    data = {
        "Year": df.Year.values.tolist(),
        "data_values": df[airquality].values.tolist(),
    }
    return jsonify(data)


@app.route("/world")
def world():

    stmt = db.session.query(WorldAir).statement
    WorldAir_df = pd.read_sql_query(stmt, db.session.bind)

    WorldAir_data = {
        "lat": WorldAir_df.lat.values.tolist(),
        "lng": WorldAir_df.lng.values.tolist(),
        "PM25": WorldAir_df.PM25.values.tolist(),
        "date": WorldAir_df.date.values.tolist(),
    }
    return jsonify(WorldAir_data)


if __name__ == "__main__":
    app.run()
