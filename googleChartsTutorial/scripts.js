// Load Charts and the corechart package.
google.charts.load("current", { packages: ["corechart"] });
google.charts.load("current", { packages: ["gauge"] });

google.charts.setOnLoadCallback(drawSarahChart);
google.charts.setOnLoadCallback(drawChrisChart);
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawLineChart);

// Callback that draws the pie chart for Sarah's pizza.
function drawSarahChart() {
  // Create the data table for Sarah's pizza.
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Topping");
  data.addColumn("number", "Slices");
  data.addRows([
    ["Mushrooms", 1],
    ["Onions", 1],
    ["Olives", 2],
    ["Zucchini", 2],
    ["Pepperoni", 1],
  ]);

  // Set options for Sarah's pie chart.
  var options = {
    title: "How Much Pizza Sarah Ate Last Night",
    width: 400,
    height: 300,
  };

  // Instantiate and draw the chart for Sarah's pizza.
  var chart = new google.visualization.PieChart(
    document.getElementById("Sarah_chart_div")
  );
  chart.draw(data, options);
}

// Callback that draws the pie chart for Anthony's pizza.
function drawChrisChart() {
  // Create the data table for Anthony's pizza.
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Topping");
  data.addColumn("number", "Slices");
  data.addRows([
    ["Mushrooms", 2],
    ["Onions", 2],
    ["Olives", 2],
    ["Zucchini", 0],
    ["Pepperoni", 3],
  ]);

  // Set options for Anthony's pie chart.
  var options = {
    title: "How Much Pizza Anthony Ate Last Night",
    width: 400,
    height: 300,
  };

  // Instantiate and draw the chart for Anthony's pizza.
  var chart = new google.visualization.PieChart(
    document.getElementById("Chris_chart_div")
  );
  chart.draw(data, options);
}

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Label", "Value"],
    ["Memory", 80],
    ["CPU", 55],
    ["Network", 68],
  ]);

  var options = {
    width: 400,
    height: 120,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5,
  };

  var chart = new google.visualization.Gauge(
    document.getElementById("chart_div")
  );

  chart.draw(data, options);

  setInterval(function () {
    data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
    chart.draw(data, options);
  }, 13000);
  setInterval(function () {
    data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
    chart.draw(data, options);
  }, 5000);
  setInterval(function () {
    data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
    chart.draw(data, options);
  }, 26000);
}
function drawLineChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ]);

  var options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}

//windrose
window.onload = function() {
  var dataSourceValue = ko.observable(dataSource[0].values);
  
  var viewModel = {
      polarChartOptions: {
          palette: "soft",
          dataSource: dataSourceValue,
          title: "Wind Rose, Philadelphia PA",
          commonSeriesSettings: {
              type: "stackedbar"
          },
          margin: {
              bottom: 50,
              left: 100
          },
          onLegendClick: function(e){
              var series = e.target;
              if (series.isVisible()) {
                  series.hide();
              } else {
                  series.show();
              }
          },
          argumentAxis: {
              discreteAxisDivisionMode: "crossLabels",
              firstPointOnStartAngle: true
          }, 
          valueAxis: {
              valueMarginsEnabled: false
          },
          "export": {
             enabled: true
          },
          series: [{ valueField: "val1", name: "1.3-4 m/s" },
                  { valueField: "val2", name: "4-8 m/s" },
                  { valueField: "val3", name: "8-13 m/s" },
                  { valueField: "val4", name: "13-19 m/s" },
                  { valueField: "val5", name: "19-25 m/s" },
                  { valueField: "val6", name: "25-32 m/s" },
                  { valueField: "val7", name: "32-39 m/s" },
                  { valueField: "val8", name: "39-47 m/s" }
          ]
      },
      selectBoxOptions: {
          width: 300,
          dataSource: dataSource,
          displayExpr: "period",
          valueExpr: "values",
          value: dataSourceValue,
      }
  };
  
  ko.applyBindings(viewModel, document.getElementById("chart-demo"));
};

