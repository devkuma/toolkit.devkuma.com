{
  class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.allClear();
    }

    allClear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined;

      this.updateDisplay();
    }

    changeSign() {
      if (this.currentOperandTextElement.innerText === '') {
        return;
      }

      const current = parseFloat(this.currentOperand)
      if (current) {
        this.currentOperand = current * -1;
      }

      this.updateDisplay();
    }

    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)

      this.updateDisplay();
    }

    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) {
        return
      }
      this.currentOperand = this.currentOperand.toString() + number.toString()

      this.updateDisplay();
    }

    chooseOperation(operation) {
      if (this.currentOperandTextElement.innerText == '') {
        return;
      }

      if (this.currentOperandTextElement.innerText !== '' && this.currentOperand === '') {
        return;
      }
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      if (this.currentOperand !== '') {
        this.previousOperand = this.currentOperand
      }
      this.currentOperand = ''

      this.updateDisplay();
    }

    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break;
        case 'x':
          computation = prev * current
          break;
        case '÷':
          computation = prev / current
          break;
        default:
          return;
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''

      this.updateDisplay();
    }

    _getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }

    updateDisplay() {
      this.currentOperandTextElement.innerText = this._getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this._getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }


  const numberButtons = document.querySelectorAll('[data-number]');
  const operationButtons = document.querySelectorAll('[data-operation]');
  const equalsButton = document.querySelector('[data-equals]');
  const allClearButton = document.querySelector('[data-all-clear]');
  const changeSignButton = document.querySelector('[data-change-sign]');
  const deleteButton = document.querySelector('[data-delete]');
  const previousOperandTextElement = document.querySelector('[data-previous-operand]');
  const currentOperandTextElement = document.querySelector('[data-current-operand]');

  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })

  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
    })
  })

  equalsButton.addEventListener('click', button => {
    calculator.compute();
  })

  allClearButton.addEventListener('click', button => {
    calculator.allClear();
  });

  changeSignButton.addEventListener('click', button => {
    calculator.changeSign();
  });

  deleteButton.addEventListener('click', button => {
    calculator.delete();
  });

  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ".":
        calculator.appendNumber(event.key);
        break;
      case "/":
      case "*":
      case "-":
      case "+":
        if (event.key === '*') {
          operation = 'x';
        } else if (event.key === '/') {
          operation = '÷';
        } else {
          operation = event.key;
        }
        calculator.chooseOperation(operation);
        break;
      case "Escape":
        calculator.clear();
        break;
      case "Backspace":
        calculator.delete();
      case "Enter":
      case "=":
        calculator.compute();
    }
  });
}