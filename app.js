var randomScalingFactor = function() {
    return (Math.random() > 0.5 ? 1.0 : 2.0) * Math.round(Math.random() * 100);
};

var data = '1234567'.split('').map(function() {
  return randomScalingFactor();
});

var actualData = data;
var averageData = data;
var expectedData = [null, null, null, null, data[4], 80, 20];

var ChartData = {
    labels: ["Sunday", "Monday", "Tueday", "Wednesday", "Thusday", "Friday", "Saturday"],
    datasets: [{
        type: 'bar',
        label: 'Actual',
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        data: actualData,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
    }, {
        type: 'line',
        tension: 0,
        label: 'Average (Velocity)',
        backgroundColor: "rgba(255,99,132, 0)",
        data: averageData,
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2
    }, {
        type: 'line',
        tension: 0,
        label: 'Expected (Velocity)',
        backgroundColor: "rgba(255,99,132, 0)",
        data: expectedData,
        borderColor: "rgba(255, 206, 86, 1)",
    }
  ]
};
window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: ChartData,
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Burndown Chart'
            },
            scales: {
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Hours'
                    }
                }]
            }
        }
    });
};
