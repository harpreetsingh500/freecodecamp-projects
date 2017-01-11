$(function() {
  function checkLines() {
    var win = false,
        symbol = currentPlayer.symbol;

    winningLines.forEach(function(line) {
      var $first = $('[data-id=' + line[0] + ']'),
          $second = $('[data-id=' + line[1] + ']'),
          $third = $('[data-id=' + line[2] + ']');

      if ($first.text() === symbol && $second.text() === symbol && $third.text() === symbol) {
        win = true;
        winner = currentPlayer.name;
        highlightWinningLine($first, $second, $third);
      }
    });
    return win;
  }

  function highlightWinningLine(first, second, third) {
    [first, second, third].forEach(function(a) {
      a.css('background', '#2b8e1d');
    });
  }

  function putSymbolOnBoard(div, id) {
    var idIndex = availableGrids.indexOf(id);

    availableGrids.splice(idIndex, 1);
    $(div).text(currentPlayer.symbol);

    if (checkWinner() || checkTie()) {
      gameOver = true;
      resetBoard();
    } else {
      switchSymbol();
    }
  }

  function switchSymbol() {
    currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
  }

  function checkWinner() {
    if (checkLines()) {
      availableGrids = [];

      if (winner === 'player 1') {
        $playerOneScore.text(+$playerOneScore.text() + 1);
        showWinner(playerOne.name);
      } else {
        $playerTwoScore.text(+$playerTwoScore.text() + 1);
        showWinner(playerTwo.name);
      }

      return true;
    }
  }

  function checkTie() {
    if (availableGrids.length === 0) {
      $tieScore.text(+$tieScore.text() + 1);
      showWinner('tie');
      return true;
    }
  }

  function showWinner(winner) {
    var text;

    if (winner === 'tie') {
      text = "It's a tie."
    } else {
      text = winner + ' wins!';
    }

    $('#show-winner').text(text)
                     .show()
                     .fadeOut(3000);
  }

  function resetBoard() {
    setTimeout(function() {
      $grid.text('');
      availableGrids = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      currentPlayer = playerOne;
      gameOver = false;
      $grid.css('background', 'black');
    }, 3000)
  }

  function setPlayers(players) {
    if (players === 'one-player') {
      playerTwo.name = 'Computer';
    } else {
      playerTwo.name = 'player 2'
    }

    $('#player-one span.name').text(playerOne.name);
    $('#player-two span.name').text(playerTwo.name);
  }

  function setSymbol(symbol) {
    playerOne.symbol = symbol;
    playerTwo.symbol = (symbol === 'X') ? 'O' : 'X';

    $('#player-one span.symbol').text('(' + playerOne.symbol + ')');
    $('#player-two span.symbol').text('(' + playerTwo.symbol + ')');
  }

  function computerTurn() {
    var grid,
        id,
        length = availableGrids.length;

    if (availableGrids.includes(5)) {
      id = 5;
    } else {
      id = computerOffense();

      if (id === undefined) { id = computerDefense(); }

      if (id === undefined && length === 8 && !availableGrids.includes(5)) {
        id = 1;
      } else if (id === undefined && length === 6 && availableGrids.includes(2)) {
        id = 2;
      }

      if (id === undefined) {
        var index = Math.floor(Math.random() * length);
        id = availableGrids[index];
      }
    }

    grid = $('[data-id=' + id + ']');
    putSymbolOnBoard(grid, id);
  }

  function computerOffense() {
    var grids = gridsTaken(playerOne);
    return getGrid(playerTwo, grids);
  }

  function computerDefense() {
    var grids = gridsTaken(playerTwo);
    return getGrid(playerOne, grids);
  }

  function getGrid(player, grids) {
    var id;

    winningLines.forEach(function(line) {
      var length = grids.filter(function(_, ele) {
        return line.includes(+$(ele).data('id')) && $(ele).text() === player.symbol;
      }).length;

      if (length === 2) { id = getAvailableGrid(line) || id; }
    });

    return id;
  }

  function gridsTaken(player) {
    return $grid.filter(function(_, ele) {
      return $(ele).text() !== player.symbol;
    });
  }

  function getAvailableGrid(line) {
    return line.filter(function(id) {
      return $('[data-id=' + id + ']').text() === '';
    })[0];
  }

  function resetScore() {
    $playerOneScore.text('');
    $playerTwoScore.text('');
    $tieScore.text('');
  }

  function Player(name, symbol) {
    this.name = name || '';
    this.symbol = symbol || '';
  }

  var winningLines = [[1, 2, 3], [1, 4, 7], [1, 5, 9],
                      [2, 5, 8], [3, 6, 9], [3, 5, 7],
                      [4, 5, 6], [7, 8, 9]],
      availableGrids = [1, 2, 3, 4, 5, 6, 7, 8, 9],
      $startScreen = $('#start-screen'),
      $selectPlayers = $('#select-players'),
      $selectSymbol = $('#select-symbol'),
      $playerButtons = $selectPlayers.find('button'),
      $symbolButton = $selectSymbol.find('button'),
      $gameScreen = $('#game-screen'),
      $grid = $('#board div'),
      $playerOneScore = $("[data-score='player-one']"),
      $playerTwoScore = $("[data-score='player-two']"),
      $tieScore = $("[data-score='tie']"),
      $reset = $('#reset'),
      playerOne = new Player('player 1'),
      playerTwo = new Player(),
      winner,
      currentPlayer = playerOne,
      gameOver = false;

  $playerButtons.on('click', function() {
    var players = $(this).val();
    setPlayers(players);
    $selectPlayers.hide();
    $selectSymbol.show();
  });

  $symbolButton.on('click', function() {
    var symbol = $(this).val();
    setSymbol(symbol);
    $selectSymbol.hide();
    $startScreen.hide();
    $gameScreen.fadeIn('slow');
  });

  $grid.on('click', function() {
    var id = +$(this).data('id');
    if (availableGrids.includes(id)) {
      putSymbolOnBoard(this, id);

      if (playerTwo.name === 'Computer' && gameOver === false) {
        computerTurn();
      }
    }
  });

  $reset.on('click', function() {
    resetBoard();
    resetScore();
    $gameScreen.hide();
    $startScreen.show();
    $selectPlayers.show();
  });
});
