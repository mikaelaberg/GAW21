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

