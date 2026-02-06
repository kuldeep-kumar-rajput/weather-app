function getweather() {
  const city = document.getElementById("inputbox").value;
  const apikay = "a8c10298b2ac2ad9e443bc4b3d749da0";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikay}`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const weatherInfo = `
         <div class="text">${data.name}</div>
        <div class="temp">
          <strong>${data.main.temp}°C</strong>
        </div>
        <div class="cloud">
         <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
        </div>
        <div class="temp">
         <strong>${data.weather?.[0]?.description || ""}</strong>
        </div>
        <div class="image">
          <div class="feel-like-image">
             <img src="images/feel-like.png" alt="feels like icon">
               <strong class="feels-like-text"> Feels like ${data.main.feels_like}°C</strong>
          </div>
          <div class="humidity-image">
             <img src="images/humidity.png" alt="humidity icon">
             <strong class="humidity-text">${data.main.humidity}%</strong>
          </div>
          <div class="wind-image">
            <img src="images/wind.png" alt="wind icon">
             <strong class="wind-text">${isNaN(data.wind?.speed) ? "" : Math.round(data.wind.speed * 3.6) + " km/h"}</strong>
          </div>
        </div>
      `;

      document.getElementById("weather-result").innerHTML = weatherInfo;
    });
}

