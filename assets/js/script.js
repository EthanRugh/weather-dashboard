let searchBtn = document.querySelector("#search-btn");
let searchArea = document.querySelector("#search-area");
let todayWeather = document.querySelector("#today-weather");

let getWeatherHandler = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=36cc36985e835cae81a58391a8bc36cb"

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayFore(data);
                })
            }
        })
}

let searchBtnHandler = function(event) {
    console.log("click happened")
    event.preventDefault();

    let citySearch = searchArea.value.trim();
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=36cc36985e835cae81a58391a8bc36cb";
    
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    let lat = data.city.coord.lat;
                    let lon = data.city.coord.lon;
                    getWeatherHandler(lat, lon);
                })
            }
        })
    
    
}

let displayFore = function(data) {
    console.log(data);
    var currentWeather = document.createElement("div");
    currentWeather.classList = ("col-9");
    var cityName = document.createElement("h2");
    cityName.textContent = searchArea.value.trim();
    var tempNow = document.createElement("p")
    tempNow.textContent = "Temp: " +data.current.temp +" F";
    var humidNow = document.createElement("p");
    humidNow.textContent = "Humidity: " +data.current.humidity+ "%"
    var windNow = document.createElement("p");
    windNow.textContent = "Wind Speed: " +data.current.wind_speed+ " MPH"
    var uviNow = document.createElement("p");
    uviNow.textContent = "UV Index: " +data.current.uvi
    if (data.current.uvi < 3) {
        uviNow.classList = "bg-success text-light";
    }
    else if (data.current.uvi >= 3 && data.current.uvi < 7) {
        uviNow.classList = "bg-warning text-light";
    }
    else {
        uviNow.classList = "bg-danger text-light";
    }
    todayWeather.appendChild(currentWeather);
    currentWeather.appendChild(cityName);
    currentWeather.appendChild(tempNow);
    currentWeather.appendChild(humidNow);
    currentWeather.appendChild(windNow);
    currentWeather.appendChild(uviNow);

}


searchBtn.addEventListener("click", searchBtnHandler);