
let weatherCoordinates = [
    29.4252,
    -98.4916
];

function getForecast () {
    fetch('https://api.openweathermap.org/data/2.5/onecall', {
        lat: weatherCoordinates[0],
        lon: weatherCoordinates[1],
        appid: "token",
        exclude: 'minutely,hourly,alerts',
        units: 'imperial'
    }).then(function (data) {
        console.log(data)
    });
}