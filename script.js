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

//Feature 2
function showTemp(response) {
  document.querySelector(".weather-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".location").innerHTML = response.data.name;
}

function searchengin(event) {
  event.preventDefault();
  let city = document.querySelector(".search-box").value;
  found(city);
}

function found(city) {
  let apiKEY = "b38e1a4508de2d42bb7fbeffb99a2b5c";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKEY}&units=metric`;
  axios.get(apiURL).then(showTemp);
}

let form = document.querySelector(".search-holder");
form.addEventListener("submit", searchengin);

//bonous point
function showeather(response) {
  document.querySelector(".weather-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".location").innerHTML = response.data.name;
}

function getposition(position) {
  let Key = "b38e1a4508de2d42bb7fbeffb99a2b5c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${Key}`;
  axios.get(url).then(showeather);
}

function receivecurrentloc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getposition);
}

let location = document.querySelector("#currentloc");
location.addEventListener("click", receivecurrentloc);

found("Tehran");
