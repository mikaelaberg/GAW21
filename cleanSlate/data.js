//  loadJSON(
//    "https://www.gvsu.edu/wri/buoy/data-generate.htm?calculation=avg&callback=&disjoined=1&graph=line&height=400&time=&width=600&yindividual=0&ymax=74.4&ymin=56.12&concentration=1&date=6/17/21&x=date&y=atmp1,tp001,tp006&format=json",
//    gotData
//  );
//}

async function test() {
  fetch(
<<<<<<< HEAD
    "https://www.gvsu.edu/wri/buoy/data-generate.htm?concentration=1&date=6/23/21&format=json&graph=scatter&time=0:00,1:00,2:00,3:00,4:00,5:00,6:00,7:00,8:00,9:00,10:00,11:00,12:00,13:00,14:00,15:00,16:00,17:00,18:00,19:00,20:00,21:00,22:00,23:00&x=date&y=atmp1,clcon001",
=======
    "https://www.gvsu.edu/wri/buoy/data-generate.htm?concentration=1&date=6/22/21&format=json&graph=scatter&time=0:00,1:00,2:00,3:00,4:00,5:00,6:00,7:00,8:00,9:00,10:00,11:00,12:00,13:00,14:00,15:00,16:00,17:00,18:00,19:00,20:00,21:00,22:00,23:00&x=date&y=atmp1,raincumulative,raincurrent,baro1,rh1,clcon001,odo001,phyco001,tp001,tp002,odo002,tp003,tp004,odo003,tp005,odo004,tp006",
>>>>>>> 58e8d04415ab212d878101e40b6bfe483994ecde
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "same-origin",
    }
  )
    .then((response) => {
      console.log("here");
      console.log(response);
      return response.json();
    })
    .then((json) => {
      console.log(json);
    });
}

test();


// this has to connect to the internet and this is most likely my issue I have to set up my VS code to the internet
// write a piece of code to ping to just an internt (google) setting and if i can get it back with packets

fetch(
  "https://www.gvsu.edu/wri/buoy/data-generate.htm?concentration=1&date=6/22/21&format=json&graph=scatter&time=0:00,1:00,2:00,3:00,4:00,5:00,6:00,7:00,8:00,9:00,10:00,11:00,12:00,13:00,14:00,15:00,16:00,17:00,18:00,19:00,20:00,21:00,22:00,23:00&x=date&y=atmp1,raincumulative,raincurrent,baro1,rh1,clcon001,odo001,phyco001,tp001,tp002,odo002,tp003,tp004,odo003,tp005,odo004,tp006",
  { mode: "no-cors" }
)
  .then((res) => {
    console.log("API :", res);
  })
  .catch();

