/* jshint esversion: 6*/ 

// Load domains data
const areasArray = areas;
const yearsArray = years;
const develArray = development;
const globalArray = globalareas;

// Set the initial filters.
let   currYear   = "1980";
let   currGlobal = "Global Areas";
let   currDevel  = "All";

// Function to filter Leaflet Map dataset according to selected dropdowns and year.
function filterDataMap( ) {
    let dataResult = [];
    if (currGlobal === "Global Areas") {
        dataResult = global_areas.filter( obj => (obj.devname === currDevel && obj.year == currYear) );
    } else if (currGlobal.substr(0,20) === "Top five countries -") {
        const region = currGlobal.substring(21);
        dataResult = top5countries.filter( obj => (obj.areaname === region && obj.devname === currDevel && obj.year == currYear) );
    } else if (currGlobal.substr(0,17) === "Top ten countries") {
        dataResult = top10countries.filter( obj => (obj.devname === currDevel && obj.year == currYear) );
    }
    // Sort the dataset by value
    dataResult.sort( (a, b) => b.value - a.value);
    return dataResult;
}

// Function to filter bar chart datasets according to selected dropdowns and year.
function filterData( ) {
    let dataResult = [];
    if (currGlobal === "Global Areas") {
        dataResult = global_areas.filter( obj => (obj.devname === currDevel) );
    } else if (currGlobal.substr(0,20) === "Top five countries -") {
        const region = currGlobal.substring(21);
        dataResult = top5countries.filter( obj => (obj.areaname === region && obj.devname === currDevel) );
    } else if (currGlobal.substr(0,17) === "Top ten countries") {
        dataResult = top10countries.filter( obj => (obj.devname === currDevel) );
    }
    // Sort the dataset by value
    dataResult.sort( (a, b) => b.value - a.value);
    return dataResult;
}

// Set initial dataset for Bar Chart and Map/Leaflet
let dataset =  filterData( );
let datasetMap = filterDataMap( );

// Initial values for input range HTML element (slide)
let minYear=d3.min(dataset, obj => obj.year);
let maxYear = d3.max(dataset, obj => obj.year);
let maxvalue = d3.max(dataset, obj => obj.value); 

// Populate drop-downs
// ============================= 
// Mount dropdown to filter Development Areas Category
let dropDevelop = d3.select("#development");
// Clear current drop-down content 
dropDevelop.text("");
// Mount option to Development drop-down list
dropDevelop
.selectAll("option")
.data(develArray)
.enter()
.append("option")  
    .text( d => d);		
// Initialize with option All.    
dropDevelop.property("value", "All");

// Mount dropdown to filter Global Areas
let globalAreas = d3.select("#areas");
// Clear current drop-down content 
globalAreas.text("");
// Mount option to Development drop-down list
globalAreas
.selectAll("option")
.data(globalArray)
.enter()
.append("option")  
    .text( d => d);		
// Initialize with option "Global Areas".    
globalAreas.property("value", "Global Areas");

// Event listener for drop-downs
// =============================
d3.selectAll('select').on('change', () => {
    currGlobal = globalAreas.property("value");
    currDevel  = dropDevelop.property("value");
    updateEverything();
});

// Setting inital data/year to range input HTML element (min, max and initial values):
d3.select("input")
    .property("min",minYear)
    .property("max",maxYear)
    .property("value", minYear);

// Defining the SVG area size .
var svgHeight = 400;
var svgWidth = 570;

let barPadding = 10; // That is the space between the bars.
let barWidth = 0; 

// Space for the y Axis
let yAxisWidth = 50; 

// margins
var margin = {
  top: 50,
  right: 10,
  bottom: 30,
  left: 50
};

// Get the initial number of bars 
numBars = calcNumBars();
function calcNumBars () { 
    let unique = [];
    if (currGlobal === "Global Areas") {
        unique = [...new Set(dataset.map(item => item.areaname))];
    } else {
        unique = [...new Set(dataset.map(item => item.country))];
    }
    return unique.length;
}

// Chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// Initial Calc bar width
barWidth = ( (chartWidth ) / numBars) - barPadding;  

// Create svg container
var svg = d3.select("#svg-area").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Shift everything over by the margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Scale for Y axis
let yScale = d3.scaleLinear()
                .domain(d3.extent(dataset, obj => obj.value))
                .range([chartHeight, 0]); // to flip the graph

// Scale for X axis
var xScale = d3.scaleBand()
.domain(getXdomainScale())
.range([0, chartWidth +  barPadding]);

// Create axes
var leftAxis = d3.axisLeft(yScale);
var bottomAxis = d3.axisBottom(xScale);

// Set x to the bottom of the chart
var xAxis = chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(bottomAxis);

// Set y to the y axis
var yAxis = chartGroup.append("g")
  .call(leftAxis);

