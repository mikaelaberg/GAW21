//following https://www.youtube.com/watch?v=FN_ffvw_ksE&t=763s

function fetchData() {
  //console.log(fetch("https://pokeapi.co/api/v2/pokemon/eevee")); //This returns a promise
  fetch("https://pokeapi.co/api/v2/pokemon/eevee")
    .then((response) => {
      //console.log(response);/response to the promise also called a response body
      return response.json();
    })
    .then((data) => {
      //name data is arbitrary
      console.log(data); //data.__ will go into the nested list [__] is the indices of the data point
      const html = data.stats
        .map((stats) => {
          return `<p>Ability: ${data.stats}</p>`;
        })
        .join();
      console.log(html);
      document
        .querySelector("#data")
        .insertAdjacentHTML("afterbegin", "<p>test 2</p>"); //putting on the page adjacent to what is already there
    })
    .catch((error) => {
      //checking for errors
      console.log(error);
    });
}

fetchData();
