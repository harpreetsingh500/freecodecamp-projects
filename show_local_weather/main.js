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
  $.getJSON(url, function(data){
    var temp = Math.round(data.main.temp * (1.8) - 459.67),
        weather = data.weather[0];

    weather.city = data.name;
    weather.condition = weatherType(weather.main);
    weather.temp = temp;

    outputData(weather);
  });
}

function outputData(weather) {
  if (weather.icon.match(/n$/)) {
    $('body').css('background-image', 'url(images/night-sky.jpg)');
    $('#container a').css('color', 'white');
  } else {
    $('body').css('background-image', 'url(images/' + weather.condition + '.jpg)');
  }

  $('#temp img').prop('src', 'https://openweathermap.org/img/w/' + weather.icon + '.png');
  $('#temp p').text(weather.temp + ' F');
  $('#temp p').attr('data-temp', weather.temp);
  $('#city p').text('City: ' + weather.city);
  $('#condition p').text(weather.description);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude,
        long = position.coords.longitude;

    generateURL(lat, long);
  });
}

function generateURL(lat, long) {
  var apiKey = '5fd38ebd20cceeec831fd3af52cfd163',
      params = '?lat=' + lat + '&lon=' + long + '&appid=' + apiKey,
      url = 'http://api.openweathermap.org/data/2.5/weather' + params;

  getData(url);
}

function outputNewTemp() {
  var text = $('#temp p').text().split(' '),
      temp = text[0],
      tempUnit = text[1],
      tempUnitName;

  if (tempUnit === 'F') {
    temp = (+temp - 32) * (5/9);
    tempUnit = ' C';
    tempUnitName = 'Fahrenheit';
  } else {
    temp = (+temp * 1.8) + 32;
    tempUnit = ' F';
    tempUnitName = 'Celsius';
  }
  console.log(temp);
  $('#temp p').text(temp.toString().slice(0, 2) + tempUnit);
  $('#temp button').text('Convert to ' + tempUnitName);
}

$(function() {
  $('#temp button').on('click', outputNewTemp);

  getPosition();
});
