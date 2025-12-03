document.getElementById("searchBtn").addEventListener("click", searchCountry);
document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchCountry();
});

async function searchCountry() {
  let name = document.getElementById("searchInput").value.trim();
  if (name === "") {
    showError("Please enter a country name");
    return;
  }

  // Show loading state
  document.getElementById("result").innerHTML =
    '<div class="loading">Searching...</div>';

  await fetchCountry(name);
}

async function fetchCountry(countryName) {
  let url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

  try {
    let res = await fetch(url);
    if (!res.ok)
      throw new Error("Country not found. Please check the spelling.");

    let data = await res.json();
    displayCountry(data[0]);
  } catch (error) {
    showError(error.message);
  }
}

function displayCountry(country) {
  let languages = Object.values(country.languages || {}).join(", ");
  let currencies = Object.values(country.currencies || {})
    .map((currency) => `${currency.name} (${currency.symbol})`)
    .join(", ");

  let nativeName =
    Object.values(country.name.nativeName || {})[0]?.common ||
    country.name.common;

  document.getElementById("result").innerHTML = `
        <div class="country-card">
            <div class="country-header">
                <h2>${country.name.common}</h2>
                <span class="native-name">${nativeName}</span>
            </div>
            
            <div class="country-flag">
                <img src="${country.flags.png}" alt="Flag of ${
    country.name.common
  }" width="200">
                ${
                  country.flags.alt
                    ? `<p class="flag-alt">${country.flags.alt}</p>`
                    : ""
                }
            </div>

            <div class="country-info">
                <div class="info-section">
                    <h3>Basic Information</h3>
                    <p><strong>Capital:</strong> ${
                      country.capital?.join(", ") || "N/A"
                    }</p>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Subregion:</strong> ${
                      country.subregion || "N/A"
                    }</p>
                </div>

                <div class="info-section">
                    <h3>Culture & Economy</h3>
                    <p><strong>Languages:</strong> ${languages || "N/A"}</p>
                    <p><strong>Currency:</strong> ${currencies || "N/A"}</p>
                    <p><strong>Timezones:</strong> ${
                      country.timezones?.join(", ") || "N/A"
                    }</p>
                </div>
               
                <div class="info-section">
                    <h3>Coat of Arms</h3>
                    ${
                      country.coatOfArms?.png
                        ? `<img src="${country.coatOfArms.png}" alt="Coat of Arms of ${country.name.common}" width="180">`
                        : "<p>No coat of arms available</p>"
                    }
                 </div>

                <div class="info-section">
                    <h3>Geography</h3>
                    <p><strong>Area:</strong> ${country.area?.toLocaleString()} km²</p>
                    <p><strong>Borders:</strong> ${
                      country.borders?.join(", ") || "None"
                    }</p>
                </div>
            </div>

            <div class="country-links">
                <a href="${
                  country.maps.googleMaps
                }" target="_blank" class="map-link">
                    📍 View on Google Maps
                </a>
                ${
                  country.maps.openStreetMaps
                    ? `<a href="${country.maps.openStreetMaps}" target="_blank" class="map-link">
                        🗺️ View on OpenStreetMap
                    </a>`
                    : ""
                }
            </div>
        
       

        </div>
    `;
}


function showError(message) {
  document.getElementById("result").innerHTML = `
        <div class="error">
            <p>${message}</p>
        </div>
    `;
}


