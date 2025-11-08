const apiKey = 'f90ed63c415477534657e3edb826acb3';

document.getElementById('getWeatherBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert('Please enter a city name!');
    return;
  }
  getWeather(city);
});

document.getElementById('cityInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('getWeatherBtn').click();
  }
});

function getWeather(city) {
  const loader = document.getElementById('loader');
  const weatherDiv = document.getElementById('weatherResult');

  loader.classList.remove('hidden');
  weatherDiv.innerHTML = '';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      weatherDiv.innerHTML = `<p>${error.message}</p>`;
    })
    .finally(() => {
      loader.classList.add('hidden');
    });
}

function displayWeather(data) {
  const weatherDiv = document.getElementById('weatherResult');
  const temp = data.main.temp;
  const description = data.weather[0].description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join (' ');
  
  const mainWeather = data.weather[0].main.toLowerCase();
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  changeBackground(mainWeather);

  weatherDiv.innerHTML = `
    <p><strong>${data.name}</strong></p>
    <img src="${iconUrl}" alt="${description}" />
    <p>Temperature: ${temp} °F</p>
    <p>Conditions: ${description}</p>
  `;
}

function changeBackground(condition) {
  if (condition.includes('clear')) {
    document.body.style.backgroundImage = "url('images/sunny.jpg')";
  } else if (condition.includes('cloud')) {
    document.body.style.backgroundImage = "url('images/cloudy.jpg')";
  } else if (condition.includes("rain")) {
  document.body.style.backgroundImage = "url('images/rain.png')";
  document.body.style.backgroundRepeat = "repeat";
  document.body.style.animation = "rainAnim 1s linear infinite";
} else if (condition.includes('snow')) {
    document.body.style.backgroundImage = "url('images/snowy.jpg')";
  } else {
    document.body.style.backgroundImage = "url('images/cloudy.jpg')";
  }
}