let btn;
const key = "f98472db4db8bc916e742e8ae3e81888";
let lat;
let lon;
let language = "en";
const date = new Date();
const hours = date.getHours();
//const hours = 0;
let message = ("");

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
  document.getElementById('input').placeholder='Enter a City...';
  document.getElementById('btn1').innerHTML='Search';
  document.getElementById('btn2').innerHTML='Current Location';
  document.getElementById('orUse').innerHTML='or use';
}

function de() {
  language = "de";
  greeting();
  let Gmessage = document.getElementById("Gmessage");
  Gmessage.innerHTML = `${message}`;
  document.getElementById('input').placeholder='Stadt eingeben...';
  document.getElementById('btn1').innerHTML='Suchen';
  document.getElementById('btn2').innerHTML='Aktuelle Position';
  document.getElementById('orUse').innerHTML='oder';
}


//----------------------------------------------------------------
//Geo Location of Browser
function success(pos) {
  let crd = pos.coords;
  lat = crd.latitude;
  lon = crd.longitude;
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
      else if (hours >= 18 && hours <= 23)
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

if (hours < 6)
  document.getElementById("body").className = "night";
else if (hours >= 6 && hours < 12)
  document.getElementById("body").className = "morning";
else if (hours >= 12 && hours < 18)
  document.getElementById("body").className = "day";
else
  document.getElementById("body").className = "evening";

//----------------------------------------------------------------
//Weather
async function getWeather() {
  if (btn === 'btnone') {
    let cityInput = document.getElementById("input").value;
    let city = cityInput.toLowerCase();

    Promise.all([
        //fetch links
        $.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`
        )
      ])
      .then(data => {
        //fetch vars here
        let currentWeather = data[0];

        //fetched content vars here
        let celsius = convertKelvin(currentWeather.main.temp);
        let humidity = currentWeather.main.humidity;
        let pressure = currentWeather.main.pressure;
        let condition = currentWeather.weather[0].main;
        let description = currentWeather.weather[0].description;
        let weatherIcon = currentWeather.weather[0].icon;
        let cityName = currentWeather.name;
        let country = currentWeather.sys.country;

        console.log(data);

        renderOutput(
          celsius,
          weatherIcon,
          cityName,
          country,
          humidity,
          pressure,
          condition,
          description
        );
      })
      .catch(err => {
        console.log(err);
      });
  } else if (btn === 'btntwo') {
    Promise.all([
        //fetch links
        $.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${key}`
        )
      ])
      .then(data => {
        //fetch vars here
        let currentWeather = data[0];

        //fetched content vars here
        let celsius = convertKelvin(currentWeather.main.temp);
        let humidity = currentWeather.main.humidity;
        let pressure = currentWeather.main.pressure;
        let condition = currentWeather.weather[0].main;
        let description = currentWeather.weather[0].description;
        let weatherIcon = currentWeather.weather[0].icon;
        let cityName = currentWeather.name;
        let country = currentWeather.sys.country;

        console.log(data);

        renderOutput(
          celsius,
          weatherIcon,
          cityName,
          country,
          humidity,
          pressure,
          condition,
          description
        );
      })
      .catch(err => {
        console.log(err);
      });
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
  description
) {
  let title = document.getElementById("title");

  title.innerHTML = `${city}, ${country}`;
  term.innerHTML = `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather in ${city}"> ${celsius}°C`;
  term1.innerHTML = `Humidity: ${humidity}% - Air Pressure: ${pressure} hPa <br> ${capitalizeFirst(description)}`;
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