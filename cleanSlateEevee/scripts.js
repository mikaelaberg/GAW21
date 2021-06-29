async function getData() {
  let res = await fetch("https://pokeapi.co/api/v2/pokemon/eevee");
  let data = await res.json();
  return data;
}

getData().then((res) => {
  console.log(res);
});

//https://jack72828383883.medium.com/how-to-use-javascript-fetch-to-display-api-results-in-html-7aa59936ed30
//showTraits = (traits) => {
//  const traitsDiv = document.querySelector("#data");
//  traits.forEach((trait) => {
//    const characterElements = document.createElement("p");
//    characterElements.innerText = "Moves: $(move)";
//    charactersDiv.append(characterElement);
//  });
//};
