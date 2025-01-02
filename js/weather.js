let btn;
const key = "f98472db4db8bc916e742e8ae3e81888";
let lat;
let lon;
let language = "en";
const date = new Date();
const hours = date.getHours();
//const hours = 12;
let message = ("");

//----------------------------------------------------------------
//Fetch Data
let fetchData = data => {
  //fetch vars here
  let currentWeather = data[0];
  let foreCast = data[1];

  //fetched content vars here
  let celsius = convertKelvin(currentWeather.main.temp);
  let humidity = currentWeather.main.humidity;
  let pressure = currentWeather.main.pressure;
  let condition = currentWeather.weather[0].id;
  let description = currentWeather.weather[0].description;
  let weatherIcon = currentWeather.weather[0].icon;
  let cityName = currentWeather.name;
  let country = currentWeather.sys.country;
  let forecastTemp1 = convertKelvin(foreCast.list[6].main.temp_max);
  let forecastWeatherIcon1 = foreCast.list[6].weather[0].icon;
  let forecastCondition1 = foreCast.list[6].weather[0].description;
  let forecastTemp2 = convertKelvin(foreCast.list[14].main.temp_max);
  let forecastWeatherIcon2 = foreCast.list[14].weather[0].icon;
  let forecastCondition2 = foreCast.list[14].weather[0].description;
  let forecastTemp3 = convertKelvin(foreCast.list[22].main.temp_max);
  let forecastWeatherIcon3 = foreCast.list[22].weather[0].icon;
  let forecastCondition3 = foreCast.list[22].weather[0].description;
  let latMap = currentWeather.coord.lat;
  let lonMap = currentWeather.coord.lon;


  renderOutput(
    celsius,
    weatherIcon,
    cityName,
    country,
    humidity,
    pressure,
    condition,
    description,
    forecastTemp1,
    forecastTemp2,
    forecastTemp3,
    forecastWeatherIcon1,
    forecastWeatherIcon2,
    forecastWeatherIcon3,
    forecastCondition1,
    forecastCondition2,
    forecastCondition3,
    latMap,
    lonMap
  );
}

//----------------------------------------------------------------
//set btn
function set1() {
  btn = 'btnone';
  return btn;
}

function set2() {
  btn = 'btntwo';
  return btn;
}

function en() {
  language = "en";
  greeting();
  let Gmessage = document.getElementById("Gmessage");
  Gmessage.innerHTML = `${message}`;
  document.getElementById('input').placeholder = 'Enter a City...';
  document.getElementById('btn1').innerHTML = 'Search';
  document.getElementById('btn2').innerHTML = 'Current Location';
  document.getElementById('orUse').innerHTML = 'or use';
}

function de() {
  language = "de";
  greeting();
  let Gmessage = document.getElementById("Gmessage");
  Gmessage.innerHTML = `${message}`;
  document.getElementById('input').placeholder = 'Stadt eingeben...';
  document.getElementById('btn1').innerHTML = 'Suchen';
  document.getElementById('btn2').innerHTML = 'Aktuelle Position';
  document.getElementById('orUse').innerHTML = 'oder';
}


//----------------------------------------------------------------
//Geo Location of Browser
function success(pos) {
  lat = pos.coords.latitude;
  lon = pos.coords.longitude;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error);

//----------------------------------------------------------------
//Greeting
function greeting() {

  switch (language) {
    case "en":
      if (hours < 6)
        message = ("Good night!");
      else if (hours >= 6 && hours < 12)
        message = ("Good morning!");
      else if (hours >= 12 && hours < 18)
        message = ("How is your Day?");
      else if (hours >= 18 && hours <= 23)
        message = ("How was your Day?");
      break;

    case "de":
      if (hours < 6)
        message = ("Gute Nacht!");
      else if (hours >= 6 && hours < 12)
        message = ("Guten Morgen!");
      else if (hours >= 12 && hours < 18)
        message = ("Einen schönen Tag!");
      else if (hours >= 18 && hours <= 23) icon
      message = ("Wie war ihr Tag?");
      break;

    default:
      message = ("Hello!")
      break;
  }
}
greeting();
let Gmessage = document.getElementById("Gmessage");
Gmessage.innerHTML = `${message}`;

//bg color
if (hours < 6)
  document.getElementById("body").className = "night";
else if (hours >= 6 && hours < 12)
  document.getElementById("body").className = "morning";
else if (hours >= 12 && hours < 18)
  document.getElementById("body").className = "day";
else
  document.getElementById("body").className = "evening";

//bg image  
function bg(condition) {
  if (condition >= 200 && condition <= 299) {
    document.getElementById("container").className = "container thunder";
  } else if (condition >= 300 && condition <= 399) {
    document.getElementById("container").className = "container drizzle";
  } else if (condition >= 500 && condition <= 599) {
    document.getElementById("container").className = "container rain";
  } else if (condition >= 600 && condition <= 699) {
    document.getElementById("container").className = "container snow";
  } else if (condition >= 700 && condition <= 799) {
    document.getElementById("container").className = "container atmosphere";
  } else if (condition == 800) {
    document.getElementById("container").className = "container clear";
  } else if (condition >= 801 && condition <= 899) {
    document.getElementById("container").className = "container clouds";
  }
}



