let searchBtn = document.querySelector("#search-btn");
let searchArea = document.querySelector("#search-area");
let todayWeather = document.querySelector("#today-weather");
let fiveDay = document.querySelector("#five-day")

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
    currentWeather.classList = "border border-dark p-1"
    var cityName = document.createElement("h2");
    //let image = "http://openweathermap.org/img/wn/10d@2x.png"
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

    for (i=1; i<6; i++) {
        let weatherCard = document.createElement("div");
        weatherCard.classList = "card bg-info p-2 m-1"
        let cardDate = document.createElement("h4")
        let unix = data.daily[i].dt;
        let date = new Date(unix*1000)
        cardDate.textContent = date.toLocaleDateString("en-US");
        let cardTemp = document.createElement("p");
        cardTemp.textContent = "High: " +data.daily[i].temp.day;
        let cardHum = document.createElement("p");
        cardHum.textContent = "Humidity: " +data.daily[i].humidity;
        let cardWind = document.createElement("p");
        cardWind.textContent = "Wind: " +data.daily[i].wind_speed + " MPH";
        
        fiveDay.appendChild(weatherCard);
        weatherCard.appendChild(cardDate);
        weatherCard.appendChild(cardTemp);
        weatherCard.appendChild(cardHum);
        weatherCard.appendChild(cardWind);
    }
}


searchBtn.addEventListener("click", searchBtnHandler);