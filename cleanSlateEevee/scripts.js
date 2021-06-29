async function getData() {
  let res = await fetch("https://pokeapi.co/api/v2/pokemon/eevee");
  let data = await res.json();
  return data;
}

getData().then((res) => {
  console.log(res);
});
