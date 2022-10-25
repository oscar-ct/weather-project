
const ISO3166Alpha2CountryCode = 'US';
const milli = '0110010001100010001110010011010000110101011000010011001100110111011001010110011000110101011000100011001000110111001101000011010100110011001110010011100001100110011001100110011001100110001101110011010101100001011001000011001100110010001110010110000101100001';


document.getElementById('search').addEventListener('keyup', function (e) {
    const searchTerm = document.getElementById('search').value;
    const check = e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Enter' && e.key !== 'Backspace';
    console.log(searchTerm);

    if (searchTerm.length > 3 && isNaN(parseInt(searchTerm)) && check) {
        getLocationByName(searchTerm, false);
    } else if (!isNaN(parseInt(searchTerm)) && searchTerm.length === 5 && check) {
        getLocationByZip(searchTerm, false);
    } else if (e.key === 'Backspace') {
        document.getElementById('unordered-list').innerHTML = '';
    }
});

const runWeather = () => {
    const searchTerm = document.getElementById('search').value;
    if (!isNaN(parseInt(searchTerm)) && searchTerm.length === 5) {
        getLocationByZip(searchTerm, true)
    } else {
        getLocationByName(searchTerm, true);
    }
}

document.getElementById('search-btn').addEventListener('click', runWeather);
document.addEventListener("keydown", function (e) {
   if (e.key === "Enter") {
       runWeather();
   }
});


const reverseGeocode = (lat, lon) => {
    fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${USD(milli)}`).then(function (response) {
      return response.json();
  }).then(function (data) {
      const nameAndState = `${data[0].name}, ${data[0].state}`;
      getForecast(lat, lon, nameAndState);
  });
}
const setPosition = (position) => {
    console.log(position)
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    reverseGeocode(lat, lon);
}

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition)
} else {
    console.log('Browser doesnt support geolocation')
}

// const weatherIcon = (code) => {
//     return '<img src="https://openweathermap.org/img/w/'+ code +'.png">'
// }
const weatherIcon = (code) => {
    return '<img src="icons/'+ code +'.png">'
}

const getForecast = (lat, lon, location) => {
    document.getElementById('unordered-list').innerHTML = '';
    // document.getElementById('search').value = location;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${USD(milli)}&units=imperial`).then(function (response){
        return response.json();
    }).then(function (data) {
        console.log(data);
        document.getElementById('output').innerHTML = `<div id="weather-card">
            <div id="cw-container-1">
                <div id="cw-icon"> ${weatherIcon(data.current.weather[0].icon)} </div>
                <div id="cw-container-2">
                    <div id="cw-condition">${capitalizeName(data.current.weather[0].description)}</div>
                    <div id="cw-location">${location}</div>
                </div>
                <div id="cw-container-3">
                    <div id="cw-temp">${data.current.temp.toFixed(0)}&#176</div>
                    <div id="cw-container-4">
                        <div class="cw-high-low">${data.daily[0].temp.max.toFixed(0)}&#176</div>
                        <div class="cw-high-low">${data.daily[0].temp.min.toFixed(0)}&#176</div>
                    </div>
                </div>
            </div>
            <div id="d-forecast">${data.daily.map(weatherForecast).join('')}</div>
        </div>`;
    });
}



const day = (dt) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dt * 1000);
    return days[date.getDay()];
}

const weatherForecast = (data) => `<div class="sm-weather-card">
    <div class="forecast-day">${day(data.dt)}</div>
    <div class="forecast-icon">${weatherIcon(data.weather[0].icon)}</div>
    <div class="forecast-description">${capitalizeName(data.weather[0].description)}</div>
    <div class="forecast-high">${data.temp.max.toFixed(0)}&#176</div>
    <div class="forecast-low">${data.temp.min.toFixed(0)}&#176</div>
    <details class="forecast-details">
    <div>Rainfall: ${mmConverter(data.rain)}"</div>
    <div>Wind: ${data.wind_speed}mph</div>
    <div>Humidity: ${data.humidity}%</div>
    <div>Sunrise: ${unixTimeConverter(data.sunrise)}</div>
    <div>Sunset: ${unixTimeConverter(data.sunset)}</div>
    </details>
</div>`;




const getLocationByName = (cityName, boolean) => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${ISO3166Alpha2CountryCode}&limit=5&appid=${USD(milli)}`).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        console.log(data)
        // relevant search drop-down suggestions
        const mapElementToUl = (data) => `<li class="city" onclick="getForecast('${data.lat}', '${data.lon}', '${data.name}, ${data.state}')">${data.name}, ${data.state}</li>`;
        document.getElementById('unordered-list').innerHTML = data.map(mapElementToUl).join('');
        // search button functionality

        // document.getElementById('search-btn').addEventListener('click', function () {
        //     getForecast(data[0].lat, data[0].lon, `${data[0].name}, ${data[0].state}`);
        // });
        // document.addEventListener('keydown', function (e) {
        //     if (e.key === 'Enter') {
        //         getForecast(data[0].lat, data[0].lon, `${data[0].name}, ${data[0].state}`);
        //     }
        // });
        if (data.length !== 0 && boolean) {
            getForecast(data[0].lat, data[0].lon, `${data[0].name}, ${data[0].state}`);
        }

    });
}

const getLocationByZip = (zip, boolean) => {
    fetch( `https://api.openweathermap.org/geo/1.0/zip?zip=${zip},${ISO3166Alpha2CountryCode}&appid=${USD(milli)}`).then(function (resp) {
    return resp.json();
    }).then(function (data) {
        console.log(data);
        document.getElementById('unordered-list').innerHTML = `<li class="city" onclick="getForecast('${data.lat}', '${data.lon}', '${data.name}, ${data.zip}')">${data.name}, ${data.zip}</li>`;

        // const cityAndState = `${data.name}, ${data.zip}`;
        // document.getElementById('search-btn').addEventListener('click', function () {
        //     getForecast(data.lat, data.lon, cityAndState);
        // });
        // document.addEventListener('keypress', function (e) {
        //     if (e.key === 'Enter') {
        //         getForecast(data.lat, data.lon, cityAndState);
        //     }
        // });
        if (data.length !== 0 && boolean) {
            getForecast(data.lat, data.lon, `${data.name}, ${data.zip}`);
        }
    });
}




const capitalizeName = (str) => {
    let newStr = str.toLowerCase().split(' ');
    for (let i = 0; i < newStr.length; i++) {
        newStr[i] = newStr[i].charAt(0).toUpperCase() + newStr[i].substring(1);
    }
    return newStr.join(' ');
}

const mmConverter = (mm) => {
    if (Math.max(mm/25.4).toFixed(2) < .1) {
        return 0.1
    } else if (isNaN(mm)) {
        return 0.0
    } else {
        return Math.max(mm/25.4).toFixed(1)
    }
}

const unixTimeConverter = (unix) => {
  return new Date(unix * 1000).toLocaleTimeString("en-US")
}