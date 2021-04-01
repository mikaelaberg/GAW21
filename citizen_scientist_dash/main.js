/* REFERENCE CODE FROM: https://github.com/GVSU-Computing-Club/2020WebCrashCourse/blob/master/main.js
  let postHeaders = document.querySelectorAll(".blogPost h2");
  console.log(postHeaders);
  // for(let i = 0; i < postHeaders.length; i++) {
  //     postHeaders[i].innerHTML = "Potatos";
  // }
  postHeaders.forEach((element) => {
      element.innerHTML = "Potatos";
  })

  let potatoURL = "https://upload.wikimedia.org/wikipedia/commons/9/93/BakedPotatoWithButter.jpg";
  let images = document.getElementsByTagName("img");
  for(let i = 0; i < images.length; i++) {
      images[i].src = potatoURL;

      images[i].id = "potato";
  }

}
*/
/*Translated the above to this but I don't think it works:)
function changeGraph(){
  let postHeaders = document.querySelectorAll(".dropdown-content");
  console.log(postHeaders);
  for(let i = 0; i < postHeaders.length; i++) {
      postHeaders[i].innerHTML = "Graph";
  }
  postHeaders.forEach((element) => {
      element.innerHTML = "Graph";
  })

  let graphURL = "https://github.com/mikaelaberg/GAW21/blob/main/citizen_scientist_dash/images/Main%20Page.png";
  let images = document.getElementsByTagName("img");
  for(let i = 0; i < images.length; i++) {
      images[1].src = graphURL;

      images[1].id = "Graph";
    }

} */

/*
function Graph1(){
    var graph1Source = "https://github.com/mikaelaberg/GAW21/blob/main/citizen_scientist_dash/images/Main%20Page.png";
    var img = document.getElementById("Graph1")
    img.src = graph1Source.replace('90x90', '225x225');
    img.style.display= "block";

}

function Graph1(){
    var graph1 = "https://github.com/mikaelaberg/GAW21/blob/main/citizen_scientist_dash/images/Main%20Page.png"
    document.getElementById("Graph1").src = pic.replace('90x90', '225x225');
    document.getElementById('Graph1').style.display='block';

}

function Graph2(){
    var graph2Source = "https://github.com/mikaelaberg/GAW21/blob/main/citizen_scientist_dash/images/Web%201920%20%E2%80%93%201.png";
    var img = document.getElementById("Graph2")
    img.src = graph2Source.replace('90x90', '225x225');
    img.style.display= "block";

}

function Graph3(){
    var graph3Source = "https://github.com/mikaelaberg/GAW21/blob/main/citizen_scientist_dash/images/gvsu-logo.png";
    var img = document.getElementById("Graph3")
    img.src = graph3Source.replace('90x90', '225x225');
    img.style.display= "block";

}
*/



function changeGraph(graphSource){
    var imgagecontainer = document.getElementById("GraphBase");
    imgagecontainer.src = graphSource;
    imgagecontainer.height = "500";
    imgagecontainer.width = "500";
    document.getElementById("GraphBase").innerHtml = imgagecontainer;
}