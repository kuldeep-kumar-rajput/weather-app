async function getweather() {
  try {
    const city = document.getElementById("inputbox").value.trim();

    if (!city) {
      alert("City name likho");
      return;
    }

    const apikay = "a8c10298b2ac2ad9e443bc4b3d749da0";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apikay}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }
    const data = await response.json();
    console.log("Full Data:", data);
    if (data.cod != 200 && data.cod != "200") {
      document.getElementById("weather-result").innerHTML =
        `<p style="color:red;">City not found</p>`;
      return;
    }
    const current = data.list[0];
    let html = `
      <div class="text">${data.city.name}</div>
      <div class="temp"><strong>${Math.round(current.main.temp)}°C</strong></div>
      <div class="cloud">
        <img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png">
      </div>
      <div class="temp">
        <strong>${current.weather[0].description}</strong>
      </div>
    `;
    html += `<div class="forecast">`;

    for (let i = 0; i < data.list.length; i += 8) {
      const item = data.list[i];
      const date = new Date(item.dt * 1000);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      html += ` <div class="day">
          <p class="sunday">${dayName}</p>
           <p class="time">${time}</p>
          <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
          <p><strong>${Math.round(item.main.temp)}°C</strong></p>
        </div>`;
    }

    html += `</div>`;
    html += `
      <div class="image">
        <div class="feel-like-image">
          <img src="feel-like.png">
          <strong>Feels like ${Math.round(current.main.feels_like)}°C</strong>
        </div>

        <div class="humidity-image">
          <img src="humidity.png">
          <strong>${current.main.humidity}%</strong>
        </div>

        <div class="wind-image">
          <img src="wind.png">
          <strong>${Math.round(current.wind.speed * 3.6)} km/h</strong>
        </div>  
    `;

    document.getElementById("weather-result").innerHTML = html;
  } catch (error) {
    console.error(" Error:", error.message);
    document.getElementById("weather-result").innerHTML =
      `<p style="color:red;">city is not found</p>`;
  }
}

