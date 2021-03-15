d3.csv("https://raw.githubusercontent.com/mikaelaberg/muskegon-lake-dashboard/master/all-buoy-data.csv").then(d => chart(d))
//d3.csv("data.csv").then(d => chart(d)) // I assume this and the data.vsv were for testing if it worked/ proof of concept

var dataIndex = 0;
var timerHandle;
var allTempReadings;
var svg;
var colorRange;
var doColorRange;
var svgWind;
var svgAlgae;
var tempX;
var tempY;
var chlorRange;
var chlorTextRange;
var phycoRange;
var phycoTextRange;

function chart(csv) {

	setupTempChart(csv);
	setupDOChart(csv);
	setupWindChart(csv);
	setupAlgaeChart(csv);

	update(d3.select("#year").property("value"), 750, 1);
	

	function setupTempChart(csv) {
		var keys = csv.columns.slice(2);

	var year   = [...new Set(csv.map(d => d.Year))]

	var options = d3.select("#year").selectAll("option")
		.data(year)
	.enter().append("option")
		.text(d => d)

	svg = d3.select("#chart"),
		margin = {top: 35, left: 35, bottom: 0, right: 0},
		width = +svg.attr("width") - margin.left - margin.right,
		height = +svg.attr("height") - margin.top - margin.bottom;

	tempX = d3.scaleBand()
		.range([margin.left, width - margin.right])
		.padding(0.1)
	
		
	//This scale uses the height and margins of the SVG to calculate the top of each depth reading
	tempY = d3.scaleLinear()
		.range([height - margin.bottom, margin.top])
		.domain([22,0]);

	//This scale uses just the final height of the SVG, to calculate the height of each depth reading
	var y2 = d3.scaleLinear()
	.range([height - margin.top, 0])
	.domain([22,0]);

	var xAxis = svg.append("g")
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.attr("class", "x-axis");

	var yAxis = svg.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis");

	svg.selectAll(".y-axis").transition().duration(0)
		.call(d3.axisLeft(tempY).ticks(null, "s"));

	svg.selectAll(".x-axis").transition().duration(0)
		.call(d3.axisBottom(tempX).tickSizeOuter(0));

	colorRange = d3.scaleLinear()
		.range(["blue","red"]) 										// the water column color this will combine them for the in between extreme temps
		.domain([50,73]); 

	var layer = svg.append("g")
		.classed("layer", true)
		.attr("fill", "green");

	svg.append("text")
		.attr('class','title')
		.attr('x', d=> { return width / 2})
		.attr('y', d=> '23')
		.attr('text-anchor','middle')
		.text( d=> 'Water Temperature At Depth'); 					// Water column box title

	svg.append("text")
		.attr('class','x-axis-label')
		.attr('x', d=> '110')
		.attr('y', d=> '390')
		.attr('text-anchor','middle')
		.text( d=> 'West'); 										// West Water column label

	svg.append("text")
		.attr('class','x-axis-label')
		.attr('x', d=> '250')
		.attr('y', d=> '390')
		.attr('text-anchor','middle')
		.text( d=> 'Deep'); 										// East water column label

	svg.append("text")
		.attr('class','x-axis-label')
		.attr('x', d=> '390')
		.attr('y', d=> '390')
		.attr('text-anchor','middle')
		.text( d=> 'MLO'); 											// MLO water column label

	svg.append("text")
		.attr('class','x-axis-label')
		.attr('x', d=> '530')
		.attr('y', d=> '390')
		.attr('text-anchor','middle')
		.text( d=> 'East'); 										// East water column label

		
	// this is where things will have to change since I wont be able to use deep, west and east.
	csv.map( item => {
		item['Temp'] = {};
		item['Temp']['West'] = {};
		item['Temp']['West'][2] = item['West Data Temp 2m'];
		item['Temp']['West'][6] = item['West Data Temp 6m'];
		item['Temp']['West'][8] = item['West Data Temp 8m'];
		item['Temp']['West'][10] = item['West Data Temp 10m'];
		item['Temp']['West'][15] = item['West Data Temp 15m'];
		item['Temp']['Deep'] = {};
		item['Temp']['Deep'][2] = item['Deep Data Temp 2m'];
		item['Temp']['Deep'][6] = item['Deep Data Temp 6m'];
		item['Temp']['Deep'][8] = item['Deep Data Temp 8m'];
		item['Temp']['Deep'][10] = item['Deep Data Temp 10m'];
		item['Temp']['Deep'][15] = item['Deep Data Temp 15m'];
		item['Temp']['Deep'][19] = item['Deep Data Temp 19m'];
		item['Temp']['Deep'][22] = item['Deep Data Temp 22m'];
		item['Temp']['MLO'] = {};
		item['Temp']['MLO'][2] = item['MLO Temp 2m'];
		item['Temp']['MLO'][4] = item['MLO Temp 4m'];
		item['Temp']['MLO'][5] = item['MLO Temp 5m'];
		item['Temp']['MLO'][6] = item['MLO Temp 6m'];
		item['Temp']['MLO'][8] = item['MLO Temp 8m'];
		item['Temp']['MLO'][10] = item['MLO Temp 10m'];
		item['Temp']['MLO'][11] = item['MLO Temp 11m'];
		item['Temp']['East'] = {};
		item['Temp']['East'][2] = item['East Data Temp 2m'];
		item['Temp']['East'][6] = item['East Data Temp 6m'];
		item['Temp']['East'][8] = item['East Data Temp 8m'];
		item['Temp']['East'][10] = item['East Data Temp 10m'];
		item['Temp']['East'][11] = item['East Data Temp 11m'];

		item['DO'] = {};
	});

	tempX.domain(Object.keys(csv[0]['Temp']));

	csv['2017'] = csv.filter(f => f.Year === '2017');
	csv['2018'] = csv.filter(f => f.Year === '2018');

	$('#myRange').attr('max',csv['2017'].length);

	allTempReadings = [];
	createGradients(svg, csv[0],allTempReadings);

	//Update rectangles
	var bars = svg.selectAll("g.layer").selectAll("rect")
	.data(allTempReadings);

	bars.exit().remove()

	bars.enter().append("rect")
		.attr("width", tempX.bandwidth())
		.merge(bars)
	.transition().duration(0)
		.attr("x", d => tempX(d.buoy))
		.attr("y", d => tempY(d.prevDepth))
		.attr("height", d => { return y2(d.depth - d.prevDepth)})
		//.attr("fill", d => { return d.valid ? colorRange(d.value) : 'gray';}) 		// I should ask eli what this is doing here
		.attr("fill", d => {
			//var rgbStr = colorRange(d.prevVal) + colorRange(d.value);					// I should ask eli what this is doing here
			//rgbStr = rgbStr.replace(/[^a-zA-Z0-9]/g, "");								// I should ask eli what this is doing here
			return 'url(#' + d.gradientUrl + ')';
		});
	}

	function setupDOChart(csv) {
		doColorRange = d3.scaleLinear()
		.range(["black","red"])
		.domain([10,0]);
	}

	function setupWindChart(csv) {
		svgWind = d3.select("#chart-wind"),
		margin = {top: 35, left: 35, bottom: 0, right: 0},
		width = +svgWind.attr("width") - margin.left - margin.right,
		height = +svgWind.attr("height") - margin.top - margin.bottom;

		var layer = svgWind.append("g")
		.classed("base-layer", true)
		.attr("fill", "green");

		var layer2 = svgWind.append("g")
		.classed("layer", true)
		.attr("fill", "green");

		svgWind.selectAll('g.base-layer').append('rect')
		.attr('x', '15')
		.attr('y', '40')
		.attr('width', '130')
		.attr('height', '130')
		.attr('fill', 'white')
		.attr('class','wind-box-container');

		svgWind.selectAll("g.layer").append('rect')
		.attr('x', '80')
		.attr('y', '105')
		.attr('width', '40')
		.attr('height', '5')
		.attr('fill', 'black')
		.attr('class','wind-arrow');

		var top = (65 + 15 + 0) + ',102';
		var bottom = (65 + 0 + 15) + ',112';
		var right = (65 + 0 + 20) + ',107';
		var trianglePoints = top + " " + bottom + " " + right;

		svgWind.selectAll('g.layer').append('polyline')
		.attr('points', trianglePoints)
		.style('fill', 'black')
		.style('stroke','black');

		svgWind.append("text")
		.attr('class','title')
		.attr('x', d=> { return 10})
		.attr('y', d=> '23')
		.attr('text-anchor','start')
		.text( d=> 'Wind Speed and Direction'); 						// Wind Speed and Direction box title

		svgWind.append("text")
		.attr('class','x-axis-label')
		.attr('id','wind-speed-element')
		.attr('x', d=> '200')
		.attr('y', d=> '85')
		.attr('text-anchor','middle')
		.text( d=> '0 knots / hr');

		svgWind.append("text")
		.attr('class','x-axis-label')
		.attr('id','wind-direction-element')
		.attr('x', d=> '200')
		.attr('y', d=> '140')
		.attr('text-anchor','middle')
		.text( d=> '36 degrees');										// why 36 degrees?

	}

	function setupAlgaeChart(csv) {
		svgAlgae = d3.select("#chart-algae"),
		margin = {top: 35, left: 35, bottom: 0, right: 0},
		width = +svgWind.attr("width") - margin.left - margin.right,
		height = +svgWind.attr("height") - margin.top - margin.bottom;

		var layer = svgAlgae.append("g")
		.classed("layer", true)
		.attr("fill", "green");

		svgAlgae.selectAll('g.layer').append('rect')
		.attr('x', '15')
		.attr('y', '100')
		.attr('width', '100')
		.attr('height', '100')
		.attr('fill','white')
		.attr('class','algae-box-container');

		svgAlgae.selectAll('g.layer').append('rect')
		.attr('x', '15')
		.attr('y', '260')
		.attr('width', '100')
		.attr('height', '100')
		.attr('fill','white')
		.attr('class','algae-box-container');

		svgAlgae.selectAll('g.layer').append('rect')
		.attr('id','chlor-svg')
		.attr('x', '15')
		.attr('y', '100')
		.attr('width', '100')
		.attr('height', '100')
		.attr('fill','url(#chlorophyll-gradient')
		.attr('opacity','0.0')
		.attr('class','algae-box-container');

		svgAlgae.selectAll('g.layer').append('rect')
		.attr('id','phyco-svg')
		.attr('x', '15')
		.attr('y', '260')
		.attr('width', '100')
		.attr('height', '100')
		.attr('fill','url(#phycocyanin-gradient')
		.attr('opacity','0.0')
		.attr('class','algae-box-container');

		svgAlgae.append("text")
		.attr('class','title')
		.attr('x', d=> { return 10})
		.attr('y', d=> '23')
		.attr('text-anchor','start')
		.text( d=> 'Algae Measures');

		svgAlgae.append("text")
		.attr('class','x-axis-label')
		.attr('id','wind-direction-element')
		.attr('x', d=> '15')
		.attr('y', d=> '85')
		.attr('text-anchor','start')
		.text( d=> 'Chlorophyll');

		svgAlgae.append("text")
		.attr('class','x-axis-label')
		.attr('id','wind-direction-element')
		.attr('x', d=> '15')
		.attr('y', d=> '245')
		.attr('text-anchor','start')
		.text( d=> 'Phycocyanin');

		svgAlgae.append("text")
		.attr('class','algae-value')
		.attr('id','chlor-value')
		.attr('x', d=> '135')
		.attr('y', d=> '150')
		.attr('text-anchor','start')
		.text( d=> '0');

		svgAlgae.append("text")
		.attr('class','algae-value')
		.attr('id','phyco-value')
		.attr('x', d=> '135')
		.attr('y', d=> '310')
		.attr('text-anchor','start')
		.text( d=> '0');

		svgAlgae.append("text")
		.attr('class','algae-label')
		.attr('id','chlor-label')
		.attr('x', d=> '135')
		.attr('y', d=> '165')
		.attr('text-anchor','start')
		.attr('opacity','0.8')
		.text( d=> 'ug / L');

		svgAlgae.append("text")
		.attr('class','algae-label')
		.attr('id','phyco-label')
		.attr('x', d=> '135')
		.attr('y', d=> '325')
		.attr('text-anchor','start')
		.attr('opacity','0.8')
		.text( d=> 'cells / mL');

		var chlorophyllGrad = svg.append("defs")
		.append("radialGradient")
			.attr("id", "chlorophyll-gradient");

			chlorophyllGrad.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", "green");

			chlorophyllGrad.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", "#fff");

		var phycoGrad = svg.append("defs")
			.append("radialGradient")
			.attr("id", "phycocyanin-gradient");

			phycoGrad.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", "deepskyblue");

			phycoGrad.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", "#fff");

		chlorRange = d3.scaleLinear()
			.range([0, 1])
			.domain([0,20]); //min and max of chlor data... should probably be computed at the beginning of the program

		chlorTextRange = d3.scaleLinear()
			.range(['black', 'red'])
			.domain([0,20]); //min and max of chlor data... should probably be computed at the beginning of the program

		phycoRange = d3.scaleLinear()
			.range([0, 1])
			.domain([0,20000]); //min and max of phyco data... should probably be computed at beginning

		phycoTextRange = d3.scaleLinear()
			.range(['black', 'red'])
			.domain([0,20000]); //min and max of phyco data... should probably be computed at beginning

	}

	function update(input, speed, index) {

		data = csv[input];
		var currentData = data[index];

		updateTempChart(currentData, speed);
		updateDOChart(currentData, speed);
		updateWindChart(currentData, speed);
		updateAlgaeChart(currentData, speed);

		$('#current-date').html(csv[$('#year').val()][index]['Date Time'])

	}

	function updateDOChart(currentData, speed) {
		var westDO = Math.abs(Number(currentData['West Data DO 15m'])).toFixed(1);
		var deepDO = Math.abs(Number(currentData['Deep Data DO 22m'])).toFixed(1);
		var mloDO = Math.abs(Number(currentData['MLO DO 11m'])).toFixed(1);
		var eastDO = Math.abs(Number(currentData['East Data DO 11m'])).toFixed(1);

		var westColor = doColorRange(westDO);
		var deepColor = doColorRange(deepDO);
		var mloColor = doColorRange(mloDO);
		var eastColor = doColorRange(eastDO);


		$('.do-container .do-body .west .value').html(westDO);
		$('.do-container .do-body .deep .value').html(deepDO);
		$('.do-container .do-body .mlo .value').html(mloDO);
		$('.do-container .do-body .east .value').html(eastDO);

		$('.do-container .do-body .west .value').css('color', westColor);
		$('.do-container .do-body .deep .value').css('color', deepColor);
		$('.do-container .do-body .mlo .value').css('color', mloColor);
		$('.do-container .do-body .east .value').css('color', eastColor);
	}

	function updateWindChart(currentData, speed) {

		var windSpeed = Number(currentData['Wind Speed (knots)']) * 2;
		var dataAry = [];
		dataAry.push(currentData);

		var rectangle = svgWind.selectAll("g.layer rect").data(dataAry);
		rectangle.transition().duration(speed)
		.attr('width', d => Number(d['Wind Speed (knots)']) * 2); //size of chart is 65px, max wind speed is 32knots, so multiply by 2

		var top = (65 + 15 + windSpeed) + ',100';
		var bottom = (65 + windSpeed + 15) + ',114';
		var right = (65 + windSpeed + 28) + ',107';

		var trianglePoints = top + " " + bottom + " " + right;

		svgWind.selectAll('g.layer polyline').transition().duration(speed)
		.attr('points', trianglePoints);

		svgWind.selectAll('g.layer').data(dataAry).transition().duration(speed)
		.attr('transform', d => 'rotate(' + d['Wind Direction (Degree)'] + ',0,0)')
	
		svgWind.selectAll('#chart-wind #wind-speed-element').data(dataAry).transition().duration(speed)
		.text(d=> d['Wind Speed (knots)'] + ' knots / hr');

		svgWind.selectAll('#chart-wind #wind-direction-element').data(dataAry).transition().duration(speed)
		.text(d=> d['Wind Direction (Degree)'] + ' degrees');
	
	}
	
	function updateAlgaeChart(currentData, speed) {

		var chlor = Number(currentData['Chlorophyll a (ug/L)']);
		var chlorAdj = chlorRange(chlor);
		var chlorColor = chlorTextRange(chlor);
		chlor = chlor.toFixed(1);

		if (chlor != 0.0) {
			svgAlgae.selectAll('g.layer #chlor-svg').transition().duration(speed)
			.attr('opacity',chlorAdj)

			svgAlgae.selectAll('#chlor-value').transition().duration(speed)
			.attr('stroke',chlorColor)
			.text(d=>chlor);
		}


		var phyco = Number(currentData['Phycocyanin (cells/mL)']);
		var phycoAdj = phycoRange(phyco);
		var phycoColor = phycoTextRange(phyco);
		phyco = phyco.toFixed(1);

		if (phyco != 0.0) {
			svgAlgae.selectAll('g.layer #phyco-svg').transition().duration(speed)
			.attr('opacity',phycoAdj)
	
			svgAlgae.selectAll('#phyco-value').transition().duration(speed)
			.attr('stroke',phycoColor)
			.text(d=>phyco);
		}
		
	}

	function updateTempChart(currentData, speed) {
		selectedTempReadings = [];


		function mapDataToDepthReadings(buoy, inputData, outputData) {
			var prevDepth = 0;
			var prevVal = undefined;
			var tempDepths = Object.keys(inputData['Temp'][buoy]);
			var index = 0;
			tempDepths.forEach( key => {

				var gradientUrl = buoy + key;

				var firstOrLast = index == 0 || index == tempDepths.length - 1
				//If we have missing data, interpolate (by skipping). Unless it is the first or last depth reading, then color it gray.
				if (!firstOrLast && (inputData['Temp'][buoy][key] == undefined || inputData['Temp'][buoy][key] == '')) {
					return;
				}

				var newObj = {
					value: inputData['Temp'][buoy][key],
					depth: key,
					buoy: buoy,
					prevDepth: prevDepth,
					prevVal: (prevVal == undefined || prevVal == '') ? inputData['Temp'][buoy][key] : prevVal,
					valid: inputData['Temp'][buoy][key] != undefined && inputData['Temp'][buoy][key] != '',
					gradientUrl: gradientUrl
				}
				prevVal = newObj.value;
				prevDepth = newObj.depth;
				outputData.push(newObj);
				index++;

				
			})
		}


		selectedTempReadings = [];
		mapDataToDepthReadings('West', currentData, selectedTempReadings);
		mapDataToDepthReadings('Deep', currentData, selectedTempReadings);
		mapDataToDepthReadings('MLO', currentData, selectedTempReadings);
		mapDataToDepthReadings('East', currentData, selectedTempReadings);

		//Update gradients
		allTempReadings.forEach( reading => {
			var found = false;
			for (var i = 0; i < selectedTempReadings.length; i++) {
				var selectedReading = selectedTempReadings[i];
				if (selectedReading.buoy === reading.buoy && selectedReading.depth === reading.depth) {
					found = true;
					reading.value = selectedReading.value;
					reading.prevVal = selectedReading.prevVal;
					reading.valid = selectedReading.valid;
					break;
				}
			}
			if (!found) {
				reading.value = 'gray';
				reading.prevVal = 'gray';
			}
		})

			var topGradients = svg.selectAll('linearGradient stop.top-gradient')
		.data(allTempReadings);
		topGradients.transition().duration(speed)
			.style('stop-color', d => { return d.valid ? colorRange(d.prevVal) : 'rgb(125,125,125)'});

			var bottomGradients = svg.selectAll('linearGradient stop.bottom-gradient')
		.data(allTempReadings);
		bottomGradients.transition().duration(speed)
			.style('stop-color', d => { return d.valid? colorRange(d.value) : 'rgb(125,125,125)'});


		

		var text = svg.selectAll(".text")
			.data(selectedTempReadings);

		text.exit().remove()

		text.enter().append("text")
			.attr("class", "text")
			.attr("text-anchor", "start")
			.merge(text)
		.transition().duration(0)
			.attr("x", d => tempX(d.buoy) + 52.5)
			.attr("y", d => tempY(d.depth))
			.style('stroke', 'white')
			.attr('color','white')
			.text(d => Number(d.value).toFixed(1))
	}

	function createGradients(svg,inputData, allTempReadings) {
		Object.keys(inputData['Temp']).forEach( buoy => {
			var prevDepth = 0;
			Object.keys(inputData['Temp'][buoy]).forEach( key => {


				var gradientUrl = buoy + key;
	
				//make defs and add the linear gradient
				var lg = svg.append("defs").append("linearGradient")
				.attr("id", gradientUrl)//id of the gradient
				.attr("x1", "0%")
				.attr("x2", "0%")
				.attr("y1", "0%")
				.attr("y2", "100%")//since its a vertical linear gradient 
				;
				lg.append("stop")
				.attr('class','top-gradient')
				.attr("offset", "0%")
				.style("stop-color", 'red')//end in red
				.style("stop-opacity", 1);

				lg.append("stop")
				.attr('class','bottom-gradient')
				.attr("offset", "100%")
				.style("stop-color", 'blue')//start in blue
				.style("stop-opacity", 1);

				var newObj = {
					value: inputData['Temp'][buoy][key],
					depth: key,
					buoy: buoy,
					gradientUrl: gradientUrl,
					prevDepth: prevDepth
				}
				prevDepth = newObj.depth;
				
				allTempReadings.push(newObj);
	
				
			})
		})
		
	}

	var play = d3.select('#play')
		.on('click', function() {
			if (timerHandle != undefined) {
				return;
			}
			var yearValue = $('#year').val();
			timerHandle = setInterval( function() {
				update(yearValue, 100, dataIndex);
				dataIndex++;
				$('#myRange').val(dataIndex);
			},150);
		});

	var button = d3.select('#single-advance')
	.on("click", function() {
		dataIndex++;
		update($('#year').val(), 100, dataIndex);
	});

	var buttonStop = d3.select('#stop')
	.on("click", function() {
		clearInterval(timerHandle);
		timerHandle = undefined;
	});

	var startFrom = d3.select('#start-from')
	.on("click", function() {
		dataIndex = $('#restart-input').val();
		update($('#year').val(), 100, dataIndex);
	})

	var myRange = d3.select('#myRange')
	.on('input', function() {
		var index = $('#myRange').val();
		dataIndex = index;
		//$('#current-date').html(csv[$('#year').val()][dataIndex]['Date Time'])
		update($('#year').val(), 100, dataIndex);
	})

	var yearChange = d3.select('#year')
	.on('change', function() {
		$('#myRange').attr('max',csv[$('#year').val()].length);
	});
	
}