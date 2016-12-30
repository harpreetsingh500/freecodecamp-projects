function checkInput(inputs, value) {
  var operators = ['-', '+', 'x', '/'],
      length = inputs.length,
      lastVal = inputs[length - 1];

  if (checkNum(value)) { return true; }
  if (operators.includes(lastVal) || length === 0) { return false; }
  return true;
}

function addInput(val, inputs, ans) {
  var length = inputs.length,
      lastIndex = length - 1;

  if (length !== 0 && ans === '' && checkNum(val) && checkNum(inputs[lastIndex])) {
    if (countPeriods(inputs[lastIndex]) < 1 || val !== '.') {
      inputs[lastIndex] += val;
    }
  } else if (ans !== '' && checkNum(val)) {
    inputs[0] = val;
  } else {
    inputs.push(val);
  }
}

function countPeriods(inputs) {
  return inputs.split('').filter(function(value) {
    return value === '.';
  }).length;
}

function checkNum(val) {
  return (val).toString().match(/[0-9.]/);
}

function calculate(inputs) {
  var operators = ['-', '+', 'x', '/'],
      lastVal = inputs[inputs.length - 1];

  if (!operators.includes(lastVal)) {
    while (inputs.length !== 1) {
      if (inputs.includes('x') || inputs.includes('/')) {
        var multiplyIndex = getIndex(inputs, 'x'),
            divideIndex = getIndex(inputs, '/'),
            firstIndex = (multiplyIndex < divideIndex) ? multiplyIndex : divideIndex;

        performOperation(inputs, firstIndex);
      } else {
        performOperation(inputs);
      }
    }
  }
  return inputs[0];
}

function getIndex(inputs, operator) {
  return (inputs.indexOf(operator) === -1) ? Infinity : inputs.indexOf(operator);
}

function performOperation(inputs, idx = 1) {
  var num1 = +inputs[idx - 1],
      operator = inputs[idx],
      num2 = +inputs[idx + 1],
      total = getTotal(num1, operator, num2);

  inputs.splice((idx - 1), 3, total);
}

function getTotal(num1, operator, num2) {
  if (operator === '+') {
    return num1 + num2;
  } else if (operator === '-') {
    return num1 - num2;
  } else if (operator === 'x') {
    return num1 * num2;
  } else if (operator === '/') {
    return num1 / num2;
  }
}

function showInput(inputs) {
  $('#display p').text(inputs.join(' '));
}

$(function() {
  var $buttons = $("button[data-type='number'], button.operator"),
      $ac = $("button[value='ac']"),
      $ce = $("button[value='ce']"),
      $equal = $("button[value='=']"),
      inputs = [],
      answer = '';

  $ac.on('click', function() {
    inputs = [];
    showInput(inputs);
  });

  $ce.on('click', function() {
    inputs.pop();
    showInput(inputs);
  });

  $equal.on('click', function() {
    if (inputs.length > 2 ) {
      answer = calculate(inputs);
    }
    showInput(inputs);
  });

  $buttons.on('click', function() {
    var val = $(this).val();
    if (checkInput(inputs, val)) {
      addInput(val, inputs, answer);
      answer = '';
    }
    showInput(inputs);
  });
});
