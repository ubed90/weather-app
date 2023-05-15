const request = require("request");

const WEATHERSTACK_API_KEY = 'f5e234947d483301d3d0699a005a0ab0';

const forecastWeather = (latitude, longitude, place_name, callback) => {

    const weatherApiUrl = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${latitude},${longitude}`;

    request({ url: weatherApiUrl , json: true } , (error , { body }) => {
        // const data = body;
        // console.log(data.current);
        // console.log(body.current);

        if (error) {
            callback("Unable to connect to weather services!!", undefined, undefined);
        } else if (body.error) {
            callback("Invalid location. Try another search", undefined, undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out, but feels like ' + body.current.feelslike + '. There is a ' + body.current.precip + '% chance of rain.', place_name, body.current.weather_icons[0]);
        }
    })
}



module.exports = forecastWeather;