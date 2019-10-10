var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: years,
        datasets: [{
            label: 'Total',
            data: total,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)' 
            ],
            borderColor: [
            'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)' 
            ],
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
    //var newColor = utils.color(myChart.data.datasets.length);
    myChart.data.datasets.push({
        label: "Oceania",
        data: oceania,
        backgroundColor: 'blue',
        borderColor: 'blue'
    });
    myChart.update();
}
function addNAmeria() {
    //var newColor = utils.color(myChart.data.datasets.length);
    myChart.data.datasets.push({
        label: "North America",
        data: northernAmerica,
        backgroundColor: 'rgba(50,205,50,0.2)',
        borderColor: 'rgb(50,205,50)'
    });
    myChart.update();
}
function addLAmeria() {
    //var newColor = utils.color(myChart.data.datasets.length);
    myChart.data.datasets.push({
        label: "Latin America",
        data: latinAmerica,
        backgroundColor: 'rgba(231,0,23, 0.2)',
        borderColor: 'rgb(231,0,23)'
    });
    myChart.update();
}
function addEurope() {
    //var newColor = utils.color(myChart.data.datasets.length);
    myChart.data.datasets.push({
        label: "Europe",
        data: europe,
        backgroundColor: 'rgba(160,82,45,0.2)',
        borderColor: 'rgb(160,82,45)'
    });
    myChart.update();
}
function addAfrica() {
    //var newColor = utils.color(myChart.data.datasets.length);
    myChart.data.datasets.push({
        label: "Africa",
        data: africa,
        backgroundColor: 'rgba(0,139,231,0.2)',
        borderColor: 'rgb(0,139,231)'
    });
    myChart.update();
}

function addAsia() {
    //var newColor = utils.color(myChart.data.datasets.length);
    myChart.data.datasets.push({
        label: "Asia",
        data: asia,
        backgroundColor: 'rgba(170,87,255,0.2)',
        borderColor: 'rgb(170,87,255)'
    });
    myChart.update();
}



