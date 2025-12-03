// my weather js docs to get weather info ---

async function showWeather(city, countryCode) {
  let modal = document.getElementById('weatherModal');
  if (modal) {
    modal.style.display = 'flex';
  }
  
  let weatherDataElement = document.getElementById('weatherData');
  if (weatherDataElement) {
    weatherDataElement.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
        <p>Loading weather data...</p>
      </div>
    `;
  }
  
  try {
    
    let weatherUrl = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
    
    let response = await fetch(weatherUrl);
    
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    
    let weatherData = await response.json();
    displayWeather(weatherData, city);
  } catch (error) {
    let weatherDataElement = document.getElementById('weatherData');
    if (weatherDataElement) {
      weatherDataElement.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 20px;">
          <p style="color: #e74c3c;">Weather data unavailable</p>
          <p style="font-size: 0.9rem; color: #666;">Try again later or check manually</p>
        </div>
      `;
    }
  }
}

function displayWeather(weatherData, city) {
  let current = weatherData.current_condition[0];
  let temp = current.temp_C;
  let feelsLike = current.FeelsLikeC;
  let humidity = current.humidity;
  let windSpeed = current.windspeedKmph;
  let description = current.weatherDesc[0].value;
  let pressure = current.pressure;
  let visibility = current.visibility;
  
  let weatherDataElement = document.getElementById('weatherData');
  if (weatherDataElement) {
    weatherDataElement.innerHTML = `
      <div class="weather-item" style="grid-column: 1/-1; text-align: center;">
        <div class="label">Current Weather in ${city}</div>
        <div class="value temp-value">${temp}°C</div>
        <div style="font-size: 1.1rem; color: #3498db; margin-top: 5px;">
          ${description}
        </div>
      </div>
      
      <div class="weather-item">
        <div class="label">Feels Like</div>
        <div class="value">${feelsLike}°C</div>
      </div>
      
      <div class="weather-item">
        <div class="label">Humidity</div>
        <div class="value">${humidity}%</div>
      </div>
      
      <div class="weather-item">
        <div class="label">Wind Speed</div>
        <div class="value">${windSpeed} km/h</div>
      </div>
      
      <div class="weather-item">
        <div class="label">Pressure</div>
        <div class="value">${pressure} mb</div>
      </div>
      
      <div class="weather-item">
        <div class="label">Visibility</div>
        <div class="value">${visibility} km</div>
      </div>
    `;
  }
}

function closeWeatherModal() {
  let modal = document.getElementById('weatherModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// here we close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
  let modal = document.getElementById('weatherModal');
  if (modal) {
    window.onclick = function(event) {
      if (event.target === modal) {
        closeWeatherModal();
      }
    };
  }
});