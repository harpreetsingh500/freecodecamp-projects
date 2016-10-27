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
  $('body').css('background-image', 'url(images/' + weather.condition + '.jpg)');
  $('#temp img').prop('src', 'https://openweathermap.org/img/w/' + weather.icon + '.png');
  $('#temp p').text(weather.temp + ' F');
  $('#city p').text('City: ' + weather.city);
  $('#condition p').text(weather.description);
}

function generateWeater() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude,
        long = position.coords.longitude,
        apiKey = '5fd38ebd20cceeec831fd3af52cfd163',
        encodedURI = encodeURIComponent('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + apiKey),
        url = 'https://jsonp.afeld.me/?url=' + encodedURI;
    
    getData(url);
  });
}

function outputNewTemp() {
  var text = $('#temp p').text().split(' ');
  var temp = text[0],
      tempUnit = text[1],
      tempUnitName;
      
  if (tempUnit === 'F') {
    temp = (Number(temp) - 32) * (5/9);
    tempUnit = ' C';
    tempUnitName = 'Fahrenheit';
  } else {
    temp = (Number(temp) * 1.8) + 32;
    tempUnit = ' F';
    tempUnitName = 'Celsius';
  }
  
  $('#temp p').text(Math.round(temp) + tempUnit);
  $('#temp button').text('Convert to ' + tempUnitName);
}

$(function() {
  generateWeater();
  
  $('#temp button').on('click', function() {
    outputNewTemp();
  });
});
