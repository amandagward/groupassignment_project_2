// The data used in this Chart comes from the domains.js file.
//===========================================================
var ctx = document.getElementById('myChart').getContext('2d');
var config = {
    type: 'line',
    data: {
        labels: years
    },
    options: {
        responsive:false,
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    return " Immigration: " + tooltipItem.yLabel.toLocaleString();
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(label, index, labels) { return (label > 499) ? label/1000 + 'K' : label; },
                    scaleLabel: {
                        display: true,
                        labelString: '1K = 1000'
                    }
                }
            }]
        }
    }
};
var myChart = new Chart(ctx, config );

function addOceania() {
    myChart.data.datasets.push({
        label: "Oceania",
        data: oceania,
        backgroundColor: 'rgba(0,0,255,0.2)',
        borderColor: 'rgb(0,0,255)',
        borderWidth: 1
    });
    myChart.update();
    document.getElementById("oceania").disabled = true;
}
function addNAmeria() {
    myChart.data.datasets.push({
        label: "North America",
        data: northernAmerica,
        backgroundColor: 'rgba(50,205,50,0.2)',
        borderColor: 'rgb(50,205,50)',
        borderWidth: 1
    });
    myChart.update();
    document.getElementById("namerica").disabled = true;
}
function addLAmeria() {
    myChart.data.datasets.push({
        label: "Latin America",
        data: latinAmerica,
        backgroundColor: 'rgba(231,0,23, 0.2)',
        borderColor: 'rgb(231,0,23)',
        borderWidth: 1
    });
    myChart.update();
    document.getElementById("lamerica").disabled = true;
}
function addEurope() {
    myChart.data.datasets.push({
        label: "Europe",
        data: europe,
        backgroundColor: 'rgba(160,82,45,0.2)',
        borderColor: 'rgb(160,82,45)',
        borderWidth: 1
    });
    myChart.update();
    document.getElementById("europe").disabled = true;
}
function addAfrica() {
    myChart.data.datasets.push({
        label: "Africa",
        data: africa,
        backgroundColor: 'rgba(0,139,231,0.2)',
        borderColor: 'rgb(0,139,231)',
        borderWidth: 1
    });
    myChart.update();
    document.getElementById("africa").disabled = true;
}
function addAsia() {
    myChart.data.datasets.push({
        label: "Asia",
        data: asia,
        backgroundColor: 'rgba(170,87,255,0.2)',
        borderColor: 'rgb(170,87,255)',
        borderWidth: 1
    });
    myChart.update();
    document.getElementById("asia").disabled = true;
}
function addTotal() {
    myChart.data.datasets.push({
        label: "Total",
        data: total,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
    });
    myChart.update();
    document.getElementById("total").disabled = true;
}

// Reset datasets
// ==============
document.getElementById('reset').addEventListener('click', function() {
    // Remove datasets from chart
    config.data.datasets.splice(0, config.data.datasets.length);
    myChart.update();
    // Enable btns
    document.getElementById("total").disabled = false;
    document.getElementById("asia").disabled = false;
    document.getElementById("africa").disabled = false;
    document.getElementById("europe").disabled = false;
    document.getElementById("lamerica").disabled = false;
    document.getElementById("namerica").disabled = false;
    document.getElementById("oceania").disabled = false;
});