//----------------------------------------------------------------
//Weather
async function getWeather() {
  if (btn === 'btnone') {
    let cityInput = document.getElementById("input").value;
    let city = cityInput.toLowerCase();

    Promise.all([
        //fetch links
        $.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}&lang=${language}`
        ),
        $.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${key}&lang=${language}`
        )
      ])
      .then(fetchData)
      .catch(err => {
        console.log(err);
      });
  } else if (btn === 'btntwo') {
    Promise.all([
        //fetch links
        $.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${key}&lang=${language}`
        ),
        $.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${key}&lang=${language}`
        )
      ])
      .then(fetchData);
  } else {
    console.log('something went wrong')
  }
}

//----------------------------------------------------------------
//Output
function renderOutput(
  celsius,
  weatherIcon,
  city,
  country,
  humidity,
  pressure,
  condition,
  description,
  forecastTemp1,
  forecastTemp2,
  forecastTemp3,
  forecastWeatherIcon1,
  forecastWeatherIcon2,
  forecastWeatherIcon3,
  forecastCondition1,
  forecastCondition2,
  forecastCondition3,
  latMap,
  lonMap
) {
  let title = document.getElementById("title");
  let term = document.getElementById("term");
  let term1 = document.getElementById("term1");
  let forecast1 = document.getElementById("forecast1");
  let forecast2 = document.getElementById("forecast2");
  let forecast3 = document.getElementById("forecast3");
  let map = document.getElementById("map");

  if (language === 'en') {
    term.innerHTML = `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather in ${city}"> ${celsius}°C`;
    term1.innerHTML = `Humidity: ${humidity}% - Air Pressure: ${pressure} hPa <br> ${capitalizeFirst(description)}`;
    forecast1.innerHTML = `<p class="forecastDay">in 24 h:</p><p class="forecastTemp"><img class="forecastImg" src="https://openweathermap.org/img/w/${forecastWeatherIcon1}.png" alt="Weather Icon">${forecastTemp1}°C</p><p class="forecastCondition">${forecastCondition1}</p>`;
    forecast2.innerHTML = `<p class="forecastDay">in 48 h:</p><p class="forecastTemp"><img class="forecastImg" src="https://openweathermap.org/img/w/${forecastWeatherIcon2}.png" alt="Weather Icon">${forecastTemp2}°C</p><p class="forecastCondition">${forecastCondition2}</p>`;
    forecast3.innerHTML = `<p class="forecastDay">in 72 h:</p><p class="forecastTemp"><img class="forecastImg" src="https://openweathermap.org/img/w/${forecastWeatherIcon3}.png" alt="Weather Icon">${forecastTemp3}°C</p><p class="forecastCondition">${forecastCondition3}</p>`;
  } else if (language === 'de') {
    term.innerHTML = `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="Wetter in ${city}"> ${celsius}°C`;
    term1.innerHTML = `Luftfeuchtigkeit: ${humidity}% - Luftdruck: ${pressure} hPa <br> ${capitalizeFirst(description)}`;
    forecast1.innerHTML = `<p class="forecastDay">in 24 Stunden:</p><p class="forecastTemp"><img class="forecastImg" src="https://openweathermap.org/img/w/${forecastWeatherIcon1}.png" alt="Weather Icon">${forecastTemp1}°C</p><p class="forecastCondition">${forecastCondition1}</p>`;
    forecast2.innerHTML = `<p class="forecastDay">in 48 Stunden:</p><p class="forecastTemp"><img class="forecastImg" src="https://openweathermap.org/img/w/${forecastWeatherIcon2}.png" alt="Weather Icon">${forecastTemp2}°C</p><p class="forecastCondition">${forecastCondition2}</p>`;
    forecast3.innerHTML = `<p class="forecastDay">in 72 Stunden:</p><p class="forecastTemp"><img class="forecastImg" src="https://openweathermap.org/img/w/${forecastWeatherIcon3}.png" alt="Weather Icon">${forecastTemp3}°C</p><p class="forecastCondition">${forecastCondition3}</p>`;
  } else {
    console.log('something went wrong')
  }

  title.innerHTML = `${city}, ${country}`;
  map.innerHTML = `<iframe id="mapData" frameborder="0" scrolling="no" src="https://maps.google.com/maps?q=${latMap},${lonMap}&hl=es;z=14&amp;output=embed"></iframe>`;

  bg(condition);

}

//----------------------------------------------------------------
//Capitalize first Letter
function capitalizeFirst(string) {
  var splitStr = string.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

//----------------------------------------------------------------
//Converting Kelvin to Celsius
function convertKelvin(kelvin) {
  let temp = kelvin - 273.15;
  return Math.floor(temp);
}

// searchInput.addEventListener("keyup", enterKeyUp);

// //----------------------------------------------------------------
// //Key listener
// function enterKeyUp(e) {
//   if (e.key === "Enter") {
//       getWeather();
//   }
// }