var dataSource = [{
      period: "Sep. 1, 2012 -  Oct. 1, 2012",
      values: [{
          arg: "N",
          val1: 0.7,
          val2: 1.7,
          val3: 1.8,
          val4: 0.8,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "NNE",
          val1: 0.1,
          val2: 0.6,
          val3: 0.1,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "NE",
          val1: 0.3,
          val2: 0.8,
          val3: 0.1,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "ENE",
          val1: 0.3,
          val2: 0.7,
          val3: 0.1,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "E",
          val1: 0.7,
          val2: 3.2,
          val3: 2.5,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "ESE",
          val1: 0.8,
          val2: 1.5,
          val3: 0.3,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "SE",
          val1: 0.3,
          val2: 1.3,
          val3: 0.4,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "SSE",
          val1: 0.1,
          val2: 2.4,
          val3: 0.3,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "S",
          val1: 1.1,
          val2: 4.2,
          val3: 2.2,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "SSW",
          val1: 0.6,
          val2: 3.6,
          val3: 3.5,
          val4: 0.4,
          val5: 0.1,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "SW",
          val1: 0.8,
          val2: 2.5,
          val3: 5,
          val4: 1.3,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "WSW",
          val1: 0.3,
          val2: 2.6,
          val3: 3.2,
          val4: 0.4,
          val5: 0,
          val6: 0,
          val7: 0.1,
          val8: 0
      }, {
          arg: "W",
          val1: 0.6,
          val2: 1.7,
          val3: 2.6,
          val4: 0.3,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "WNW",
          val1: 0.7,
          val2: 2.5,
          val3: 3.1,
          val4: 0.3,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "NW",
          val1: 1,
          val2: 3.2,
          val3: 2.6,
          val4: 0.8,
          val5: 0.1,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "NNW",
          val1: 0.6,
          val2: 3.8,
          val3: 4.3,
          val4: 2.2,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }]
  }, {
      period: "Oct. 1, 2012 -  Nov. 1, 2012",
      values: [{
          arg: "N",
          val1: 0.6,
          val2: 1.8,
          val3: 1.9,
          val4: 0.6,
          val5: 0.1,
          val6: 1,
          val7: 0.4,
          val8: 0
      }, {
          arg: "NNE",
          val1: 0.3,
          val2: 1.2,
          val3: 1.5,
          val4: 0.4,
          val5: 0.6,
          val6: 0.3,
          val7: 0,
          val8: 0.1
      }, {
          arg: "NE",
          val1: 0.3,
          val2: 2.4,
          val3: 2.2,
          val4: 1,
          val5: 0.6,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "ENE",
          val1: 1,
          val2: 2.2,
          val3: 1.2,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "E",
          val1: 0.6,
          val2: 4.9,
          val3: 1.8,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0.1
      }, {
          arg: "ESE",
          val1: 0.1,
          val2: 0.6,
          val3: 0.4,
          val4: 0.1,
          val5: 0,
          val6: 0.1,
          val7: 0,
          val8: 0
      }, {
          arg: "SE",
          val1: 0.1,
          val2: 0.3,
          val3: 1.2,
          val4: 0.6,
          val5: 0,
          val6: 0.1,
          val7: 0,
          val8: 0
      }, {
          arg: "SSE",
          val1: 0.4,
          val2: 0.7,
          val3: 1.3,
          val4: 0.3,
          val5: 0,
          val6: 0.1,
          val7: 0,
          val8: 0
      }, {
          arg: "S",
          val1: 0,
          val2: 3.1,
          val3: 3.1,
          val4: 0.7,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "SSW",
          val1: 0.6,
          val2: 1.8,
          val3: 4,
          val4: 1.2,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "SW",
          val1: 0.7,
          val2: 1.8,
          val3: 2.1,
          val4: 1,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "WSW",
          val1: 0.3,
          val2: 2.5,
          val3: 4.8,
          val4: 1.2,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "W",
          val1: 0,
          val2: 2.8,
          val3: 5.8,
          val4: 1.5,
          val5: 0.1,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "WNW",
          val1: 0.3,
          val2: 1.5,
          val3: 3.9,
          val4: 1.3,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "NW",
          val1: 0.1,
          val2: 2.7,
          val3: 1.8,
          val4: 1,
          val5: 0.1,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "NNW",
          val1: 0.3,
          val2: 1.5,
          val3: 0.6,
          val4: 1,
          val5: 0.1,
          val6: 0,
          val7: 0,
          val8: 0
      }]
  }, {
      period: "Nov. 1, 2012 -  Deс. 1, 2012",
      values: [{
          arg: "N",
          val1: 0.7,
          val2: 3,
          val3: 7.4,
          val4: 2.3,
          val5: 0.1,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "NNE",
          val1: 0.4,
          val2: 1.6,
          val3: 2.3,
          val4: 1,
          val5: 0.1,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "NE",
          val1: 0.5,
          val2: 3.4,
          val3: 7.8,
          val4: 1.8,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "ENE",
          val1: 0.3,
          val2: 4.1,
          val3: 1.6,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "E",
          val1: 1.2,
          val2: 1.8,
          val3: 0.4,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "ESE",
          val1: 0.7,
          val2: 0.3,
          val3: 0,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "SE",
          val1: 0.1,
          val2: 0.3,
          val3: 0,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "SSE",
          val1: 0.3,
          val2: 0.4,
          val3: 0.7,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "S",
          val1: 0.4,
          val2: 0.8,
          val3: 1.2,
          val4: 0.4,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "SSW",
          val1: 0.4,
          val2: 1.5,
          val3: 0.1,
          val4: 0.1,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "SW",
          val1: 0.8,
          val2: 0.1,
          val3: 1.2,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "WSW",
          val1: 0,
          val2: 1.5,
          val3: 2.2,
          val4: 0.7,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "W",
          val1: 0.3,
          val2: 1,
          val3: 6.3,
          val4: 2.7,
          val5: 0.4,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "WNW",
          val1: 0.3,
          val2: 1.2,
          val3: 2.7,
          val4: 1.6,
          val5: 0.8,
          val6: 0,
          val7: 0,
          val8: 0
      }, {
          arg: "NW",
          val1: 0.3,
          val2: 0.7,
          val3: 4.8,
          val4: 2,
          val5: 0.3,
          val6: 0.1,
          val7: 0,
          val8: 0
      }, {
          arg: "NNW",
          val1: 0.1,
          val2: 2.5,
          val3: 2.2,
          val4: 2.3,
          val5: 0.7,
          val6: 0.1,
          val7: 0,
          val8: 0
      }]
  }
];