// Creating a title
let title = svg
    .append("text")
    .classed("title", true)
    .text("Immigration in " + minYear)
    .attr('x', svgWidth / 2)
    .attr("y", 30)
    .attr("opacity", "0.9")
    .attr("fill","#17A2B8")
    .style("text-anchor", "middle")
    .style("font-size", "1.5em");

// Create tooltip
let tooltip = d3.select("#tool")
    .append("div")
    .classed("tooltip", true);

// Create the color scale for Bar Chart 
var colorScale = d3.scaleLinear()
.domain( d3.extent(dataset, obj => obj.value) )
.range(["purple", "blue"]);

// Create Bar Chart
svg
    .selectAll("rect")
    .data(dataset.filter( d => d.year===minYear)) 
    .enter()
    .append("rect") 
        .attr("width", barWidth )
        .attr("height", obj => chartHeight - yScale(obj.value) ) 
        .attr("y", obj => yScale(obj.value) + 50 ) // Y coordenate to start the rect. 
        .attr("x", (d, i) => (i * (barWidth + barPadding)) + 50 + barPadding) // X coordenate for the rect.
        .attr("fill", d => colorScale(d.value))        
    .on("mousemove", ShowToolTip) 
    .on("touchstart", ShowToolTip)
    .on("mouseout", HideToolTip) 
    .on("touchsend", HideToolTip);

// Now we set the event listener to input HTML element to update our graph 
d3.select("input")
    .on("input", () => {
        // Update global variable for Year
        currYear = +d3.event.target.value;
        svg.selectAll("rect")
            .data(dataset.filter( obj => obj.year === currYear))
            .transition()
            .duration(400)
            .ease(d3.easeLinear)
            .delay( (d,i) => i * 100 )
            .on("start", function( d, i) {
                if ( i === 0 ) { // Listening for rectangles finishing its moviment (transition)
                d3.select('.title')
                    .text("Updating numbers to " + currYear + "...");
                }
            })
            .on("end", function( d, i, nodes ) {
                if ( i === nodes.length - 1 ) { // Listening for rectangles finishing its moviment (transition)
                    d3.select('.title')
                        .text("Immigration in " + currYear);
                }
            })
            .on("interrupt", function() {
               //console.log("Interrupted! No longer updating to " + currYear + " data ...");
            })
                .attr("height", obj => chartHeight - yScale(obj.value)  )
                .attr("y", obj => yScale(obj.value) + 50 )
                .attr("fill", d => colorScale( d.value ));

        // Update title
        title.text("Immigration in " + minYear);
        // Update x axis
        updXaxis();
        // Update Map Leaflet
        updateMap();

    });

// Function to present tooltip on Bar Chart    
function ShowToolTip (d) {
    tooltip
        .style("opacity", 1)
        .style("left", d3.event.x -
                        (tooltip.node().offsetWidth / 2) - 10 + "px")
        .style("top", d3.event.y - (tooltip.node().offsetHeight / 2) - 145 + "px")
        .html(function() {                     
                    if (currGlobal === "Global Areas"){ 
                        return  `
                        <p class="text-center">${getContinentMap(d.areaname)} ${d.areaname}</p>
                        <p class="text-center">Immigration: ${d.value.toLocaleString()}</p>
                            `;
                    } else { 
                        return ` 
                        <p class="text-center"><img src=${d.flag} alt="flag">  ${d.country}</p>
                        <p class="text-center">Immigration: ${d.value.toLocaleString()}</p>
                        `;
                    }
            });
}

// Function to hide tooltip  
function HideToolTip (){
tooltip
    .style("opacity",0);
}

// Function to get the corret FontAwesome icon according to current Global Area.
function getContinentMap(continent) {
    var map = "";
    switch(continent) {
        case "Africa":
          map = "globe-africa";
          break;
        case "Asia":
        case "Oceania":
          map = "globe-asia";
          break;
        case "Europe":
          map = "globe-europe";
          break;
        case "Latin America":
        case "Northern America":
          map = "globe-americas";
        break;
        default:
          return  "";
      }
    return '<span class="fas fa-' + map + '" style="color:#1a4f98"></span>';
}

// Update variables needed to redraw the Bar Chart
function updateVariables () {
    dataset = filterData();
    numBars = calcNumBars();
    barWidth = ( (chartWidth ) / numBars) - barPadding;  
}

// Update Bar Chart
function updBarChart() {
    svg.selectAll("rect")
    .remove()
    .exit();

    svg
    .selectAll("rect")
    .data(dataset.filter( d => d.year==currYear)) 
    .enter()
    .append("rect") 
        .attr("width", barWidth )
        .attr("height", obj => chartHeight - yScale(obj.value) ) 
        .attr("y", obj => yScale(obj.value) + 50 ) // Y coordenate to start the rect. 
        .attr("x", (d, i) => (i * (barWidth + barPadding)) + 50 + barPadding) // X coordenate for the rect.
        .attr("fill", d => colorScale(d.value))
    .on("mousemove", ShowToolTip) 
    .on("touchstart", ShowToolTip)
    .on("mouseout", HideToolTip) 
    .on("touchsend", HideToolTip);
}

