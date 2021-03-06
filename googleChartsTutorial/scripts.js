// Load Charts and the corechart package.
google.charts.load("current", { packages: ["corechart"] });
google.charts.load("current", { packages: ["gauge"] });

google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawLineChart);
google.charts.setOnLoadCallback(drawStackedChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Label", "Value"],
    ["Phycocyanin", 80],
    ["Chlorophyll ", 55],
  ]);

  var options = {
    greenFrom: 0,
    greenTo: 35,
    yellowFrom: 35,
    yellowTo: 75,
    redFrom: 75,
    redTo: 100,
    minorTicks: 5,
  };

  var chart = new google.visualization.Gauge(
    document.getElementById("chart_div")
  );

  chart.draw(data, options);

  //The functions below is something that I included to show
  // when the arrow moves in the gauge. This is not relevant
  // to the  data we would use for this.
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
    [
      "Time of Day",
      "Air Temp(F)",
      "Water Temp (F) at 2 Meters",
      "Water Temp (F) at 11 Meters",
    ],
    ["12:00 am", 66, 71, 56.3],
    ["1:00 am", 66.8, 71.3, 56.4],
    ["2:00 am", 67.2, 71.5, 56.4],
    ["3:00 am", 67.5, 71.8, 56.6],
    ["4:00 am", 66, 71, 56.3],
    ["5:00 am", 66.8, 71.3, 56.4],
    ["6:00 am", 67.2, 71.5, 56.4],
    ["7:00 am", 67.5, 71.8, 56.6],
    ["8:00 am", 66, 71, 56.3],
    ["9:00 am", 66.8, 71.3, 56.4],
    ["10:00 am", 67.2, 71.5, 56.4],
    ["11:00 am", 67.5, 71.8, 56.6],
    ["12:00 pm", 67.2, 71.5, 56.4],
    ["1:00 pm", 67.5, 71.8, 56.6],
  ]);

  var options = {
    title: "Air Temp and Water Temp for August 19 2021",
    curveType: "function",
    legend: { position: "bottom" },
  };

  var chart = new google.visualization.LineChart(
    document.getElementById("curve_chart")
  );

  chart.draw(data, options);
}

function drawStackedChart() {
  var data = google.visualization.arrayToDataTable([
    [
      "Column Name",
      "2 Meters",
      "4 Meters",
      "7 Meters",
      "9 Meters",
      "11 Meters",
    ],
    ["Water Column", 71.3, 71.5, 71.4, 70.5, 62],
    ["", 0, 0, 0, 0, 0],
    ["Dissolved Oxygen", 8.53, 8.47, 7.36, 5.7, 5.7],
  ]);

  var view = new google.visualization.DataView(data);
  view.setColumns([
    0,
    1,
    { calc: "stringify", sourceColumn: 1, type: "string", role: "annotation" },
    2,
    { calc: "stringify", sourceColumn: 2, type: "string", role: "annotation" },
    3,
    { calc: "stringify", sourceColumn: 3, type: "string", role: "annotation" },
    4,
    { calc: "stringify", sourceColumn: 4, type: "string", role: "annotation" },
    5,
    { calc: "stringify", sourceColumn: 5, type: "string", role: "annotation" },
  ]);

  var options_fullStacked = {
    colors: ["#026efc", "#0b9bc6", "#49d3e5", "#e8c127", "#e88a27"],
    isStacked: "relative",
    height: 500,
    legend: { position: "top", maxLines: 3 },
    vAxis: {
      minValue: 0,
      ticks: [0, 0.3, 0.6, 0.9, 1],
    },
  };

  var chart = new google.visualization.SteppedAreaChart(
    document.getElementById("chart_div_stacked")
  );

  chart.draw(view, options_fullStacked);
}

