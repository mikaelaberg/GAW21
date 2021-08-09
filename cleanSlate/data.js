// this has to connect to the internet and this is most likely my issue I have to set up my VS code to the internet
// write a piece of code to ping to just an internet (google) setting and if i can get it back with packets

// mimic code from the cleanSlateEevee code that is from: // from https://youtu.be/RG-weA9HUrg?t=388
async function getData() {
  let res = await fetch(
    "https://www.gvsu.edu/wri/buoy/data-generate.htm?concentration=1&date=7/27/21&format=json&graph=scatter&time=0:00,1:00,2:00,3:00,4:00,5:00,6:00,7:00,8:00,9:00,10:00,11:00,12:00,13:00,14:00,15:00,16:00,17:00,18:00,19:00,20:00,21:00,22:00,23:00&x=date&y=atmp1,raincumulative,raincurrent,baro1,rh1,clcon001,odo001,phyco001,tp001,tp002,odo002,tp003,tp004,odo003,tp005,odo004,tp006"
  );
  let data = await res.json();
  return data;
}

getData().then((res) => {
  console.log(res);
});
