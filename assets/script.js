var myAPI = "15b53e060471497cb84acecbc2424d03";

var cityName = "League City";
var fiveDayApi;
var oneCallApi;
var longitude;
var latitude;
var part = "minutely,hourly";
//var fiveDayApi = `api.openweathermap.org/data/2.5/forecast?q={city name}&appid={myAPI}`;

function getCoordinates() {
    // using api to five day api 
    var fiveDayApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${myAPI}`;

    fetch(fiveDayApi)
    .then(function(response){
        if (response.ok){
            // json changes response to string
            response.json().then(function(data){
                console.log(data);
                latitude = data.city.coord.lat;
                longitude = data.city.coord.lon;

                getOneDayWeather(latitude, longitude);

            })
        }
    })
}

getCoordinates();

function getOneDayWeather(latitude, longitude) {
    oneCallApi= `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${part}&appid=${myAPI}`;

    fetch(oneCallApi)
    .then(function(response){
        if (response.ok){
            // json changes response to string
            response.json().then(function(data){
                console.log(data);
                console.log(data.current.humidity);
                var cureentHumidity = data.current.humidity;
                console.log(data.current.uvi);
                var currentUvi = data.current.uvi;
                console.log(data.current.temp);
                var temp=(data.current.temp-273.15)*(9/5) + 32; //switch to league city 
                console.log(data.current.dt);
                var currentDateTime = data.current.dt;

                console.log(data.current.weather[0].main);
                var currentStatus = data.current.weather[0].main;

              //  var currentIconURL = `http://openweathermap.org/img/wn/10d@2x.png`

               /* var currentWeatherResults = document.createElement('div');
                currentWeatherResults.innerHTML = `
                <div class="card border-success mb-3 row">
                    <div class="col-5">${currentIcon}</div>
                        <div class="card-body text-success col-7">
                            <h5 class="card-title">${cityName}</h5>
                            <p class="card-text">${dailyDateTime}</p>
                            <p class="card-text">${dailyStatus}</p>
                            <p class="card-text"><${dailyUvi}/p>
                            <p class="card-text">${dailyTemp}</p>
                            <p class="card-text">${dailyHumidity}</p>
                        </div>
                </div>`

                mainDiv.appendChild(currentWeatherResults);*/

                for (var i = 1; i < 6; i++) {
                    console.log(data.daily[i]);
                    console.log(data.daily[i].humidity);
                    var dailyHumidity = data.daily[i].humidity;
                    console.log(data.current.uvi);
                    var currentUvi = data.current.uvi;
                    console.log((data.daily[i].temp.day-273.15)*(9/5) + 32);
                    var dailyTemp = (data.daily[i].temp.day-273.15)*(9/5) + 32;
                    console.log(data.daily[i].dt);
                    var dailyDateTime = data.daily[i].dt;
                    console.log(data.daily[i].weather[0].main);
                    var dailyStatus = data.daily[i].weather[0].main;
                    // get icon
                    console.log(data.daily[i].weather[0].icon);
                    var dailyIcon = data.daily[i].weather[0].icon;
                    
                    
                }


            })
        }
    })
}