function getweather() {
  const city = document.getElementById("inputbox").value.trim();

  if (city === "") {
    alert("City name likho");
    return;
  }

  const apikay = "a8c10298b2ac2ad9e443bc4b3d749da0";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikay}`;

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {

      if (data.cod !== 200) {
        document.getElementById("weather-result").innerHTML =
          `<p style="color:red;">City not found</p>`;
        return;
      }

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
            <img src="feel-like.png">
            <strong>Feels like ${data.main.feels_like}°C</strong>
          </div>

          <div class="humidity-image">
            <img src="https://cdn-icons-png.flaticon.com/512/414/414974.png" alt="humidity icon">
            <strong>${data.main.humidity}%</strong>
          </div>

          <div class="wind-image">
            <img src="wind.png">
            <strong>
              ${isNaN(data.wind?.speed) ? "" : Math.round(data.wind.speed * 3.6) + " km/h"}
            </strong>
          </div>
        </div>
      `;

      document.getElementById("weather-result").innerHTML = weatherInfo;
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("weather-result").innerHTML =
        `<p style="color:red;">Error fetching data</p>`;
    });
}




