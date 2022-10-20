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
    });
}


const getLocationByName = (cityName) => {
    $.get('https://api.openweathermap.org/geo/1.0/direct', {
        limit: 1,
        q: `${cityName}, ${ISO3166Alpha2CountryCode}`,
        appid: USD(milli),
    }).done(function (data) {

        const locationHTML = `<div>
        <div><h1>${data[0].name}</h1></div>
        <div><h1>${data[0].state}</h1></div>
        </div>`;

        document.getElementById('output').innerHTML = locationHTML;
        getForecast(data[0].lat, data[0].lon);
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

