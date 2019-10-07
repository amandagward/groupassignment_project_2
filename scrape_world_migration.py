#!/usr/bin/env python
# coding: utf-8

# # <h1 style="color: purple;">Step 1 - Scraping</h1>


# In[1]:


# Import Dependencies
from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd
from random import *
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from dbconfig import dbname, dbuser, psswd, host, parameters


# In[2]:

def init_browser():
    executable_path = {"executable_path": "/app/.chromedriver/bin/chromedriver"}
    return Browser("chrome", **executable_path, headless=False)

    # executable_path = {"executable_path": "chromedriver.exe"}
    # return Browser("chrome", **executable_path, headless=False)

def scrape():
    connection_string ='mongodb+srv://' + dbuser + ':' + psswd + host + '/' + dbname + "?" + parameters
    
    mongo = PyMongo(app, uri=connection_string)
    global_areas = mongo.db.global_areas.find_one()
    return render_template("index.html", global_areas=global_areas)


    return json_data

