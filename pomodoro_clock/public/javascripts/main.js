$(function() {
  function setNewVal(button, operator) {
    var $span = $(button).closest('div').find('span'),
        val = +$span.text();

    if (val >= 1) {
      if (operator === '-' && val > 1) { $span.text(val - 1); }
      if (operator === '+') { $span.text(val + 1); }
    }
    setTime();
  }

  function setTime() {
    var timeType = $timeType.text().toLowerCase();
    var val = $('#' + timeType).find('span').text();
    $countdown.text(val);
  }

  function startTimer(duration) {
    var timer = 60 * duration[0] + +(duration[1] || 0) - 1,
        minutes,
        seconds;

    start = false;
    animateClockColor(timer + 3);

    interval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      $countdown.text(minutes + ":" + seconds);

      if (timer-- === 0) {
        changeType();
      }
    }, 1000);
  }

  function animateClockColor(time) {
    var milliSeconds = time * 1000;

    $colorTimer.animate({
      height: '0',
    }, milliSeconds);
  }

  function changeType() {
    var type = $timeType.text().toLowerCase();
    stopTimer(true);

    if (type === 'session') {
      $timeType.text('Break');
      $backgroundColor.css('background', 'rgb(255, 68, 68)');
      $content.css('border-color', 'rgb(255, 68, 68)');
    } else {
      $timeType.text('Session');
      $backgroundColor.css('background', '#99CC00');
      $content.css('border-color', '#99CC00');
    }

    setTime();
    $content.click();
  }

  function stopTimer(reset) {
    $colorTimer.stop();
    clearInterval(interval);
    start = true;

    if (reset) {
      $colorTimer.css('height', '270px');
    }
  }

  var $minus = $("button[value='-']"),
      $plus = $("button[value='+']"),
      $content = $('#content'),
      $countdown = $('#countdown'),
      $timeType = $('#time-type'),
      $backgroundColor = $('#background-color'),
      $colorTimer = $('#color-timer'),
      start = true,
      interval;

  $minus.on('click', function() {
    setNewVal(this, '-');
    stopTimer(true);
  });

  $plus.on('click', function() {
    setNewVal(this, '+');
    stopTimer(true);
  });

  $content.on('click', function() {
    var duration = $countdown.text().split(':');

    if (start) {
      startTimer(duration);
    } else {
      stopTimer();
    }
  });
});
