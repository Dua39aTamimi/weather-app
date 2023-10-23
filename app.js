//define the main variable 
let tableDiv = document.querySelector(".table");
let temperature=document.getElementById("tempreture");
let weather = document.getElementById("weatherCodition");
let currentLocation = document.getElementById("currentLocation");
let currentWeather;

//set the inintial value
let latitude=40.85843;
let longitude =-74.16376;
currentLocation.innerHTML = "Clifton";
//call the function to fetch the data and pass it the variable that we wnt to search for
getData(latitude,longitude);

//set the function to fetch the data from open-meteo site 
//and create a table of hourly data
function getData(latitude, longitude){        
        //the url that will we used to fetch a data 
        //with a custome latitude and longitude 
        const apiURL = "https://api.open-meteo.com/v1/forecast?latitude="+latitude+"&longitude="+longitude+"&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=fahrenheit&timezone=auto&forecast_days=3";
        
        //fetch function
        fetch(apiURL)
        .then((response)=>response.json())
        .then((data)=>{
                //save a data in an object
                currentWeather = data.current_weather;
                
                //display tempreture and weather code to the html
                temperature.textContent=currentWeather.temperature;
                //invoke getWeatherCode and pass the weather code to return the weather condition
                weather.innerText=getWeatherCode(currentWeather.weathercode);    
                
                //get the hourly data using the object data
                let hours=data.hourly;

                //get the time, tempreture and weather code from hours variable
                let time=hours.time;
                let temp = hours.temperature_2m;
                let weathercode = hours.weathercode;

                // create a table
                let table = document.createElement("table");
                
                //append the table to the table div
                tableDiv.appendChild(table);
                
                //using for loop to set the time(day, time), tempreture and weather code into table.
                for(let i=0;i<time.length;i++){
                        
                        //to split the time to date and time
                        const split = time[i].split("T");
                        
                        //create a table rows , table data and table header 
                        //and set a class for each and set a text
                        let tr=document.createElement("tr");
                        let hour=document.createElement("th");
                        hour.className="hour";
                        let dat=document.createElement("td");
                        dat.className ="Date";
                        let current=document.createElement("td");
                        current.className="current";
                        let tempre=document.createElement("td");
                        tempre.className="tempre";  
                        hour.innerText=split[1];
                        dat.innerText=split[0];
                        current.innerText=getWeatherCode(weathercode[i]);
                        tempre.innerText=temp[i];
                        
                        // set the rows object
                        tr.appendChild(hour);
                        tr.appendChild(dat);
                        tr.appendChild(current);
                        tr.appendChild(tempre);
                        table.appendChild(tr);
                }
        })
}
//to convert from the weather code to weather condition
function getWeatherCode(weathercode){
        let result ="";
    switch(weathercode){
        case 0: result="Clear Sky";
                break;
        case 1:result="Mainly Clear";
                break;
        case 2: result="Partly Cloudy";
                break;
        case 3: result="overcast";
                break;
        case 45: result="Fog";
                break;
        case 48:result="depositing rime fog";
                break;
        case 51: result="Light Drizzle";
                break;
        case 53: result="Moderate Drizzle";
                break;
        case 55: result="Dense Drizzle";
                break;
        case 56:result="Light Freesing Drizzle";
                break;
        case 57: result="Dence Freesing Drizzle";
                break;
        case 61: result="Slight Rain";
                break;
        case 63: result="Moderate Rain";
                break;
        case 65:result="Heavy Rain";
                break;
        case 66: result="Light Freezing Rain";
                break;
        case 67: result="Heavy Freezing Rain";
                break;
        case 71: result="Slight Snow Fall";
                break;
        case 73:result="Moderate Snow Fall";
                break;
        case 75: result="Heavy Snow Fall";
                break;
        case 77: result="Snow grains";
                break;
        case 80: result="Rain showers";
                break;
        case 81: result="Rain showers";
                break;
        case 82: result="Rain showers";
                break;
        case 85: result="Snow showers";
                break;
        case 86: result="Snow showers";
                break;
        case 95:result="Thunderstorm";
                break;
        case 96:result="Thunderstorm";
                break;
        case 99: result="Thunderstorm Hail";
                break;
        default: result="";
                break;
        
    }
    return result;
}

//to looking for city name
function search(){
    //to see if the table is empty or nut
    //if the table is not empty, then call cleanTable function to clean it 
    //to set the new data to the table
    let table = document.querySelector("table");
    if(table!=null)
        cleanTable();
    
    //to get the city name from the form input 
    let cityName = document.querySelector(".inp").value;
    
    //this fetch function to fetch the latitude and longitude from geocoding-api in open meteo site
    //we use the city name that we search for using the input
    fetch("https://geocoding-api.open-meteo.com/v1/search?name="+cityName+"&count=1&language=en&format=json" )
    .then((response)=>response.json())
    .then((d)=>{
        document.getElementById("currentLocation").innerText=d.results[0].name;
        getData(d.results[0].latitude,d.results[0].longitude);
    });
    
}
//to clean the Table
function cleanTable(){
        let table = document.querySelector("table");
        tableDiv.removeChild(table);
}