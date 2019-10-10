// The data used in this Chart comes from the domains.js file.
//===========================================================
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: years,
        datasets: [{
            label: 'Total',
            data: total,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
        }]
    },
    options: {
        responsive:false,
        scales: {
            
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

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
