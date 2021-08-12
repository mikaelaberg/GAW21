// Load Charts and the corechart package.
google.charts.load("current", { packages: ["corechart"] });
google.charts.load("current", { packages: ["gauge"] });

google.charts.setOnLoadCallback(drawLineChart);
google.charts.setOnLoadCallback(drawSarahChart);
google.charts.setOnLoadCallback(drawChrisChart);
google.charts.setOnLoadCallback(drawChart);

function drawLineChart() {
  var data = google.visualization.arrayToDataTable([
    ["Year", "Sales", "Expenses"],
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540],
  ]);

  var options = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" },
  };

  var chart = new google.visualization.LineChart(
    document.getElementById("curve_chart")
  );

  chart.draw(data, options);
}

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
