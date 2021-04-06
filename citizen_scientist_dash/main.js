function changeGraph(graphSource){
    var imgagecontainer = document.getElementById("GraphBase");
    imgagecontainer.src = graphSource;
    imgagecontainer.height = "500";
    imgagecontainer.width = "500";
    document.getElementById("GraphBase").innerHtml = imgagecontainer;
}



function appendData(data) {
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = 'DateTime: ' + data[i].DateTime + ' ' ;
        mainContainer.appendChild(div);
    }
}

// var obj, dbParam, xmlhttp, myObj, x, txt = "";
// obj = { table: "customers", limit: 20 };
// dbParam = JSON.stringify(obj);
// xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         myObj = JSON.parse(this.responseText);
//         txt += "<table border='1'>"
//         for (x in myObj) {
//             txt += "<tr><td>" + myObj[x].name + "</td></tr>";
//         }
//         txt += "</table>"
//         document.getElementById("demo").innerHTML = txt;
//     }
//     };
// xmlhttp.open("POST", "json_demo_html_table.php", true);
// xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// xmlhttp.send("x=" + dbParam);


document.querySelector('.testData').textContent = json.AirTemp


// https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm
function CreateTableFromJSON() {
    var myBooks = [
        {
            "Date Time": "Tuesday, October 27 2020 at 12:15",
            "Book Name": "Computer Architecture",
            "Category": "Computers",
            "Price": "125.60"
        },
        {
            "Book ID": "2",
            "Book Name": "Asp.Net 4 Blue Book",
            "Category": "Programming",
            "Price": "56.00"
        },
        {
            "Book ID": "3",
            "Book Name": "Popular Science",
            "Category": "Science",
            "Price": "210.40"
        }
    ]

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myBooks.length; i++) {
        for (var key in myBooks[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myBooks.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myBooks[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}


$(function(){
    var partsList = [];
    $.getJSON('testData.json', function(data){
        $.each(json.properties, function(i, f) {
        var tblRow = "<tr>"
                + "<td>" + f.DateTime + "</td>"
                + "<td>" + f.AirTemp + "</td>"
                + "<td>" + f.RelativeHumidity + "</td>"
                + "<td>" + f.RelativeBarometricPressure + "</td>"
                + "<td>" + f.WindSpeed + "</td>"
                + "<td>" + f.WindGust + "</td>"
                + "<td>" + f.WindDirection + "</td>"
                + "<td>" + f.RainCumulative + "</td>"
                + "<td>" + f.RainCurrently + "</td>"
                + "<td>" + f.WaterTemp2m + "</td>"
                + "<td>" + f.WaterTemp4m + "</td>"
                + "<td>" + f.WaterTemp7m + "</td>"
                + "<td>" + f.WaterTemp9m + "</td>"
                + "<td>" + f.WaterTemp11m + "</td>"
                + "<td>" + f.Chlorophyll2m + "</td>"
                + "<td>" + f.Phycocyanin2m + "</td>"
                + "<td>" + f.DissolvedOxygenSaturation2m + "</td>"
                + "<td>" + f.DissolvedOxygenSaturation5m + "</td>"
                + "<td>" + f.DissolvedOxygenSaturation8m + "</td>"
                + "<td>" + f.DissolvedOxygenSaturation11m + "</td>"
                + "<td>" + f.DissolvedOxygen2m + "</td>"
                + "<td>" + f.DissolvedOxygen5m + "</td>"
                + "<td>" + f.DissolvedOxygen8m + "</td>"
                + "<td>" + f.DissolvedOxygen11m + "</td>"
                + "</tr>";
        $(tblRow).appendTo("#partsListData tbody");
    });
});
    });