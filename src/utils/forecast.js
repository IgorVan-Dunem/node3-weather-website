const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/5106a2560d8593214c30fa5a66822804/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    try {
      if (error) {
        throw " >> Unable to connect to weather service! << ";
      } else if (body.error) {
        throw " >> Unable to find location! << ";
      } else {
        callback(
          undefined,
          `${body.daily.data[0].summary} It's currently ${body.currently.temperature} degrees out. There's a ${body.currently.precipProbability}% chance of rain.`
        );
      }
    } catch (e) {
      callback(e, undefined);
    }
  });
};

module.exports = forecast;
