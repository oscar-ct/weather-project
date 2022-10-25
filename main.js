const ISO3166Alpha2CountryCode = 'US';
const milli = '0110010001100010001110010011010000110101011000010011001100110111011001010110011000110101011000100011001000110111001101000011010100110011001110010011100001100110011001100110011001100110001101110011010101100001011001000011001100110010001110010110000101100001';


document.getElementById('search').addEventListener('keyup', function (e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Backspace') {
        const searchTerm = document.getElementById('search').value;
        console.log(searchTerm);
        if (searchTerm.length > 3) {
            getLocationByName(searchTerm);
        }
    }
});

// const weatherIcon = (code) => {
//     return '<img src="https://openweathermap.org/img/w/'+ code +'.png">'
// }
const weatherIcon = (code) => {
    return '<img src="icons/'+ code +'.png">'
}
const getForecast = (lat, lon, string) => {
    $.get('https://api.openweathermap.org/data/2.5/onecall', {
        lat: lat,
        lon: lon,
        appid: USD(milli),
        exclude: 'minutely,hourly,alerts',
        units: 'imperial'
    }).done(function (data) {
        console.log(data);

        document.getElementById('unordered-list').innerHTML = '';

        document.getElementById('output').innerHTML = `<div id="weather-card">
            <div id="cw-container-1">
                <div id="cw-icon"> ${weatherIcon(data.current.weather[0].icon)} </div>
                <div id="cw-container-2">
                    <div id="cw-condition">${capitalizeName(data.current.weather[0].description)}</div>
                    <div id="cw-location">${string}</div>
                </div>
                <div id="cw-container-3">
                    <div id="cw-temp">${data.current.temp}</div>
                    <div id="cw-container-4">
                        <div id="cw-high">${data.daily[0].temp.max}</div>
                        <div id="cw-low">${data.daily[0].temp.min}</div>
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

const weatherForecast = (data) => `<div>
    <div class="forecast-day">${day(data.dt)}</div>
    <div class="forecast-icon">${weatherIcon(data.weather[0].icon)}</div>
    <div class="forecast-description">${capitalizeName(data.weather[0].description)}</div>
    <div class="forecast-rain">${data.pop}</div>
    <div class="forecast-high">${data.temp.max}</div>
    <div class="forecast-low">${data.temp.min}</div>
</div>`;




const getLocationByName = (cityName) => {
    $.get('https://api.openweathermap.org/geo/1.0/direct', {
        limit: 5,
        q: `${cityName}, ${ISO3166Alpha2CountryCode}`,
        appid: USD(milli),
    }).done(function (data) {
        // relevant search drop-down suggestions
        const mapElementToUl = (data) => `<li class="city" onclick="getForecast('${data.lat}', '${data.lon}', '${data.name}, ${data.state}')">${data.name}, ${data.state}</li>`;
        document.getElementById('unordered-list').innerHTML = data.map(mapElementToUl).join('');
        // search button functionality
        document.getElementById('search-btn').addEventListener('click', function () {
            const cityAndState = data[0].name + ', ' + data[0].state;
            getForecast(data[0].lat, data[0].lon, cityAndState);
        });
    });
}


const getLocationByZip = (zipCode) => {
    $.get('https://api.openweathermap.org/geo/1.0/zip', {
        zip: `${zipCode},${ISO3166Alpha2CountryCode}`,
        appid: USD(milli),
    }).done(function (data) {
        console.log(data);
        getForecast(data.lat, data.lon);
    });
}



const capitalizeName = (str) => {
    let newStr = str.toLowerCase().split(' ');
    for (let i = 0; i < newStr.length; i++) {
        newStr[i] = newStr[i].charAt(0).toUpperCase() + newStr[i].substring(1);
    }
    return newStr.join(' ');
}