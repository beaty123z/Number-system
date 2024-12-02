const choiceFrom = document.querySelector("#choiceFrom");
const inputValue = document.querySelector("#inputValue");
const convertBtn = document.querySelector("#convertBtn");
const resultArea = document.querySelector("#resultArea");
const errorMessage = document.querySelector("#errorMessage");

let decimalOutput, binaryOutput, octalOutput, hexadecimalOutput;

choiceFrom.addEventListener("change", checkValidation);
inputValue.addEventListener("input", checkValidation);

convertBtn.addEventListener("click", () => {
  const from = choiceFrom.value;
  const value = inputValue.value;
  handleConversion(from, value);
});

function checkValidation() {
  const choice = choiceFrom.value;
  const value = inputValue.value.trim();
  let isValid = false;
  let baseName;

  switch (choice) {
    case "1": // Decimal
      isValid = /^-?\d*\.?\d+$/.test(value);
      baseName = "decimal";
      break;
    case "2": // Binary
      isValid = /^-?[01]+(\.[01]+)?$/.test(value);
      baseName = "binary";
      break;
    case "3": // Octal
      isValid = /^-?[0-7]+(\.[0-7]+)?$/.test(value);
      baseName = "octal";
      break;
    case "4": // Hexadecimal
      isValid = /^-?[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/.test(value);
      baseName = "hexadecimal";
      break;
  }

  if (!isValid && value !== "") {
    errorMessage.innerText = `Invalid ${baseName} value`;
    convertBtn.disabled = true;
  } else {
    errorMessage.innerText = "";
    convertBtn.disabled = false;
  }
}

function handleConversion(choice, input) {
  let decimalValue;
  switch (choice) {
    case "1": // Decimal
      decimalValue = parseFloat(input);
      break;
    case "2": // Binary
      decimalValue = binaryToDecimal(input);
      break;
    case "3": // Octal
      decimalValue = octalToDecimal(input);
      break;
    case "4": // Hexadecimal
      decimalValue = hexadecimalToDecimal(input);
      break;
    default:
      return;
  }

  // Perform conversions
  decimalOutput = decimalValue.toFixed(5); // Rounded to 5 decimal places
  binaryOutput = convertDecimalToBase(decimalValue, 2);
  octalOutput = convertDecimalToBase(decimalValue, 8);
  hexadecimalOutput = convertDecimalToBase(decimalValue, 16).toUpperCase();

  // Display results
  resultArea.innerHTML = `
    <p><strong>Decimal:</strong> ${decimalOutput}</p>
    <p><strong>Binary:</strong> ${binaryOutput}</p>
    <p><strong>Octal:</strong> ${octalOutput}</p>
    <p><strong>Hexadecimal:</strong> ${hexadecimalOutput}</p>
  `;
}

function binaryToDecimal(binary) {
  const [integerPart, fractionPart] = binary.split(".");
  let integerConverted = parseInt(integerPart, 2);
  if (!fractionPart) return integerConverted;

  let fractionConverted = 0;
  for (let i = 0; i < fractionPart.length; i++) {
    fractionConverted += parseInt(fractionPart[i], 2) / Math.pow(2, i + 1);
  }
  return integerConverted + fractionConverted;
}

function octalToDecimal(octal) {
  const [integerPart, fractionPart] = octal.split(".");
  let integerConverted = parseInt(integerPart, 8);
  if (!fractionPart) return integerConverted;

  let fractionConverted = 0;
  for (let i = 0; i < fractionPart.length; i++) {
    fractionConverted += parseInt(fractionPart[i], 8) / Math.pow(8, i + 1);
  }
  return integerConverted + fractionConverted;
}

function hexadecimalToDecimal(hexadecimal) {
  const [integerPart, fractionPart] = hexadecimal.split(".");
  let integerConverted = parseInt(integerPart, 16);
  if (!fractionPart) return integerConverted;

  let fractionConverted = 0;
  for (let i = 0; i < fractionPart.length; i++) {
    fractionConverted += parseInt(fractionPart[i], 16) / Math.pow(16, i + 1);
  }
  return integerConverted + fractionConverted;
}

function convertDecimalToBase(value, base) {
  const [integerPart, fractionPart] = value.toString().split(".");
  let integerConverted = parseInt(integerPart || "0").toString(base);
  if (!fractionPart) return integerConverted;

  let fractionConverted = "";
  let fraction = parseFloat(`0.${fractionPart}`);
  for (let i = 0; i < 5; i++) { // Limit precision to 5 places
    fraction *= base;
    const digit = Math.floor(fraction);
    fractionConverted += digit.toString(base);
    fraction -= digit;
  }
  return `${integerConverted}.${fractionConverted}`;
}
