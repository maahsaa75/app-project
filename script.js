let nowdate = new Date();
let dayname = document.querySelector(".date-dayname");
let day = document.querySelector(".date-day");

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "fri", "Sat"];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let currentyear = nowdate.getFullYear();
let currentday = days[nowdate.getDay()];
let currentmonth = months[nowdate.getMonth()];
let currentdate = nowdate.getDate();
let currenthours = nowdate.getHours();
let currentmin = nowdate.getMinutes();

dayname.innerHTML = ` ${currentday}  ${currenthours}:${currentmin}`;
day.innerHTML = `${currentdate} ${currentmonth} ${currentyear}`;

function getposition(position) {
  let Key = "b38e1a4508de2d42bb7fbeffb99a2b5c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${Key}`;

  function showTemp(response) {
    document.querySelector(".weather-temp").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector(".location").innerHTML = response.data.name;
    document.querySelector(".weather-desc").innerHTML =
      response.data.weather[0].description;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;

    let localTimeZone = response.data.timezone / 3600;
    var d = new Date();
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var nd = new Date(utc + 3600000 * localTimeZone);
    let localTime = document.querySelector("#local-time");
    let options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h24",
    };
    localTime.innerHTML = `Time in ${response.data.name}: ${nd.toLocaleString(
      "en-US",
      options
    )}`;

    function changeToFah(event) {
      event.preventDefault();
      let fahrenheitButton = document.querySelector(".fahrenheitButton");
      let celsiusButton = document.querySelector(".celsiusButton");
      h2.innerHTML = `${Math.round(temperature * 1.8 + 32)}°`;
      fahrenheitButton.innerHTML = `<button class="fahrenheit-button"><strong>F</strong></button>`;
      celsiusButton.innerHTML = `<button class="celsius-button">C</button>`;
    }
    function changeToCel(event) {
      event.preventDefault();
      let fahrenheitButton = document.querySelector(".fahrenheitButton");
      let celsiusButton = document.querySelector(".celsiusButton");
      h2.innerHTML = `${temperature}°`;

      fahrenheitButton.innerHTML = `<button class="fahrenheit-button">F</button>`;
      celsiusButton.innerHTML = `<button class="celsius-button"><strong>C</storng></button>`;
    }
    let tempC = document.querySelector(".celsiusButton");
    tempC.addEventListener("click", changeToCel);
    let tempF = document.querySelector(".fahrenheitButton");
    tempF.addEventListener("click", changeToFah);
  }

  function searchcity(event) {
    event.preventDefault();
    let citySearch = document.querySelector("#enter-city");
    let apiKEY = "b38e1a4508de2d42bb7fbeffb99a2b5c";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKEY}&units=metric`;

    function showeather(response) {
      document.querySelector(".location").innerHTML = response.data.name;

      document.querySelector(".weather-temp").innerHTML = Math.round(
        response.data.main.temp
      );
      let descriptionInfoSearched = response.data.weather[0].description;
      let humidityInfoSearched = response.data.main.humidity;
      let windInfoSearched = response.data.wind.speed;
      let weatherDescriptionSearched = document.querySelector(".weather-desc");
      weatherDescriptionSearched.innerHTML = `${descriptionInfoSearched}`;
      let humiditySearched = document.querySelector("#humidity");
      humiditySearched.innerHTML = `${humidityInfoSearched}`;
      let windSearched = document.querySelector("#wind");
      windSearched.innerHTML = `${Math.round(windInfoSearched)}`;

      let localTimeZoneSearched = response.data.timezone / 3600;
      var d = new Date();
      var utc = d.getTime() + d.getTimezoneOffset() * 60000;
      var nd = new Date(utc + 3600000 * localTimeZoneSearched);
      let localTimeSearched = document.querySelector("#local-time");
      let options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h24",
      };
      localTimeSearched.innerHTML = `Time in ${
        response.data.name
      }: ${nd.toLocaleString("en-US", options)}`;
      function changeToFah(event) {
        event.preventDefault();
        let fahrenheitButton = document.querySelector(".fahrenheitButton");
        let celsiusButton = document.querySelector(".celsiusButton");
        h2.innerHTML = `${Math.round(temperature * 1.8 + 32)}°`;
        fahrenheitButton.innerHTML = `<button class="fahrenheit-button"><strong>F</strong></button>`;
        celsiusButton.innerHTML = `<button class="celsius-button">C</button>`;
      }
      function changeToCel(event) {
        event.preventDefault();
        let fahrenheitButton = document.querySelector(".fahrenheitButton");
        let celsiusButton = document.querySelector(".celsiusButton");
        h2.innerHTML = `${temperature}°`;

        fahrenheitButton.innerHTML = `<button class="fahrenheit-button">F</button>`;
        celsiusButton.innerHTML = `<button class="celsius-button"><strong>C</storng></button>`;
      }
      let tempC = document.querySelector(".celsiusButton");
      tempC.addEventListener("click", changeToCel);
      let tempF = document.querySelector(".fahrenheitButton");
      tempF.addEventListener("click", changeToFah);
    }
    axios.get(url).then(showeather);
  }

  let cityInfo = document.querySelector(".search-holder");
  cityInfo.addEventListener("submit", searchcity);

  axios.get(apiURL).then(showTemp);
}
navigator.geolocation.getCurrentPosition(getposition);

function receivecurrentloc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getposition);
}

let locationBut = document.querySelector("#currentloc");
locationBut.addEventListener("click", receivecurrentloc);
