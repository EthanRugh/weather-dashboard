let searchBtn = document.querySelector("#search-btn");
let searchArea = document.querySelector("#search-area");
let todayWeather = document.querySelector("#today-weather");

let getWeatherHandler = function(citySearch) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=36cc36985e835cae81a58391a8bc36cb";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    console.log(data.list[0].dt_txt);
                    console.log(data.list[0].main.temp);
                    displayFore();
                })
            }
        })
}

let searchBtnHandler = function(event) {
    console.log("click happened")
    event.preventDefault();

    let citySearch = searchArea.value.trim();
    getWeatherHandler(citySearch);
}

let displayFore = function() {

}


searchBtn.addEventListener("click", searchBtnHandler);