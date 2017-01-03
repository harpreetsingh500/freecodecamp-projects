function weatherType(condition) {
  if (condition === 'Clouds') {
    return 'cloudy';
  } else if (condition === 'Rain') {
    return 'rainy';
  } else if (condition === 'Clear') {
    return 'clear-sky';
  } else if (condition === 'Thunderstorm') {
    return 'thunderstorm';
  } else if (condition === 'Snow') {
    return 'snowing';
  }
}

function getData(url) {
  $.getJSON(url, function(data) {
    data = data.query.results.json
    var temp = (data.main.temp * (1.8) - 459.67).toFixed(2),
        weather = data.weather;

    weather.city = data.name;
    weather.condition = weatherType(weather.main);
    weather.temp = temp;

    outputData(weather);
  });
}

function outputData(weather) {
  var tempTemplate = Handlebars.compile($("[data-name='temp']").html()),
      weatherInfoTemplate = Handlebars.compile($("[data-name='weather']").html());

  $('#temp').append(tempTemplate({
    weatherImage: 'https://openweathermap.org/img/w/' + weather.icon + '.png',
    temp: weather.temp,
    unit: 'F',
    tempAndUnit: Math.round(weather.temp) + ' F'
  }));

  $('#weather-info').append(weatherInfoTemplate({
    city: weather.city,
    condition: weather.description
  }));

  changeBackground(weather);
}

function changeBackground(weather) {
  if (weather.icon.match(/n$/)) {
    $('body').css('background-image', 'url(images/night-sky.jpg)');
  } else {
    $('body').css('background-image', 'url(images/' + weather.condition + '.jpg)');
  }
}

function getPosition() {
  $.getJSON('https://freegeoip.net/json/', function(data) {
    var lat = data.latitude,
        lon = data.longitude;

    generateURL(lat, lon);
  });
}

function generateURL(lat, lon) {
  var apiKey = '5fd38ebd20cceeec831fd3af52cfd163',
      params = '?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey,
      url = 'http://api.openweathermap.org/data/2.5/weather' + params,
      query = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent(url) + '%22%0A&format=json&diagnostics=true&callback=';

  getData(query);
}

function convertTemp() {
  var temp = $('#temp p').attr('data-temp'),
      unit = $('#temp p').attr('data-tempunit'),
      unitName;

  if (unit === 'F') {
    temp = ((+temp - 32) * (5/9)).toFixed(2);
    unit = 'C';
    unitName = 'Fahrenheit';
  } else {
    temp = ((+temp * 1.8) + 32).toFixed(2);
    unit = 'F';
    unitName = 'Celsius';
  }

  outputNewTemp(temp, unit, unitName)
}

function outputNewTemp(temp, unit, unitName) {
  $('#temp p').text(Math.round(temp) + ' ' + unit)
              .attr({
                'data-temp': temp,
                'data-tempUnit': unit
              });

  $('#temp button').text('Convert to ' + unitName);
}

$(function() {
  $('#temp').on('click', 'button', convertTemp);

  getPosition();
});
