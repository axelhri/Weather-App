const loadConfig = async () => {
  try {
    const configResponse = await fetch("./conf.json");
    if (!configResponse.ok) {
      throw new Error(
        `Erreur lors du chargement du fichier de configuration : ${configResponse.status}`
      );
    }
    const config = await configResponse.json();

    if (config.city) {
      weatherData(config.city);

      setInterval(() => {
        weatherData(config.city);
      }, 3600000);
    } else {
      console.error(
        "La ville n'est pas définie dans le fichier de configuration."
      );
    }
  } catch (error) {
    console.error("Erreur lors de la lecture de la configuration :", error);
  }
};

const weatherData = async (city) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=a740ef16321749488a095816251601&q=${city}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    const section = document.getElementById("card");

    const weatherCard = `
      <h1>Weather App</h1>

      <div class="weather-information">
      <img src=${data.current.condition.icon} alt="${data.current.condition.text}">
      <p class="temperature">${data.current.temp_c} °C</p>
      <p class="country">${data.location.country},</p>
      <p class="city">${data.location.name}</p>
      </div>

      
    <div class="box-container">
      <div class="box">
      <i class="fa-solid fa-temperature-three-quarters"></i>
      <div>
      <p class="box-number">${data.current.feelslike_c} °C</p>
      <p class="box-text">Feels like</p>
      </div>
      </div>

      <div class="box">
      <i class="fa-solid fa-droplet"></i>
      <div>
      <p class="box-number">${data.current.humidity} %</p>
      <p class="box-text">Humidity</p>
      </div>
      </div>

    </div>
  `;

    section.innerHTML = weatherCard;
  } catch (error) {
    console.error("Erreur lors de la récupération de la météo :", error);
  }
};

loadConfig();
