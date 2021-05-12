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


document.getElementById("windspeed").textContent = `${(json.WindSpeed)} knots`;
document.getElementById("winddirection").textContent = `${(json.WindDirection)} degrees`;


document.getElementById("airtemp").textContent = `${(json.AirTemp)} °F`;
document.getElementById("relativehumidity").textContent = `${(json.RelativeHumidity)}%`;
document.getElementById("relativebarometricpressure").textContent = `${(json.RelativeBarometricPressure)} Hg`;
document.getElementById("raincurrently").textContent = `${(json.RainCurrently)} inches`;


document.getElementById("watertemp2m").textContent = `${(json.WaterTemp2m)} °F 2 meters`;
document.getElementById("watertemp4m").textContent = `${(json.WaterTemp4m)} °F 4 meters`;
document.getElementById("watertemp7m").textContent = `${(json.WaterTemp7m)} °F 7 meters`;
document.getElementById("watertemp9m").textContent = `${(json.WaterTemp9m)} °F 9 meters`;
document.getElementById("watertemp11m").textContent = `${(json.WaterTemp11m)} °F 11 meters`;

document.getElementById("dissolvedoxygen2m").textContent = `${(json.DissolvedOxygen2m)} mg/L 2 meters`;
document.getElementById("dissolvedoxygen5m").textContent = `${(json.DissolvedOxygen5m)} mg/L 5 meters`;
document.getElementById("dissolvedoxygen8m").textContent = `${(json.DissolvedOxygen8m)} mg/L 8 meters`;
document.getElementById("dissolvedoxygen11m").textContent = `${(json.DissolvedOxygen11m)} mg/L 11 meters`;

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
    value / -2 /*trial and error figured out that negative numbers flipped the bar to be what I needed for this */
  }turn)`;
  gauge.querySelector(".gauge__cover1").textContent = `${(json.Chlorophyll2m)
  }µg/L`;
}
setGauge1Value(gaugeElement1, json.Chlorophyll2m);


const gaugeElement2 = document.querySelector(".gauge2");
function setGauge2Value(gauge, value) {
    gauge.querySelector(".gauge__fill2").style.transform = `rotate(${
      value / -23 /*trial and error number */
    }turn)`;
    gauge.querySelector(".gauge__cover2").textContent = `${(json.Phycocyanin2m)
    }Cells/mL`;
  }

setGauge2Value(gaugeElement2,json.Phycocyanin2m);




/*https://github.com/jamesgpearce/compios5/blob/master/index.html
window.addEventListener('load', function() {

  var compass = document.body.appendChild(document.createElement('article'));
  compass.id='compass';
  var spinner = compass.appendChild(document.createElement('article'));
  spinner.id='spinner';
  var pin = spinner.appendChild(document.createElement('article'));
  pin.id='pin';

  for (var degrees=0, degree; degrees<360; degrees+=30) {
      degree = spinner.appendChild(document.createElement('label'));
      degree.className='degree';
      degree.innerText = degrees;
      degree.style.webkitTransform = 'rotateZ(' + degrees + 'deg)'
  }
  ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'].forEach(function(label, index) {
      var main = ((index % 2)?'':' main');
      point = spinner.appendChild(document.createElement('label'));
      point.className='point' + main;
      point.innerText = label;
      point.style.webkitTransform = 'rotateZ(' + (index * 45) + 'deg)'
      arrow = spinner.appendChild(document.createElement('div'));
      arrow.className='arrow' + main;
      arrow.style.webkitTransform = 'rotateZ(' + (index * 45) + 'deg)'
  });

  var lastHeading = 0;
  window.addEventListener('deviceorientation', function(e) {
      var heading = e.webkitCompassHeading + window.orientation;
      if (Math.abs(heading - lastHeading)<180) {
          spinner.style.webkitTransition = 'all 0.2s ease-in-out';
      } else {
          spinner.style.webkitTransition = 'none';
      }
      spinner.style.webkitTransform = 'rotateZ(-' + heading + 'deg)';
      lastHeading = heading;
  }, false);

  document.body.addEventListener('touchstart', function(e) {
      e.preventDefault();
  }, false);

  window.addEventListener('orientationchange', function(e) {
      window.scrollTo(0,1);
  }, false);

  setTimeout(function () {window.scrollTo(0,1);}, 0);

}, false);

*/



/*https://github.com/rheh/HTML5-canvas-projects/tree/master/compass*/
// Global variable
var img = null,
	needle = null,
	ctx = null,
	degrees = 0;

function clearCanvas() {
	 // clear canvas
	ctx.clearRect(0, 0, 200, 200);
}

function draw() {

	clearCanvas();

	// Draw the compass onto the canvas
	ctx.drawImage(img, 0, 0);

	// Save the current drawing state
	ctx.save();

	// Now move across and down half the
	ctx.translate(100, 100);

	// Rotate around this point
	ctx.rotate(degrees * (Math.PI / 180));

	// Draw the image back and up
	ctx.drawImage(needle, -100, -100);

	// Restore the previous drawing state
	ctx.restore();

	// Increment the angle of the needle by 5 degrees
	degrees += 5;
}

function imgLoaded() {
	// Image loaded event complete.  Start the timer
	setInterval(draw, 100);
}

function init() {
	// Grab the compass element
	var canvas = document.getElementById('compass');

	// Canvas supported?
	if (canvas.getContext('2d')) {
		ctx = canvas.getContext('2d');

		// Load the needle image
		needle = new Image();
		needle.src = 'needle.png';

		// Load the compass image
		img = new Image();
		img.src = 'compass.png';
		img.onload = imgLoaded;
	} else {
		alert("Canvas not supported!");
	}
}


// Windrose code:

