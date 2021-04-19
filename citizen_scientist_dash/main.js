function changeGraph(graphSource){
    var imgagecontainer = document.getElementById("GraphBase");
    imgagecontainer.src = graphSource;
    document.getElementById("GraphBase").innerHtml = imgagecontainer;
}

// function appendData(data) {
//     var mainContainer = document.getElementById("testData");
//     for (var i = 0; i < data.length; i++) {
//         var div = document.createElement("div");
//         div.innerHTML = 'DateTime: ' + data[i].DateTime + ' ' ;
//         mainContainer.appendChild(div);
//     }
// }


const json = (() => {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "testdata.json", //Json file location
        'dataType': "json",
        'success': function(data) {
        json = data;
    }
    });
    return json;
})();

document.getElementById("windspeed").innerHTML = json.WindSpeed;
document.getElementById("winddirection").innerHTML = json.WindDirection;
document.getElementById("watertemp2m").innerHTML = json.WaterTemp2m;
document.getElementById("watertemp4m").innerHTML = json.WaterTemp4m;
document.getElementById("watertemp7m").innerHTML = json.WaterTemp7m;
document.getElementById("watertemp9m").innerHTML = json.WaterTemp9m;
document.getElementById("watertemp11m").innerHTML = json.WaterTemp11m;
document.getElementById("dissolvedoxygen2m").innerHTML = json.DissolvedOxygen2m;
document.getElementById("dissolvedoxygen5m").innerHTML = json.DissolvedOxygen5m;
document.getElementById("dissolvedoxygen8m").innerHTML = json.DissolvedOxygen8m;
document.getElementById("dissolvedoxygen11m").innerHTML = json.DissolvedOxygen11m;
document.getElementById("airtemp").innerHTML = json.AirTemp;
document.getElementById("relativehumidity").innerHTML = json.RelativeHumidity;
document.getElementById("relativebarometricpressure").innerHTML = json.RelativeBarometricPressure;
document.getElementById("raincurrently").innerHTML = json.RainCurrently;
document.getElementById("windspeed").innerHTML = json.AirTemp;
document.getElementById("watertemp2m").innerHTML = json.WaterTemp2m;


document.getElementById("Time").innerHTML = json.DateTime;

// document.querySelector('.testData').textContent = json.AirTemp;
$(document).ready(function(){
    $('.gauge-wrap').simpleGauge({
        width:'200',
        hueLow:'1',
        hueHigh:'128',
        saturation:'100%',
        lightness:'50%',
        gaugeBG:'#1b1b1f',
        parentBG:'#323138'
        });
});


const gaugeElement1 = document.querySelector(".gauge1");

function setGauge1Value(gauge, value) {

  gauge.querySelector(".gauge__fill1").style.transform = `rotate(${
    value / 2
  }turn)`;
  gauge.querySelector(".gauge__cover1").textContent = `${(json.Chlorophyll2m)
  }`;
}
setGauge1Value(gaugeElement1, json.Chlorophyll2m);


const gaugeElement2 = document.querySelector(".gauge2");
function setGauge2Value(gauge, value) {
    gauge.querySelector(".gauge__fill2").style.transform = `rotate(${
      value / 2
    }turn)`;
    gauge.querySelector(".gauge__cover2").textContent = `${(json.Phycocyanin2m)
    }`;
  }

setGauge2Value(gaugeElement2,json.Phycocyanin2m);
