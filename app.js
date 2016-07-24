var sprint = ["Sunday", "Monday", "Tueday", "Wednesday", "Thusday", "Friday", "Saturday"];
var remainingHours = 30;
var actualBurnData = [1, 2, 3, 4, 5];
var sprintLength = sprint.length;
var actualBurnDays = actualBurnData.length;
var remainingDay = sprintLength - actualBurnDays;
var averageBurnValue, expectedBurnValue;

var actualData = generageActualData();
var averageData = generateAverageData();
var expectedData = generateExpectedData();

function generageActualData() {
  return actualBurnData.map(function(x) {
    return remainingHours - (+x);
  });
}

function generateAverageData() {
  var sum = 0;
  actualBurnData.forEach(function(value) {
    sum += value;
  });
  var average = sum / actualBurnDays;
  averageBurnValue = average;
  var data = [];
  i = 0;
  while (true) {
    data[i] = remainingHours - average * (i+1);
    if (data[i] <= 0) break;
    i++;
  }
  return data;
}

function generateExpectedData() {
  var data = [];
  data[actualBurnDays - 1] = actualData[actualBurnDays - 1];
  var rate = (data[actualBurnDays - 1] - 0) / remainingDay;
  expectedBurnValue = rate;
  for (var i = actualBurnDays; i < sprintLength - 1; i++) {
    data[i] = data[i - 1] - rate;
  }
  data[sprintLength - 1] = 0;
  return data;
}

var ChartData = {
    labels: sprint.concat(['...', '...', '...']),
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
                    ticks: {
                      max: remainingHours,
                      min: 0,
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Hours'
                    }
                }]
            },
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: function(tooltipItems, data) {
                        switch (tooltipItems.datasetIndex) {
                          case 0:
                            return remainingHours - (+tooltipItems.yLabel) + ' hr';
                          case 1:
                            return averageBurnValue + ' hr / day';
                          default:
                            return expectedBurnValue + ' hr / day';
                            break;
                        }
                    },
                    title: function(tooltipItems) {
                        switch (tooltipItems[0].datasetIndex) {
                          case 0:
                            return 'Actual ' + '(' + tooltipItems[0].xLabel + ')';
                          case 1:
                            return 'Average (Velocity)';
                          default:
                            return 'Expected (Velocity)';
                            break;
                        }
                    },
                }
            },
        }
    });
};
