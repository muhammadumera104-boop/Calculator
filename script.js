const display = document.querySelector("#display");
const buttons = document.querySelector(".buttons");

let current = "";
let previous = "";
let operator = "";

buttons.addEventListener("click", (e) => {
  const target = e.target;

  // ignore clicks on the gap between buttons
  if (target.tagName !== "BUTTON") return;

  if (target.id === "clear") {
    clearAll();
  } else if (target.id === "equal") {
    calculate();
  } else if (target.classList.contains("operator")) {
    handleOperator(target.dataset.value);
  } else {
    handleDigit(target.dataset.value);
  }
});

function handleDigit(value) {
  // ignore a second decimal point
  if (value === "." && current.includes(".")) return;

  current += value;
  display.value = current;
}

function handleOperator(value) {
  // no number typed yet: just allow changing the operator
  if (current === "") {
    if (previous !== "") operator = value;
    return;
  }

  // chaining: 2 + 3 + 4 calculates 2 + 3 first
  if (previous !== "") {
    calculate();
  }

  previous = current;
  operator = value;
  current = "";
}

function calculate() {
  if (previous === "" || current === "" || operator === "") return;

  const a = parseFloat(previous);
  const b = parseFloat(current);
  let result;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) {
        clearAll();
        display.value = "Error";
        return;
      }
      result = a / b;
      break;
    default:
      return;
  }

  // round to fix floating-point issues like 0.1 + 0.2
  result = parseFloat(result.toFixed(10));

  display.value = result;
  current = String(result);
  previous = "";
  operator = "";
}

function clearAll() {
  current = "";
  previous = "";
  operator = "";
  display.value = "";
}