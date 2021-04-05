function changeGraph(graphSource){
    var imgagecontainer = document.getElementById("GraphBase");
    imgagecontainer.src = graphSource;
    imgagecontainer.height = "500";
    imgagecontainer.width = "500";
    document.getElementById("GraphBase").innerHtml = imgagecontainer;
}
const json = (() => {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "./testdata.json", //Json file location
            'dataType': "json",
            'success': function(data) {
            json = data;
        }
        });
        return json;
})();

console.log(json.AirTemp)

document.querySelector('.testData').textContent = "test"

