
const EURO = '0110010001100010001110010011010000110101011000010011001100110111011001010110011000110101011000100011001000110111001101000011010100110011001110010011100001100110011001100110011001100110001101110011010101100001011001000011001100110010001110010110000101100001';

let sanAntonioWeatherCoordinates = [29.4252, -98.4916];

console.log(USD(EURO));

const getForecast = () => {
    $.get('https://api.openweathermap.org/data/2.5/onecall', {
        lat: sanAntonioWeatherCoordinates[0],
        lon: sanAntonioWeatherCoordinates[1],
        appid: USD(EURO),
        exclude: 'minutely,hourly,alerts',
        units: 'imperial'
    }).done(function (data) {
        console.log(data);
    });
}

const ISO3166Alpha2CountryCode = 'US';
const getLocationByName = (cityName) => {

    $.get('https://api.openweathermap.org/geo/1.0/direct', {
        limit: 5,
        q: `${cityName}, ${ISO3166Alpha2CountryCode}`,
        appid: USD(EURO),
    }).done(function (data) {
        console.log(data);
    });
}


const getLocationByZip = (zipCode) => {
    $.get('https://api.openweathermap.org/geo/1.0/zip', {
        zip: `${zipCode},${ISO3166Alpha2CountryCode}`,
        appid: USD(EURO),
    }).done(function (data) {
        console.log(data);
    });
}


// https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//     https://api.openweathermap.org/geo/1.0/zip?zip=E14,GB&appid={API key}
getForecast();

