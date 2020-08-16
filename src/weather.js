const weather = document.querySelector('.js-weather');

const API_KEY = '8c3be7aa1c1832071906dcb5ad5a448f';
const COORDS = 'coords';

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
        return response.json();
    }).then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `<div class="icon-location"></div> <div>${place}</div> <div class="icon-temper"></div> <div>${temperature}°C</div>`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        // latitude: latitude,
        // longitude: longitude,

        // 변수와 key 값이 같은 경우우
       latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitud, longitude);
}

function handleGeoError(){

}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        // get weather
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}

function init() {
    loadCoords();
}

init();