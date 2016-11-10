$(function() {
  function startGame() {
    $scoreCount.text('0')
    highlightRandomColor();
    makeButtonClickable(0);
  }
  
  function highlightRandomColor() {
    var randomIndex = Math.floor(Math.random() * length),
        $color = colors[randomIndex];
    
    colorSequence.push($color[0]);
    pause = 1800 * colorSequence.length;
    animateColor(0);
  }
  
  function animateColor(idx) {
    $(colorSequence[idx]).animate({
      opacity: '1'
    }, 500).animate({
      opacity: '.3'
    }, 1000, function() {
      if (colorSequence.length > idx) {
        animateColor(idx + 1);
      }
    });
  }
  
  function checkInput(idx) {
    if (colorSequence[idx] === playerInput[idx]) { return true; }
  }
  
  function nextSequence(strict) {
    setTimeout(function() {
      if (strict) { $scoreCount.text('0'); }
      highlightRandomColor();
    }, 1500);
    makeButtonClickable();
  }
  
  function repeatSequence() {
    var currentScore = getScore();
    $scoreCount.text('!!');
    setTimeout(function() {
      $scoreCount.text(currentScore);
      animateColor(0);
    }, 2000);
    makeButtonClickable();
  }
  
  function newSequence() {
    colorSequence = [];
    resetPlayer();
    $scoreCount.text('!!');
    pause = 0;
    nextSequence(true);
  }
  
  function makeButtonClickable(milliseconds = 1500) {
    setTimeout(function() {
      $gameButton.addClass('clickable');
    }, pause + milliseconds);
  }
  
  function getScore() {
    return +$scoreCount.text();
  }
  
  function outputScore() {
    var score = getScore() + 1;
    $scoreCount.text(score);
  }
  
  function reset() {
    index = 0;
    playerInput = [];
    $gameButton.removeClass('clickable');
  }
  
  function resetPlayer() {
    reset();
  }
  
  function resetGame() {
    reset();
    colorSequence = [];
    $scoreCount.text('');
    pause = 0;
  }
  
  var $off_on = $('#off-on'),
      $slider = $('.slider'),
      $scoreCount = $('#score-count'),
      $start = $('#start'),
      $green = $('#green'),
      $red = $('#red'),
      $yellow = $('#yellow'),
      $blue = $('#blue'),
      $gameButton = $('.game-button'),
      $strict = $('#strict'),
      $strictLight = $('.strict-light'),
      colors = [$green, $red, $yellow, $blue],
      length = colors.length,
      colorSequence = [],
      playerInput = [],
      index = 0,
      pause;
  
  $off_on.on('click', function() {
    $slider.toggleClass('on');
    
    if ($slider.hasClass('on')) {
      $scoreCount.text('0')
    } else {
      resetGame();
      $strictLight.removeClass('strict-on');
    }
  });
  
  $start.on('click', function() {
    if ($slider.hasClass('on')) {
      resetGame();
      startGame();
    }
  });
  
  $strict.on('click', function() {
    if ($slider.hasClass('on')) {
      $strictLight.toggleClass('strict-on');
    }
  });
  
  $gameButton.on('click', function() {
    if ($(this).hasClass('clickable')) {
      playerInput.push(this);
      if (checkInput(index)) {
        if (colorSequence.length > (index + 1)) {
          index += 1;
        } else {
          outputScore();
          resetPlayer();
          nextSequence();
        }
      } else if ($strictLight.hasClass('strict-on')) {
        newSequence();
      } else {
        resetPlayer();
        repeatSequence();
      }
    }
  });
  
  $gameButton.on('mousedown', function() {
    if ($(this).hasClass('clickable')) {
      $(this).css('opacity', 1);
    }
  });
  
  $gameButton.on('mouseup mouseleave', function() {
    if ($(this).hasClass('clickable')) {
      $(this).css('opacity', .3);
    }
  });  
});
