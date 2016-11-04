function checkInput(operation, value) {
  var operators = ['-', '+', 'x', '/'],
      length = operation.length,
      lastVal = operation[length - 1];
  
  if (checkNum(value)) { return true; }
  if (operators.includes(lastVal) || length === 0) { return false; }
  return true;
}

function addInput(val, operation, ans) {
  var length = operation.length,
      lastIndex = length - 1;
  
  if (length !== 0 && ans === '' && checkNum(val) && checkNum(operation[lastIndex])) {
    if (countPeriods(operation[lastIndex]) < 1 || val !== '.') { 
      operation[lastIndex] += val; 
    }
  } else if (ans !== '' && checkNum(val)) {
    operation[0] = val;
  } else {
    operation.push(val);
  }
}

function countPeriods(operation) {
  return operation.split('').filter(function(value) {
    return value === '.';
    }).length;
}

function checkNum(val) {
  return val.match(/[0-9.]/);
}

function calculate(operation) {
  var operators = ['-', '+', 'x', '/'],
      lastVal = operation[operation.length - 1];
  
  if (!operators.includes(lastVal)) {
    while (operation.length !== 1) {
      if (operation.includes('x') || operation.includes('/')) {
        var multiplyIndex = getIndex(operation, 'x'),
            divideIndex = getIndex(operation, '/'),
            firstIndex = (multiplyIndex < divideIndex) ? multiplyIndex : divideIndex;
        
        performOperation(operation, firstIndex);
      } else {
        performOperation(operation);
      }
    }
  }
}

function getIndex(operation, operator) {
  return (operation.indexOf(operator) === -1) ? Infinity : operation.indexOf(operator);
}

function performOperation(operation, idx = 1) {
  var num1 = +operation[idx - 1],
      operator = operation[idx],
      num2 = +operation[idx + 1],
      total = getTotal(num1, operator, num2);
      
  operation.splice((idx - 1), 3, total);
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

function showInput(operation) {
  $('#display p').text(operation.join(' '));
}

$(function() {
  var $buttons = $("button[data-type='number'], button.operator"),
      $ac = $("button[value='ac']"),
      $ce = $("button[value='ce']"),
      $equal = $("button[value='=']"),
      operation = [],
      answer = '';
  
  $ac.on('click', function() {
    operation = [];
    showInput(operation);
  });
  
  $ce.on('click', function() {
    operation.pop();
    showInput(operation);
  });
  
  $equal.on('click', function() {
    if (operation.length > 2 ) {
      answer = calculate(operation);
    }
    showInput(operation);
  });
  
  $buttons.on('click', function() {
    var val = $(this).val();
    if (checkInput(operation, val)) {
      addInput(val, operation, answer);
      answer = '';
    }
    showInput(operation);
  });
});
