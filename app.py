# import dependencies
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_world_migration
from dbconfig import dbname, dbuser, psswd, host, parameters

app = Flask(__name__)

connection_string ='mongodb+srv://' + dbuser + ':' + psswd + host + '/' + dbname + "?" + parameters
  
mongo = PyMongo(app, uri=connection_string)

@app.route("/")
def index():
    globalareas = mongo.db.global_areas.find_one()
    top5countries = mongo.db.top5countries.find_one()
    top10countries = mongo.db.top10countries.find_one()
    tables = [ globalareas, top5countries, top10countries]
    return render_template("index.html", tables=tables)

@app.route("/scrape")
def scrape():
    mars = mongo.db.mars
    print("E AQUI *****************************************************************$$$$$$$$$*")
    data = scrape_mars.scrape()
    print("E AQUI QUE COMEÇA******************************************************************")
    mars.update({}, data, upsert=True)
    return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug=True)