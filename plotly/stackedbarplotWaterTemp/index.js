$(function () {
  $("#chart").dxChart({
    dataSource: dataSource,
    commonSeriesSettings: {
      argumentField: "column",
      type: "fullStackedBar",
    },
    series: [
      //color gradient hex https://www.schemecolor.com/orange-to-blue-gradient.php
      { valueField: "elevenMeters", name: "11 Meters", color: "#0200C6" },
      { valueField: "nineMeters", name: "9 Meters", color: "#412395" },
      { valueField: "sevenMeters", name: "7 Meters", color: "#814663" },
      { valueField: "fourMeters", name: "4 Meters", color: "#C06832" },
      { valueField: "twoMeters", name: "2 Meters", color: "#FF8B00" },
    ],
    legend: {
      verticalAlignment: "center",
      horizontalAlignment: "left",
      itemTextPosition: "right",
    },
    title: {
      text: "Water Column",
      subtitle: {
        text: "Water Temperature ",
      },
    },
    export: {
      enabled: true,
    },
    tooltip: {
      enabled: true,
      customizeTooltip: function (arg) {
        return {
          text: arg.percentText + " - " + arg.valueText,
        };
      },
    },
  });
});
