const ISO3166Alpha2CountryCode = 'US';
const milli = '0110010001100010001110010011010000110101011000010011001100110111011001010110011000110101011000100011001000110111001101000011010100110011001110010011100001100110011001100110011001100110001101110011010101100001011001000011001100110010001110010110000101100001';


const getForecast = (lat, lon) => {
    $.get('https://api.openweathermap.org/data/2.5/onecall', {
        lat: lat,
        lon: lon,
        appid: USD(milli),
        exclude: 'minutely,hourly,alerts',
        units: 'imperial'
    }).done(function (data) {
        console.log(data);
        document.getElementById('unordered-list').innerHTML = '';
    });
}

const weatherContainer = `<div id="weather-card">
    <div id="current-container-1">
        <div id="current-icon"></div>
        <div id="current-container-2">
            <div id="current-condition"></div>
            <div id="current-location"></div>
        </div>
        <div id="current-container-3">
            <div id="current-temp"></div>
            <div id="current-high"></div>
            <div id="current-low"></div>
        </div>
    </div>
    <div id="5-day-forecast"></div>
</div>`;

const weatherForecast = (data) => `<div>
    <div class="forecast-day"></div>
    <div class="forecast-icon"></div>
    <div class="forecast-high"></div>
    <div class="forecast-low"></div>
</div>`;



const mapElementToUl = (data) => `<li class="city" onclick="getForecast(${data.lat}, ${data.lon})">${data.name}, ${data.state}</li>`


document.getElementById('search').addEventListener('keyup', function (e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Backspace') {
        const searchTerm = document.getElementById('search').value;
        console.log(searchTerm);

        if (searchTerm.length > 3) {
            getLocationByName(searchTerm);
        }
    }

});

const getLocationByName = (cityName) => {
    $.get('https://api.openweathermap.org/geo/1.0/direct', {
        limit: 5,
        q: `${cityName}, ${ISO3166Alpha2CountryCode}`,
        appid: USD(milli),
    }).done(function (data) {
        // const locationHTML = (data) => `<div onclick="getForecast(${data.lat}, ${data.lon})">
        // <div><h1>${data.name}</h1></div>
        // <div><h1>${data.state}</h1></div>
        // </div>`;
        // document.getElementById('output').innerHTML = data.map(locationHTML).join('');
        document.getElementById('unordered-list').innerHTML = data.map(mapElementToUl).join('');
        console.log(data)
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

