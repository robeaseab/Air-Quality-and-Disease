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


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/data/<citydata>")
def summary2016(citydata):
    """Return the MetaData for a given sample."""
    sel = [
        Summary2016.City,
        Summary2016.State,
        # Summary2016.Asthma_Prevalence,
    ]

    results = db.session.query(
        *sel).filter(Summary2016.City == citydata).all()

    # Create a dictionary entry for each row of metadata information
    Summary2016_dict = {}
    for result in results:
        Summary2016_dict["City"] = result[0]
        Summary2016_dict["State"] = result[1]
        # Summary2016_dict["Asthma_Prevalence"] = result[2]

    print(Summary2016_dict)
    return jsonify(Summary2016_dict)


if __name__ == "__main__":
    app.run()
