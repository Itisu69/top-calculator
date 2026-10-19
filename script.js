// Storing current calculator state
let currentInput = "0";
let previousInput = "";
let resetScreen = false;
let currentOperator = null;

const display = document.querySelector(".calc-display p");
const buttons = document.querySelectorAll(".calc button");

function updateDisplay() {
  display.textContent = currentInput;
}

updateDisplay();
// Handling button clicks or keyboard inputs
function appendNumber(number) {
  if (currentInput === "0" || resetScreen) {
    currentInput = number;
    resetScreen = false;
  } else {
    currentInput += number;
  }
}

// Handling decimal point
function appendDecimal() {
  if (resetScreen) {
    currentInput = "0";
    resetScreen = false;
  }

  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
}

// Handling operators (=, -, /, x)
function setOperator(operator) {
  if (currentOperator !== null) calculate();
  previousInput = currentInput;
  currentOperator = operator;
  resetScreen = true;
}

function calculate() {
  if (currentOperator === null) return;

  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  switch (currentOperator) {
    case "+":
      result = current + prev;
      break;
    case "-":
      result = prev - current;
      break;
    case "/":
      if (current === 0) {
        alert("Cannot divide by 0!!!");
        clearALl();
        return;
      }
      result = prev / current;
      break;
    case "x":
      result = current * prev;
      break;
    default:
      return;
  }

  currentInput = roundResult(result).toString();
  currentOperator = null;
  resetScreen = true;
}

function roundResult(result) {
  return Math.round(result * 100000000) / 100000000;
}

// Clear all button CE
function clearALl() {
  currentInput = "0";
  previousInput = "";
  resetScreen = false;
  currentOperator = null;
}

// Delete last digit (Backspace)
function deleteNumber() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
}

function toggleSign() {
  if (currentInput !== "0") {
    currentInput = currentInput.startsWith("-")
      ? currentInput.slice(1)
      : "-" + currentInput;
  }
}

// Event listener for mouse
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const text = button.textContent;

    if (button.classList.contains("backspace") || text === "⌫") {
      deleteNumber();
    } else if (text === "CE") {
      clearALl();
    } else if (button.classList.contains("negate") || text === "+/-") {
      toggleSign();
    } else if (text === ".") {
      appendDecimal();
    } else if (["+", "-", "/", "x"].includes(text)) {
      setOperator(text);
    } else if (text === "=") {
      calculate();
    } else if (!isNaN(text)) {
      appendNumber(text);
    }

    updateDisplay();
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key >= 0 && e.key <= 9) {
    appendNumber(e.key);
  } else if (e.key === ".") {
    appendDecimal();
  } else if (e.key === "+" || e.key === "-") {
    setOperator(e.key);
  } else if (e.key === "*") {
    setOperator("x");
  } else if (e.key === "/") {
    e.preventDefault(); // Prevents browser quick find shortcut
    setOperator("/");
  } else if (e.key === "Enter" || e.key === "=") {
    calculate();
  } else if (e.key === "Backspace") {
    deleteNumber();
  } else if (e.key === "c" || e.key === "Escape") {
    clearALl();
  }
  updateDisplay();
});