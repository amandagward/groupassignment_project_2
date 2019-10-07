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

// Function to filter datasets according to dropdowns and year selected.
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

// get the initial dataset 
let dataset =  filterData( );

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
let barWidth = 0; 

// Space for the y Axis
let yAxisWidth = 50; 

// SVG container
var svgHeight = 400;
var svgWidth = 630;

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
    .text("Migration in " + minYear)
    .attr('x', svgWidth / 2)
    .attr("y", 30)
    .attr("opacity", "0.7")
    .style("text-anchor", "middle")
    .style("font-size", "1.5em");

let tooltip = d3.select("#tool")
    .append("div")
    .classed("tooltip", true);


var colorScale = d3.scaleLinear()
.domain( d3.extent(dataset, obj => obj.value) )
.range(["purple", "pink"]);


svg
    .selectAll("rect")
    .data(dataset.filter( d => d.year===minYear)) // Initial value for bars
    .enter()
    .append("rect") 
        .attr("width", barWidth )
        .attr("height", obj => chartHeight - yScale(obj.value) ) // The height of SVG minus the number used for bars (Probably we will have to scale the data).
        .attr("y", obj => yScale(obj.value) + 50 ) // Y coordenate to start the rect. 
        .attr("x", (d, i) => (i * (barWidth + barPadding)) + 50 + barPadding) // X coordenate for the rect.
        .attr("fill", d => colorScale(d.value))        
        // .attr("fill", "purple")
    .on("mousemove", ShowToolTip) 
    .on("touchstart", ShowToolTip)
    .on("mouseout", HideToolTip) 
    .on("touchsend", HideToolTip);

// Now we set the event listener to input HTML element to update our graph 
//if the user change/input the input/range element 
d3.select("input")
    .on("input", () => {
        currYear = +d3.event.target.value;


        // var colorScale = d3.scaleLinear()
        // .domain( d3.extent(dataset, obj => obj.value) )
        // .range(["purple", "white"]);
    
    

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
                        .text("Migration in " + currYear);
                }
            })
            .on("interrupt", function() {
                console.log("Interrupted! No longer updating to " + currYear + " data ...");
            })
                .attr("height", obj => chartHeight - yScale(obj.value)  )
                .attr("y", obj => yScale(obj.value) + 50 )
                .attr("fill", d => colorScale( d.value ));

        // Update title
        title.text("Migration in " + minYear);
        // Update x axis
        updXaxis();

    });

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
                        <p>Migration: ${d.value.toLocaleString()}</p>
                            `;
                    } else { 
                        return ` 
                        <p class="text-center"><img src=${d.flag} alt="flag">  ${d.country}</p>
                        <p>Migration: ${d.value.toLocaleString()}</p>
                        `;
                    }
            });
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
    dataset = filterData();
    numBars = calcNumBars();
    barWidth = ( (chartWidth ) / numBars) - barPadding;  
}

function updBarsChart() {
    console.log("Running function updBarsChart");
    
    test = dataset.filter( d => d.year===currYear);
    console.log("currYear ",currYear);
    console.log("currGlobal ", currGlobal );
    console.log("currDevel ", currDevel );
    console.log(dataset);
    console.log("barWidth ", barWidth );
    

    // var colorScale = d3.scaleLinear()
    // .domain( d3.extent(dataset, obj => obj.value) )
    // .range(["purple", "white"]);


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
        .attr("x", (d, i) => (i * (barWidth + barPadding)) + 50 + barPadding) // X coordenate for the rect.
        .attr("fill", d => colorScale(d.value))
    .on("mousemove", ShowToolTip) 
    .on("touchstart", ShowToolTip)
    .on("mouseout", HideToolTip) 
    .on("touchsend", HideToolTip);
}



/************* UPDATING X AXIS */

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
