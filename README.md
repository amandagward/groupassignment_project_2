UofTSTG201905DATA3 Project #2
Visualize Me, Captain!

By Paulo, Shrey, Anthony, and Amanda

Tell a Story with Data.


Project Requirements
Your task is to tell a story through data visualizations.
Focus on providing users an interactive means to explore data themselves. Prepare a 10-minute presentation that lays out your theme, coding approach, data munging techniques, and final visualization.
You may choose a project of any theme, but we encourage you to think broadly.
You will have ample time in class to work with your group, but expect to put in hours outside of class as well.

Specific Requirements
Your visualization must include a Python Flask–powered RESTful API, HTML/CSS, JavaScript, and at least one database (SQL, MongoDB, SQLite, etc.). 
Your project should fall into one of the below four tracks:
○ A custom “creative” D3.js project (i.e., a nonstandard graph or chart)
○ A combination of web scraping and Leaflet or Plotly
○ A dashboard page with multiple charts that update from the same data
○ A “thick” server that performs multiple manipulations on data in a database prior to visualization (must be approved)
Your project should include at least one JS library that we did not cover.
Your project must be powered by a data set with at least 100 records.
Your project must include some level of user-driven interaction (e.g., menus, dropdowns, textboxes).
Your final visualization should ideally include at least three views. 


Project Proposal

Topic:
Analyzing Canadian Immigration from 1980 to 2013.

Rationale:
Canadian immigration is ever-changing, and the areas from which immigration to Canada is prevalent changes every year. We are able to present the different areas, and level of wealth of the Countries that Canadian immigrants are coming from.
In a bar graph form, we will present the Continents, Regions, and Development status of immigrations to Canada, by showing the count of immigrants associated with each. There will be a dropdown to select the different groupings, and a slider to select the different years.
In map form, we will present Country-level data, to show the prevalence of immigration in each country, during which users will also be able to dynamically change the year to see the differences over time.
Our data for immigration will be converted to CSV format, and grouped in Pandas. The REST Countries API (https://restcountries.eu/#api-endpoints-full-name) will be used to gain additional information about the countries, which users will be able to view this information (and potentially a flag) by hovering or click on a country on the map. 

A link to our data set(s)/screenshot of the metadata:
CSV File:
https://drive.google.com/file/d/1KMMy2XNENtToW3OXDhHcmCWWHDzubVHZ/view?usp=sharing