// UPDATING X AXIS 
//================================
function getXdomainScale() { 
    var xLabelsAxis =  dataset.filter( obj => { 
        return obj.year == currYear;   
    }).map( obj => (currGlobal === "Global Areas") ? obj.areaname :  obj.country);
    return xLabelsAxis;
}
// Rescale X axis
function newXScale() {
    var xScale = d3.scaleBand()
    .domain(getXdomainScale())
    .range([0, chartWidth + barPadding]);
    return xScale;
}
// function used for updating xAxis 
function xRenderAxes(xScale, xAxis) {
    var bottomAxis = d3.axisBottom(xScale);
    xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
    return xAxis;
}
function updXaxis() {
    xScale = newXScale();
    xAxis = xRenderAxes(xScale, xAxis);
}

//  UPDATING Y AXIS 
// ==================
function newYScale() {
    // create scales
    let yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, obj => obj.value))
    .range([chartHeight, 0]); 
    return yScale;
}
function yRenderAxes(yScale, yAxis) {
    var leftAxis = d3.axisLeft(yScale);
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
    return yAxis;
}
function updYaxis() {
    yScale = newYScale();
    yAxis = yRenderAxes(yScale, yAxis);
}

// Update bar Chart
function updateEverything() {
    updateVariables();
    updXaxis();
    updYaxis();
    updBarChart();
    updateMap();
}
/************************************************* LEAFLET ***************************************************************/
// Function to scale circles on Map
var mapScale = d3.scaleLinear()
.domain(d3.extent(datasetMap, obj => obj.value))
.range([2000, 5000]);

// Function to determine marker size based on immigration
function markerSize(value) {
    var result = mapScale(value);
    result = Math.round(result);
    return result * 200;
}

// Function to get Coordinates for Global Areas
function returnAreaLatLon(area) {
    return areasCoordinates.reduce( ( acc, obj) => {
        if (area === obj.areaname) {
            acc.push(obj.lat);
            acc.push(obj.lon);
        }
        return acc;
    }, []);
}

// Define markers
var markers = [];
function mountMarkers(markers) {
    
    if (currGlobal === "Global Areas") {
        for (var i = 0; i < datasetMap.length; i++) {
            // Setting the marker radius for Global Areas
            markers.push(
                L.circle(returnAreaLatLon(datasetMap[i].areaname), {
                stroke: false,
                fillOpacity: 0.5,
                fillColor: "purple",
                radius: markerSize(datasetMap[i].value)
                }).bindPopup("<span style='font-weight:bold;font-size:1rem;'> " + getContinentMap(datasetMap[i].areaname) + " " +  
                            datasetMap[i].areaname + "</span> <hr> " +
                            "<p>Category: " + currDevel + "</p>" + 
                            "<p>Immigration in " + currYear + ": " + datasetMap[i].value.toLocaleString() + "</p>")
            );
        }
    } else { 
        for (var j = 0; j < datasetMap.length; j++) {
            // Setting the marker radius for Countries
            markers.push(
                L.circle( [datasetMap[j].lat, datasetMap[j].lon], {
                stroke: false,
                fillOpacity: 0.5,
                fillColor: "purple",
                radius: markerSize(datasetMap[j].value)
                }).bindPopup("<span style='font-weight:bold;font-size:1rem;'>" + 
                            "<img style='width:30px; border: 1px solid #dce0e5;' src=" + datasetMap[j].flag + "  alt='flag'>  " + datasetMap[j].country + 
                            "</span> <hr> " +
                            "<p>Category: " + currDevel + "</p>" + 
                            "<p>Immigration in " + currYear + ": " + datasetMap[j].value.toLocaleString() + "</p>")
            );
        }
    }
}

// Define our base layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxzoom: 28,
    id: "mapbox.streets",
    accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxzoom: 28,
    id: "mapbox.dark",
    accessToken: API_KEY
});

// Create the layer
mountMarkers(markers);
var layear = L.layerGroup(markers);

// Create a baseMaps object
var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
};

// Define a map object
var myMap = L.map("map", {
    center: [33, 20],
    zoom: 2,
    layers: [streetmap, layear]
});

// Pass our map layers into our layer control
// Add the layer control to the map
var layerControl = L.control.layers(baseMaps, null, {
    collapsed: false
}).addTo(myMap);


// UPDATE MAP 
// ======================
function updateMap() {
    
    // Update the dataset according with current filters 
    datasetMap = filterDataMap( );

    // Clean last markers
    myMap.remove();
    markers = [];

    // Set new markers 
    mountMarkers(markers);

    // Assign new markers to the layear
    layear = L.layerGroup(markers);

      // Redefine the map object
     myMap = L.map("map", {
        center: [33, 20],
        zoom: 2,
        layers: [streetmap, layear]
      });

    // Add the new object to map
    layerControl.addTo(myMap);

}
