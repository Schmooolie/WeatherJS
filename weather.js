
let key = "f98472db4db8bc916e742e8ae3e81888";

async function getWeather() {
  let cityInput = document.getElementById("input").value;
  let city = cityInput.toLowerCase();

  Promise.all([
    $.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`
    ),
    $.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&mode=json&APPID=${key}`
    )
  ])
    .then(data => {
      let currentWeather = data[0];
      let forecast = data[1];

      let celsius = convertKelvin(currentWeather.main.temp);
      let weatherIcon = currentWeather.weather[0].icon;
      let cityName = currentWeather.name;
      let country = currentWeather.sys.country;
      let long = currentWeather.coord.lon;
      let lat = currentWeather.coord.lat;
      let forecastTemp = convertKelvin(forecast.list[8].main.temp);
      let forecastTemp48 = convertKelvin(forecast.list[16].main.temp);

      console.log(data);

      getTime(long, lat);

      renderOutput(
        celsius,
        weatherIcon,
        cityName,
        country,
        forecastTemp,
        forecastTemp48
      );
    })
    .catch(err => {
      console.log(err);
    });
}

function renderOutput(
  celsius,
  weatherIcon,
  city,
  country,
  forecastTemperature,
  forecastTemperature48
) {
  let title = document.getElementById("cardTitle");
  let cardText = document.getElementById("cardText");
  title.innerHTML = `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather in ${city}"> ${city}, ${country}`;
  cardText.innerHTML = `
  <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Current</th>
      <th scope="col">in 24h</th>
      <th scope="col">in 48h</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${celsius}°C</td>
      <td>${forecastTemperature}°C</td>
      <td>${forecastTemperature48}°C</td>
    </tr>`;
}

function searchImage() {
  fetch("https://api.teleport.org/api/urban_areas/?embed=ua:item/ua:images")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let city = document.getElementById("input").value;
      let cityInput = capitalizeFirst(city);
      document.getElementById("input").value = "";
      let url = function() {
        for (i = 0; i < data["_embedded"]["ua:item"].length; i++) {
          if (data["_embedded"]["ua:item"][i]["name"] == cityInput.trim()) {
            return data["_embedded"]["ua:item"][i]["_embedded"]["ua:images"][
              "photos"
            ]["0"]["image"]["mobile"];
          }
        }
      };
      renderImage(url());
    })
    .catch(function() {
      console.log("error searchImage");
    });
}

function getTime(long, lat) {
  let timeKey = "O3S4EO9NZ20B";
  fetch(
    `https://api.timezonedb.com/v2.1/get-time-zone?key=${timeKey}&format=json&by=position&lat=${lat}&lng=${long}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      renderTime(data.formatted);
    });
}

function renderImage(
  url = "https://www.stockvault.net/data/2012/08/03/133422/thumb16.jpg"
) {
  let image = document.getElementById("weatherImage");
  image.src = url;
}

function renderTime(timeString) {
  let timeBox = document.getElementById("time");
  timeBox.classList.remove("hidden");
  timeBox.innerText = timeString;
}

function capitalizeFirst(string) {
  var splitStr = string.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

function convertKelvin(kelvin) {
  let temp = kelvin - 273.15;
  return Math.floor(temp);
}
