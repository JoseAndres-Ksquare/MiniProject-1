/* Declarations */
const displayElement = document.getElementById("display");

const cElement = document.getElementById("btn-C");
const dotElement = document.getElementById("btn-dot");

const divisionElement = document.getElementById("btn-division");
const multiplyElement = document.getElementById("btn-multiply");
const minusElement = document.getElementById("btn-minus");
const plusElement = document.getElementById("btn-plus");
const equalElement = document.getElementById("btn-equal");

const sevenElement = document.getElementById("btn-seven");
const eightElement = document.getElementById("btn-eight");
const nineElement = document.getElementById("btn-nine");
const fourElement = document.getElementById("btn-four");
const fiveElement = document.getElementById("btn-five");
const sixElement = document.getElementById("btn-six");
const oneElement = document.getElementById("btn-one");
const twoElement = document.getElementById("btn-two");
const threeElement = document.getElementById("btn-three");
const zeroElement = document.getElementById("btn-zero");

const numbersElement = [
  zeroElement,
  oneElement,
  twoElement,
  threeElement,
  fourElement,
  fiveElement,
  sixElement,
  sevenElement,
  eightElement,
  nineElement,


];

//Variables
let displayStrMemo = null;
let operatorMemo = null;
let resetNumbers = false;


/* Functions */

const getValueAsStr = () => {
  return displayElement.textContent.split(",").join("");
};
const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
    console.log(resetNumbers);
  if (valueStr[valueStr.length - 1] === ".") {
      if(resetNumbers){
        displayElement.textContent = "0.";
        resetNumbers = false;
      }else{
          displayElement.textContent += ".";
      }
    return;
  }


  //Agrega los decimales y ya no suma 1
  const [numCompleteStr, decimalStr] = valueStr.split(".");
  if (decimalStr) {
    displayElement.textContent =
      parseFloat(numCompleteStr).toLocaleString("en-US") + "." + decimalStr;
  } else {
    displayElement.textContent =
      parseFloat(numCompleteStr).toLocaleString("en-US");
  }
};

const handleNumClick = (numStr) => {
  const currentDisplayStr = getValueAsStr();
  if (currentDisplayStr === "0") {
    setStrAsValue(numStr);
  } else {
    if (resetNumbers) {
      setStrAsValue(numStr);
      resetNumbers = false;
    } else {
      setStrAsValue(currentDisplayStr + numStr);
    }
  }
};

const resultOfOperationStr = () => {
  const displayNumMemo = parseFloat(displayStrMemo);
  const currentDisplayNum = getValueAsNum();

  let newDisplayNum;
  if (operatorMemo === "multiply") {
    newDisplayNum = displayNumMemo * currentDisplayNum;
  } else if (operatorMemo === "division") {
    newDisplayNum = displayNumMemo / currentDisplayNum;
  } else if (operatorMemo === "plus") {
    newDisplayNum = displayNumMemo + currentDisplayNum;
  } else if (operatorMemo === "minus") {
    newDisplayNum = displayNumMemo - currentDisplayNum;
  }
  //redondeo de decimales
  if (newDisplayNum % 1 === 0) {
    return newDisplayNum.toString();
  } else {
    return newDisplayNum.toFixed(4);
  }
};

const handleOpClick = (operation) => {
  const currentDisplayStr = getValueAsStr();
  if(operation === 'minus' && !displayStrMemo){
      if(currentDisplayStr === '0')  {displayElement.textContent = '-';
      return;}
  }

  if (currentDisplayStr !== "0") {
    if (!displayStrMemo) {
      displayStrMemo = currentDisplayStr;
      operatorMemo = operation;
      setStrAsValue('0')
      resetNumbers = false;
      return;
    }
    displayStrMemo = resultOfOperationStr();
    operatorMemo = operation;
    setStrAsValue("0");
  } else {
    if (operatorMemo === "multiply" && operation === "minus") {
      displayStrMemo = `${displayStrMemo*-1}`;

    } else if(operatorMemo === "division" && operation === "minus"){
        displayStrMemo = `-${displayStrMemo}`;

    }else if(displayStrMemo === "NaN"){
        displayStrMemo = '0';

    }else {
      operatorMemo = operation;
    }
  }
};

//agregar event listener al btn C
//Resetear display a 0
cElement.addEventListener("click", () => {
  setStrAsValue("0");
  displayStrMemo = 0;
  operatorMemo = null;
  resetNumbers = false;
});

//agregar event listener a los operadores

plusElement.addEventListener("click", () => {
  handleOpClick("plus");
  
});

minusElement.addEventListener("click", () => {
    
  handleOpClick("minus");
});

multiplyElement.addEventListener("click", () => {
  handleOpClick("multiply");
});

divisionElement.addEventListener("click", () => {
    handleOpClick("division");
});

equalElement.addEventListener("click", () => {
    setStrAsValue(resultOfOperationStr());
    displayStrMemo = 0;
    operatorMemo = null;
    resetNumbers = true;
});

for (let i = 0; i < numbersElement.length; i++) {
  const numElement = numbersElement[i];
  numElement.addEventListener("click", () => {
    handleNumClick(i.toString());
  });
}

dotElement.addEventListener("click", () => {
  const currentDisplayStr = getValueAsStr();
  const arrayDisplay = currentDisplayStr.split('');
  if (arrayDisplay[arrayDisplay.length-1] !== '.') {
    setStrAsValue(currentDisplayStr + ".");
  }
});
