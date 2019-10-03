/* jshint esversion: 6*/ 

let tempDataset = continents;

const areasArray = areas;
const yearsArray = years;
const develArray = development;
const globalArray = globalareas;
let dataset = tempDataset;

// let dataset = continents.reduce( (acc, value, index, array) => {
//     if (true) {
//         console.log("VALUE ", value);
//         console.log("INDEX ", index);
//         console.log("ARRAY ", array);
//     }
//     return acc;
// },[]);   


function returnBase(  ) {

    let dataResult = [];

    // console.log(d3.select("#development").property("value")); 
    const dropDevelValue  = d3.select("#development").property("value"); 

    if (dropDevelValue === "All") { 
        for (var i = 0; i < areasArray.length; i++) {
            for (var j = 0; j < yearsArray.length; j++) {
                var result = tempDataset.filter( function (obj) {
                    return  (obj.areaname == areasArray[i] && obj.year == yearsArray[j]);
                });
                // Sum the values for Continent/Area and year     
                value = result.reduce( (acc, value) => { return acc += value.value; }, 0 );
                dataResult.push({
                    areaname: areasArray[i],
                    year: yearsArray[j],
                    value: value 
                }); 
            }
        }
    } else {
        dataResult = tempDataset.filter( obj => (obj.devname === dropDevelValue) );
    }
    return dataResult;
    
}
 

let minYear=d3.min(dataset, obj => obj.year);
let maxYear = d3.max(dataset, obj => obj.year);
let maxvalue = d3.max(dataset, obj => obj.value); // Max number of value.

// ****************  Dealing with drop-downs
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
// Initialize with All option.    
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
// Initialize with All option.    
globalAreas.property("value", "Global Areas");

//****   Event listener for drop-downs
d3.selectAll('select').on('change', () => {
    d3.event.preventDefault();
    dataset = returnBase();
    console.log(dataset);  
});

// Setting inital data to range input HTML element (min, max and initial values):
d3.select("input")
    .property("min",minYear)
    .property("max",maxYear)
    .property("value", minYear);

// Defining the size of the svg area.

// let numBars = 12; // This number should be get from the array and not be hard coded. In this case means 12 months.
let barPadding = 10; // That is the space between the bars.
let yAxisWidth = 50; // Space for the y Axis
// let barWidth = 0; 

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
    return dataset.reduce( (acc,value) => {
        if (acc[0] != value.areaname) {
            acc[1] += 1;
        }
        acc[0] = value.areaname;
        return acc;
    }, ["",0])[1];
}


// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// Calc bar width
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
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

// Set x to the bottom of the chart
chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

// Set y to the y axis
chartGroup.append("g")
  .call(yAxis);

// Creating a title
svg
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
        let year = +d3.event.target.value;
        svg.selectAll("rect")
            .data(dataset.filter( obj => obj.year === year))
            .transition()
            .duration(400)
            .ease(d3.easeLinear)
            .delay( (d,i) => i * 100 )
            .on("start", function( d, i) {
                if ( i === 0 ) { // Listening for rectangles finishing its moviment (transition)
                d3.select('.title')
                    .text("Updating numbers to " + year + "...");
                }
            })
            .on("end", function( d, i, nodes ) {
                if ( i === nodes.length - 1 ) { // Listening for rectangles finishing its moviment (transition)
                    d3.select('.title')
                        .text("Birth Data in " + year);
                }
            })
            .on("interrupt", function() {
                console.log("Interrupted! No longer updating to " + year + " data ...");
            })
                .attr("height", obj => chartHeight - yScale(obj.value)  )
                .attr("y", obj => yScale(obj.value) + 50 );
        document.getElementsByTagName("h5")[0].innerHTML = "Year - " + year;
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