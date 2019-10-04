/* jshint esversion: 6*/ 

// Start bar chart with 
let tempDataset = global_areas;

const areasArray = areas;
const yearsArray = years;
const develArray = development;
const globalArray = globalareas;

// Set the initial filters.
let   currYear   = "1980";
let   currGlobal = "Global Areas";
let   currDevel  = "All";

function returnBase(  ) {

    let dataResult = [];

    if (currGlobal === "Global Areas") {
        dataResult = tempDataset.filter( obj => (obj.devname === currDevel) );
    } else {
        console.log("We need to put finish that part.")
    }
    // if (currDevel === "All") { 
    //     console.log("Get all ", currDevel);
    //     dataResult = areasNoDevel;
    // } else {
    //     console.log("Get Dev area ", currDevel);
    //     dataResult = tempDataset.filter( obj => (obj.devname === currDevel) );
    // }
    return dataResult;
}

// get the initial dataset 
let dataset =  returnBase( );

// Initial values for input range element
let minYear=d3.min(dataset, obj => obj.year);
let maxYear = d3.max(dataset, obj => obj.year);
let maxvalue = d3.max(dataset, obj => obj.value); 

// Populate drop-downs
// ============================= 
// Mount dropdown to filter Level Development Areas
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

    console.log("drop-downs event listener");
    currGlobal = globalAreas.property("value");
    currDevel  = dropDevelop.property("value");
    updateEveryting();

});

// Setting inital data to range input HTML element (min, max and initial values):
d3.select("input")
    .property("min",minYear)
    .property("max",maxYear)
    .property("value", minYear);

// Defining the size of the svg area.
let barPadding = 10; // That is the space between the bars.
let yAxisWidth = 50; // Space for the y Axis
let barWidth = 0; 

// svg container
var svgHeight = 400;
var svgWidth = 700;

// margins
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// Get the number of bars 
numBars = calcNumBars(dataset, 'areaname');

function calcNumBars (dataset, key) { 

    if (currGlobal === "Global Areas") {
        // const unique = [...new Set(array.map(item => item.age))];
        return dataset.reduce( (acc,value) => {
            if (acc[0] != value.areaname) {
                acc[1] += 1;
            }
            acc[0] = value.areaname;
            return acc;
        }, ["",0])[1];
    } else {
        console.log("We need to put finish that part.");
    }

    return 0;

}


// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// Initial Calc bar width
barWidth = ( (chartWidth ) / numBars) - barPadding;  

// create svg container
var svg = d3.select("#svg-area").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// shift everything over by the margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Scale for Y axis
// let yScale = d3.scaleLinear()
//                 .domain([0,maxvalue])
//                 .range([height, 0]); // to flip the graph
// OR USING extent directly
let yScale = d3.scaleLinear()
                .domain(d3.extent(dataset, obj => obj.value))
                .range([chartHeight, 0]); // to flip the graph

// Scale for X axis
var xScale = d3.scaleBand()
.domain(dataset.map(obj => obj.areaname))
.range([0, chartWidth ]);

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
    .text("Birth Data in " + minYear)
    .attr('x', svgWidth / 2)
    .attr("y", 30)
    .style("text-anchor", "middle")
    .style("font-size", "1.5em");

let tooltip = d3.select("body")
    .append("div")
    .classed("tooltip", true);

svg
    .selectAll("rect")
    .data(dataset.filter( d => d.year===minYear)) // Initial value for bars
    .enter()
    .append("rect") 
        .attr("width", barWidth )
        .attr("height", obj => chartHeight - yScale(obj.value) ) // The height of SVG minus the number used for bars (Probably we will have to scale the data).
        .attr("y", obj => yScale(obj.value) + 50 ) // Y coordenate to start the rect. 
        .attr("x", (d, i) => (i * (barWidth + barPadding)) + 55) // X coordenate for the rect.
        .attr("fill", "purple")
    .on("mousemove", ShowToolTip) 
    .on("touchstart", ShowToolTip)
    .on("mouseout", HideToolTip) 
    .on("touchsend", HideToolTip);

// Now we set the event listener to input HTML element to update our graph if the user change/input the input/range element 
d3.select("input")
    .on("input", () => {
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
                        .text("Birth Data in " + currYear);
                }
            })
            .on("interrupt", function() {
                console.log("Interrupted! No longer updating to " + currYear + " data ...");
            })
                .attr("height", obj => chartHeight - yScale(obj.value)  )
                .attr("y", obj => yScale(obj.value) + 50 );
        
        title.text("Birth Data in " + minYear);
    });

function ShowToolTip (d) {
    tooltip
        .style("opacity", 1)
        .style("left", d3.event.x -
                        (tooltip.node().offsetWidth / 2) + "px")
        .style("top", d3.event.y - (tooltip.node().offsetHeight / 2) - 70 + "px")
        .html(`
        <p class="text-center">${getContinentMap(d.areaname)} ${d.areaname}</p>
        <p>Migration: ${d.value.toLocaleString()}</p>
            `
            // <div class="flag-wrapper">
            //     <img src="https://restcountries.eu/data/alb.svg" alt="flag">
            // </div>
        );
}

function HideToolTip (){
tooltip
    .style("opacity",0);
}

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

function updateVariables () {
    // d3.event.preventDefault();
    dataset = returnBase();
    numBars = calcNumBars(dataset, 'areaname');
    barWidth = ( (chartWidth ) / numBars) - barPadding;  
}

function updBarsChart() {
    console.log("Running function updBarsChart");
    
    test = dataset.filter( d => d.year===currYear);
    console.log(currYear);
    console.log(dataset);
    console.log("barWidth ", barWidth );
    console.log("numBars ", numBars );
    
    svg.selectAll("rect")
    .remove()
    .exit();

    svg
    .selectAll("rect")
    .data(dataset.filter( d => d.year===currYear)) // Initial value for bars
    .enter()
    .append("rect") 
        .attr("width", barWidth )
        .attr("height", obj => chartHeight - yScale(obj.value) ) // The height of SVG minus the number used for bars (Probably we will have to scale the data).
        .attr("y", obj => yScale(obj.value) + 50 ) // Y coordenate to start the rect. 
        .attr("x", (d, i) => (i * (barWidth + barPadding)) + 55) // X coordenate for the rect.
        .attr("fill", "purple")
    .on("mousemove", ShowToolTip) 
    .on("touchstart", ShowToolTip)
    .on("mouseout", HideToolTip) 
    .on("touchsend", HideToolTip);
}

/************* UPDATING X AXIS */
function newXScale() {
    var xScale = d3.scaleBand()
    .domain(dataset.map(obj => obj.areaname))
    .range([0, chartWidth ]);
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
    // // Step 1 - chosenXAxis is the name of KEY
    xScale = newXScale();
    xAxis = xRenderAxes(xScale, xAxis);
}
/************* UPDATING Y AXIS */
function newYScale() {
    // create scales
    let yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, obj => obj.value))
    .range([chartHeight, 0]); 
    return yScale;
}
// function used for updating yAxis var upon click on axis label
function yRenderAxes(yScale, yAxis) {
    var leftAxis = d3.axisLeft(yScale);
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
    return yAxis;
}
function updYaxis() {
    console.log("Running function updYaxis");
    yScale = newYScale();
    yAxis = yRenderAxes(yScale, yAxis);
}
/************* END UPDATING Y AXIS */

function updateEveryting() {
    updateVariables();
    updXaxis();
    updYaxis();
    updBarsChart();
}
