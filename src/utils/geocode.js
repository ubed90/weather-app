const request = require("request");


const geocode = (address, callback) => {
  const mapboxApi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidGhldW5ub3RpY2VkIiwiYSI6ImNsZm1uNDhodzBkcGczcXA2ZTlob3g5Y2UifQ.rdRIphPFa48lJ_dLEOu_Ig&limit=1`;

  request({ url: mapboxApi, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const [
        {
          center: [longitude, latitude],
          place_name,
        },
      ] = body.features;
      callback(undefined, {
        location: place_name,
        longitude,
        latitude,
      });
    }
  });
};


module.exports = geocode;