//windrose
$(function () {
  var radarOptions = {
    palette: "soft",
    dataSource: dataSource[0].values,
    title: "Wind Rose, Muskegon Lake, MI",
    commonSeriesSettings: {
      type: "stackedbar",
    },
    margin: {
      bottom: 50,
      left: 100,
    },
    onLegendClick: function (e) {
      var series = e.target;
      if (series.isVisible()) {
        series.hide();
      } else {
        series.show();
      }
    },
    argumentAxis: {
      discreteAxisDivisionMode: "crossLabels",
      firstPointOnStartAngle: true,
    },
    valueAxis: {
      valueMarginsEnabled: false,
    },
    export: {
      enabled: true,
    },
    series: [
      { valueField: "val1", name: "1.3-4 m/s" },
      { valueField: "val2", name: "4-8 m/s" },
      { valueField: "val3", name: "8-13 m/s" },
      { valueField: "val4", name: "13-19 m/s" },
      { valueField: "val5", name: "19-25 m/s" },
      { valueField: "val6", name: "25-32 m/s" },
      { valueField: "val7", name: "32-39 m/s" },
      { valueField: "val8", name: "39-47 m/s" },
    ],
  };

  var radar = $("#radarChart")
    .dxPolarChart(radarOptions)
    .dxPolarChart("instance");

  $("#radarPeriods").dxSelectBox({
    width: 300,
    dataSource: dataSource,
    displayExpr: "period",
    valueExpr: "values",
    value: dataSource[0].values,
    onValueChanged: function (e) {
      radar.option("dataSource", e.value);
    },
  });
});

// The values for the below are fake data that come from
// the jQuery windrose template.
var dataSource = [
  {
    period: "Aug. 19, 2021 12am-Aug. 19, 2021 12pm",
    values: [
      {
        arg: "N",
        val1: 0.7,
        val2: 1.7,
        val3: 1.8,
        val4: 0.8,
        val5: 0,
        val6: 0,
        val7: 0,
        val8: 0,
      },
      {
        arg: "NNE",
        val1: 0.1,
        val2: 0.6,
        val3: 0.1,
        val4: 0,
        val5: 0,
        val6: 0,
        val7: 0,
        val8: 0,
      },
      {
        arg: "NE",
        val1: 0.3,
        val2: 0.8,
        val3: 0.1,
        val4: 0,
        val5: 0,
        val6: 0,
        val7: 0,
        val8: 0,
      },
      {
        arg: "ENE",
        val1: 0.3,
        val2: 0.7,
        val3: 0.1,
        val4: 0,
        val5: 0,
        val6: 0,
        val7: 0,
        val8: 0,
      },
      {
        arg: "E",
        val1: 0.7,
        val2: 3.2,
        val3: 2.5,
        val4: 0,
        val5: 0,
        val6: 0,
        val7: 0,
        val8: 0,
      },
      {
        arg: "ESE",
        val1: 0.8,
        val2: 1.5,
        val3: 0.3,
        val4: 0,
        val5: 0,
        val6: 0,
        val7: 0,
        val8: 0,
      },
      {
        arg: "SE",
        val1: 0.3,
        val2: 1.3,
        val3: 0.4,
        val4: 0,
        val5: 0,
        val6: 0,
        val7: 0,
        val8: 0,
      },
      {
        arg: "SSE",
        val1: 0.1,
        val2: 2.4,
        val3: 0.3,
        val4: 0,
        val5: 0,
        val6: 0,
        val7: 0,
        val8: 0,
      },
      {
        arg: "S",
        val1: 1.1,
        val2: 4.2,
        val3: 2.2,
        val4: 0,
        val5: 0,
        val6: 0,
        val7: 0,
        val8: 0,
      },
      {
        arg: "SSW",
        val1: 0.6,
        val2: 3.6,
        val3: 3.5,
        val4: 0.4,
        val5: 0.1,
        val6: 0,
        val7: 0,
        val8: 0,
      },
      {
        arg: "SW",
        val1: 0.8,
        val2: 2.5,
        val3: 5,
        val4: 1.3,
        val5: 0,
        val6: 0,
        val7: 0,
        val8: 0,
      },
      {
        arg: "WSW",
        val1: 0.3,
        val2: 2.6,
        val3: 3.2,
        val4: 0.4,
        val5: 0,
        val6: 0,
        val7: 0.1,
        val8: 0,
      },
      {
        arg: "W",
        val1: 0.6,
        val2: 1.7,
        val3: 2.6,
        val4: 0.3,
        val5: 0,
        val6: 0,
        val7: 0,
        val8: 0,
      },
      {
        arg: "WNW",
        val1: 0.7,
        val2: 2.5,
        val3: 3.1,
        val4: 0.3,
        val5: 0,
        val6: 0,
        val7: 0,
        val8: 0,
      },
      {
        arg: "NW",
        val1: 1,
        val2: 3.2,
        val3: 2.6,
        val4: 0.8,
        val5: 0.1,
        val6: 0,
        val7: 0,
        val8: 0,
      },
      {
        arg: "NNW",
        val1: 0.6,
        val2: 3.8,
        val3: 4.3,
        val4: 2.2,
        val5: 0,
        val6: 0,
        val7: 0,
        val8: 0,
      },
    ],
  },
];
