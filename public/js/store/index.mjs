export * from './actions.mjs';
export * from './reducers.mjs';
export * from './store.mjs';


// const resultArea = document.querySelector('.weather-result');
const resultImg = document.querySelector('.result-img');
const resultLocation = document.querySelector('.result-location');
const resultData = document.querySelector('.result-data');


export function updateUI(weatherData) {
    resultImg.setAttribute('src', weatherData.icon);
    resultLocation.textContent = weatherData.location;
    resultData.textContent = weatherData.forecast;
}