const keys = document.querySelector(".keys");
const displayResult = document.querySelector(".display-result");
let equation = document.querySelector('.equation');
let firstNum,operator,secondNum, result;

// add listener to all keys
keys.addEventListener('click', e => {
    if ( e.target.matches('button')) {
        const key = e.target;
        const keyType = key.dataset.keyType;
        

        // when key nums click
        if (keyType === "numbers") {
            // check output is zero or not to append the user input
            if (displayResult.textContent === "0") {
                displayResult.textContent = key.textContent;
                
                if (equation.textContent === "0") {
                    equation.textContent = key.textContent;
                }else {
                    equation.textContent += key.textContent;
                }
                
            }else {
                displayResult.textContent += key.textContent;
                equation.textContent += key.textContent;
            }
        }

        // when operators click
        if (keyType === "operator") {  
            // as I am not implementing order of operation for yet, before clicking operators for second time, check if there is first number or operator to get the result
            if (firstNum, operator) {
                secondNum = parseFloat(displayResult.textContent);
                let result = roundNum(calculate(firstNum,operator,secondNum));
                displayResult.textContent = result
            }
            operator = key.id;
            if (displayResult.textContent === "0") {
                return
            }else {
                firstNum = parseFloat(displayResult.textContent);
                equation.textContent += key.textContent;
                displayResult.textContent = "0";
            }
        }

        // convert percentage value
        if (keyType === "percentage") {
            // to remove number value after the operation symbol before converting to decimal number
            let percentageNumCount = displayResult.textContent.length;

            let percentageVal = parseFloat(displayResult.textContent) / 100;
            displayResult.textContent = percentageVal;
            
            if (!(firstNum && operator)) {
                equation.textContent = percentageVal;
            }else {
                removeLastString(percentageNumCount);
            }

            // remove numbers base on the length
            function removeLastString (numberCount) {
                equation.textContent = equation.textContent.slice(0,-numberCount) + percentageVal;
            }
        }

        // decimal value
        if (keyType === "decimal") {
            if (displayResult.textContent === "0") {
                return;
            }else {
                if (displayResult.textContent.includes(".")) {
                    return;
                }
                displayResult.textContent += "."; 
                equation.textContent += ".";
            }
        }

        // ac
        if (keyType === "clear") {
            displayResult.textContent = 0;
            equation.textContent = 0;

            firstNum,operator,secondNum = null;
        }

        // c
        if (keyType === "delete") {
            if (displayResult.textContent === "0" && equation.textContent === "0") return;

            let displayStr = displayResult.textContent;
            let equationStr = equation.textContent;
            let removeDisplayStr = displayStr.slice(0,-1);
            let removeEquationStr = equationStr.slice(0,-1);
            displayResult.textContent = removeDisplayStr;
            equation.textContent = removeEquationStr;
            
        }

        // equal operatos
        if (keyType === "equal") {
            if (firstNum && operator) {
                // get the result
                secondNum = parseFloat(displayResult.textContent);
                let result = roundNum(calculate(firstNum,operator,secondNum));
                displayResult.textContent = result;
                firstNum = result;
                secondNum,operator = null;
            }else return;
        }
    }
});

function calculate(firstNum, operator, secondNum) {
    if (operator === "addition") {
        return firstNum + secondNum;
    }
    if (operator === "subtraction") {
        return firstNum - secondNum;
    }
    if (operator === "multiplication") {
        return firstNum * secondNum;
    }
    if (operator === "division") {
        // why it is not working
        // if(secondNum == 0 || secondNum == "0") {
        //     displayResult.textContent = "Error : Division by 0";
        //     return;
        // }
        return firstNum / secondNum;
    }
}

function roundNum (num) {
    return (num * 1000) / 1000;
}