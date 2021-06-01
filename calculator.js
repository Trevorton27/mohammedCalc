const numbers = document.querySelectorAll('.number');
const operators = document.getElementsByClassName('operator');
const decimalBtn = document.querySelector('.dot');
const clearBtn = document
  .getElementById('clearBtn')
  .addEventListener('click', reset);
const display = document.getElementById('display');
const equalsButton = document.querySelector('.equals');
display.value = '0';

console.log('numbers: ', numbers);

let firstOperand = '';
let secondOperand = '';
let operatorValue = '';
let outcome = 0;
let decimalNumber = '.';

function reset(e) {
  e.preventDefault();
  display.value = '0';
  firstOperand = '';
  secondOperand = '';
  operatorValue = '';
}

decimalBtn.addEventListener('click', function (e) {
  e.preventDefault();

  //check if firstOperand or secondOperand contains a decimal, if it does, disable the decimal button

  if (!operatorValue) {
    firstOperand = handleDecimal(firstOperand);
    display.value = firstOperand;
  } else if (firstOperand && operatorValue) {
    secondOperand = handleDecimal(secondOperand);
    display.value = secondOperand;
  }
});

for (let i = 0; i < numbers.length; i++) {
  const number = numbers[i];

  number.addEventListener('click', function (e) {
    e.preventDefault();

    if (!operatorValue) {
      //if there isn't 1st operand
      //and number button/element was pressed then-->
      firstOperand += number.textContent;
      // if (firstOperand && !operatorValue) {
      //   firstOperand += firstOperand;
      // }
      display.value = firstOperand;
      console.log('firstOperand is: ', firstOperand);
    }
    if (firstOperand && operatorValue) {
      secondOperand += number.textContent;
      console.log('secondOperand is:', secondOperand);
    }
    // display.value = secondOperand;
  });
}

function handleDecimal(operand) {
  const numberArray = operand.split('');
  if (numberArray.indexOf('.') === -1) {
    numberArray.push('.');
  }
  return numberArray.join('');
}

for (let i = 0; i < operators.length; i++) {
  const operator = operators[i];

  operator.addEventListener('click', function (e) {
    e.preventDefault();

    if (firstOperand && operatorValue && secondOperand) {
      // continuous functionality/operations.
      //if there were 1st Operand && 2nd Operand && operator
      // and operator button was pressed then -->
      result = calculate(firstOperand, operatorValue, secondOperand);
      display.value = result;
      firstOperand = result;
      operatorValue = operator.textContent;
      secondOperand = '';

      //console.log('operatorValue: ', operatorValue);
    } else if (firstOperand) {
      //if there was 1st operand and was NOT operator
      // and operator button was pressed then -->
      operatorValue = operator.textContent;
    }
    console.log('operatorValue: ', operatorValue);
  });
}

function calculate(firstOperand, operatorValue, secondOperand) {
  if (operatorValue === '+') {
    outcome = Number(firstOperand) + Number(secondOperand);
    console.log('the outcome is: ', outcome);
    return outcome;
  }

  if (operatorValue === '-') {
    outcome = Number(firstOperand) - Number(secondOperand);
    return outcome;
  }

  if (operatorValue === '/') {
    outcome = Number(firstOperand) / Number(secondOperand);
    return outcome;
  }

  if (operatorValue === 'x') {
    outcome = Number(firstOperand) * Number(secondOperand);
    return outcome;
  }
}

equalsButton.addEventListener('click', () => {
  //What condidtions to check before calculating?
  if (firstOperand && operatorValue && secondOperand) {
    display.value = calculate(firstOperand, operatorValue, secondOperand);
    firstOperand = outcome;
    secondOperand = '';
  }
});
