We appreciate the work that you put into drafting the dashboards for displaying the buoy data. Bopi and I talked about the options you presented and what we see as the best options going forward, as well as any recommendations or concerns we have.

As of now we really think 2-3 dashboard pages would be best, 1 for current data, 1 to show historical trends of interest, and potentially another current data page that shows MLO data along side nearby Lake Michigan buoy data.

We really like the display of Present Dash A that you designed. A few notes/questions for furthering its development by box section:

Wind Speed and Direction

    -Wind Speed and Direction needs a compass rose direction like a little “N” symbol at the top for North.
    -I just wanted to make sure that the direction that the arrow is pointing is the direction that the wind is blowing to, 
    because the wind direction that the buoy reports is the direction that the wind is blowing from. 
    So the wind direction arrow should point the opposite of the reported wind direction from the buoy.
    -Could the color of the background of the arrow box change to depict windy conditions like if wind 
    speed is >15 knots the box background turns orange?
Air Temp Area

    -The buoy data doesn’t really indicate whether it’s cloudy or sunny, so we’d remove the 
    icon and replace it with something similar to the below option:
    -Maybe there could be the 1 panel with 4 different readings in here which 
     display current air temp, current humidity, current barometric pressure, 
     and whether it has rained in the last hour (maybe it says recent rain: yes or no)?
Water Temp

    -Gradient of colors from warm to cold but color blind friendly
    -Around 80 degrees is orange
    -Around 40 degrees is blue
Dissolved Oxygen
    
    -Similar idea to water temp but reversed
    -(high end) 12-13 is blue
    -(low end) 0 is orange
Chlorophyll

    -Lowest 50% bin Blue (0-10)
    -Higher 25% bin yellow (10-20)
    -Highest 25% bin orange (20+)
Phycocyanin

    -Lowest 50% bin Blue (0-2,000)
    -Higher 25% bin yellow (2,000-5,000)
    -Highest 25% bin orange (5,000+)
Graph dropdown presets

    -We would like to present, at most, the last week of data on an hourly scale
        -Air Temp
        -Wind Speed and direction (little arrows at each speed datapoint for direction? 
        See example on this page https://www.wunderground.com/forecast/us/mi/muskegon/43.19,-86.26)
        -Surface and Bottom Temp
        -Surface and Bottom DO
        -Thermocline depth (could you have the program calculate thermocline depth and 
        display it in time series? We could give you the formula if this is possible)
Current MLO vs NOAA data (https://www.glerl.noaa.gov/res/recon/station-mkg.html)
    
    -Could be a fairly simple page showing the following from both buoys
    -Air temp
    -Wind speed and direction
    -Surface water temp
Displaying the NOAA data is of course conditional on them granting us permission to grab and display it on our site, which we will take care of getting. Is it possible for you to set it up so that the dashboard can automatically grab this info from another website? If not, we can always simply add a link on the other current dashboard that goes to the NOAA page.

For the historical dashboard we like the idea of dash A with the following dropdowns:

    -Yearly Avg Air Temp
    -Yearly Avg surface water temp
    -Yearly Days w/Hypoxia (# of days <2)
        -Is it possible to set up the function where it searches a 
        day’s data and if there was a reading <2 then it counts that 
        day as a hypoxic day? Similar question/comment for the below chl/phyco graph.
    -Yearly Number of days of chl & phyco in orange zone/HAB events
    -Yearly total precipitation (*the website is currently set-up in a weird way by 
    the in that it continually adds on the total precipitation from the initial buoy year
    of 2011. This will be something we will try to work with the webteam to reset the 
    total rain every year to make this easier)
Sorry for the lengthy email, but just wanted to make our points clear and easy to follow for each dashboard. Let us know if something is impossible (we don’t want to ask for the moon) and we’re happy to discuss some alternative options/designs.

Cheers,

Anthony
