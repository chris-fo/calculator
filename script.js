// Script File for the calculator project

// add function - works only with numbers
function add(num1, num2) {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') return 'ERROR';
  return num1 + num2;
}

// subtract function - works only with numbers
function subtract(num1, num2) {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') return 'ERROR';
  return num1 - num2;
}

// multiply function - works only with numbers
function multiply(num1, num2) {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') return 'ERROR';
  return num1 * num2;
}

// divide function - works only with numbers
function divide(num1, num2) {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') return 'ERROR';
  return num1/num2;
}

// operator function
function operate(operator, num1, num2) {
  switch(operator) {
    case '+': {
      return add(num1, num2);
    }
    case '-': {
      return subtract(num1, num2);
    }
    case '*': {
      return multiply(num1, num2);
    }
    case '/': {
      return divide(num1, num2);
    }
  }
}

let displayValue = '';
let firstPart;
let operation;

function updateDisplay(content) {
  const calculatorText = document.querySelector('#calculator-text');
  calculatorText.value = content;
}

const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('#equals-button');
const clearButton = document.querySelector('#clear-button');

equalsButton.addEventListener('click', event => {
  console.log(`Equals: ${firstPart} ${operation} ${displayValue}`);
  updateDisplay(calcExpression());
})
// Number
numberButtons.forEach( button => {
  button.addEventListener('click', event => {
    displayValue += event.target.value;
    updateDisplay(displayValue);
  })
})
// Operation
operatorButtons.forEach( button => {
  button.addEventListener('click', event => {
    if (firstPart) {
      // first part exists => calculate temporary solution and store in first Part
      firstPart = calcExpression();
    } else {
      // first operation entered
      firstPart = displayValue;
    }
    // in both cases
    operation = event.target.value;
    displayValue = firstPart + event.target.value;
    updateDisplay(displayValue);
  })
})
// Clear
clearButton.addEventListener('click', () => {
  reset();
})

function calcExpression() {
  let expression = [firstPart, findOperation(displayValue), findLastNumber(displayValue)];
  const result = operate(expression[1], parseFloat(expression[0]), parseFloat(expression[2]));
  if (result === Infinity) return 'Trying to break me? Don\'t divide by 0!';
  return parseInt(result) == result ? parseInt(result) : result.toFixed(2);
}

function findLastNumber(string = '2+15') {
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  arr = [...string];
  const lastNum = arr.reduce((prev, current) => {
    if (nums.includes(parseInt(current))) {
      prev += current;
    } else {
      prev = '';
    }
    return prev;
  }, '');
  return lastNum;
}

function findOperation(string) {
  arr = [...string];
  const operation = arr.find((element, index) => {
    return (isNaN(parseInt(element)) && index !== 0 && element !== '.');
  })
  return operation;
}

function reset() {
  firstPart = '';
  displayValue = '';
  updateDisplay('');
  operation = '';
}