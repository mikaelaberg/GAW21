function deletePosts() {
    let posts = document.getElementsByClassName("blogPost");
    let size = posts.length;

    for(let i = 0; i < size; i++) {
        posts[0].remove();
    }
}

function potatofy() {
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