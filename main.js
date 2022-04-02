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
   zeroElement, oneElement, twoElement, threeElement, fourElement, 
   fiveElement, sixElement, sevenElement, eightElement, nineElement
];


/* Functions */

const getValueAsStr = () => {
    return displayElement.textContent.split(',').join('');
}
const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
}

const setStrAsValue = (valueStr) =>{
    if(valueStr[valueStr.length-1] === '.'){
        displayElement.textContent += '.';
        return
    }
    displayElement.textContent = parseFloat(valueStr).toLocaleString('en-US');
}


const handleNumClick = (numStr) => {
    const currentDisplayStr = getValueAsStr();
    if(currentDisplayStr === "0"){
        setStrAsValue(numStr);
    }else{
        setStrAsValue(currentDisplayStr + numStr);
    }
};



/* Events */

for (let i=0; i < numbersElement.length; i++){
    const numElement = numbersElement[i];
    numElement.addEventListener('click', () => {
        handleNumClick(i.toString());
    });
}

dotElement.addEventListener('click', () => {
    const currentDisplayStr = getValueAsStr();
    if(!currentDisplayStr.includes('.')){
    setStrAsValue(currentDisplayStr + '.')
    }
});

