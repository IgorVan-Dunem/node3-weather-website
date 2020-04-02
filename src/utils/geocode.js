const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibnJrczN2M20iLCJhIjoiY2s3cHkyYnl6MDByYTNndGxqOHV6N3pmYSJ9.8tPXKikSP_3gGIBG8aB8LA`;

  request({ url, json: true }, (error, { body }) => {
    try {
      if (error) {
        throw "Unable to connect to location services!";
      } else if (!body.features) {
        throw "Unable to find location! Try another one.";
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        });
      }
    } catch (e) {
      callback(e, undefined);
    }
  });
};

module.exports = geocode;
