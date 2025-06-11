const buttons = document.querySelectorAll("button");
const input = document.querySelector("input");
const operators = document.querySelectorAll(".operator");
const equalTo = document.querySelector("#equal-to");
let emptyArr = [];
let result;

//loop over each button and add an event listener to detect when they are clicked
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        displayNumber(button);
    })
})

//a function to display the value of the button clicked
function displayNumber(button) {
    //prevent an operator from starting the expression
    if (input.value === "" && (button.value === "+" || button.value === "-" || button.value === "÷" || button.value === "%" || button.value === "^" || button.value === "×")) {
        return
    }

    if ((button.value !== "=") && (button.value !== "c") && (button.value !== "x")) {

        //prevent multiple operators in a single expression 
        if ((input.value.includes("+") || input.value.includes("-") || input.value.includes("÷") || input.value.includes("^") || input.value.includes("%") || input.value.includes("×")) &&
            (button.value === "+" || button.value === "-" || button.value === "÷" || button.value === "%" || button.value === "^" || button.value === "×")) {
            return
        }

        input.value += button.value;  //concatenate the value of the button to the input field
        emptyArr.push(button.value)  //push the value of the button in the empty array in line 5
    }

    detectOperator(emptyArr);

    //enable cancel button
    if (button.value === "x") {
        input.value = input.value.toString().slice(0, -1);
        emptyArr = emptyArr.slice(0, -1);

        if (input.value.length === 0) {
            emptyArr = [];
        }
    }

    //enable clear button
    if (button.value === "c") {
        input.value = "";
        emptyArr = [];
    }
}


function detectOperator(emptyArr) {
    //filter array to separate both operands for calculation
    emptyArr.filter((arr) => {
        if ((arr === "+") || (arr === "÷") || (arr === "×") || (arr === "^") || (arr === "-") || (arr === "%")) {
            const num1 = emptyArr.slice(0, emptyArr.indexOf(arr));

            //the second operand is sliced only when it's available to prevent an empty string
            if (emptyArr[emptyArr.length - 1] === arr) {
                return
            }

            const num2 = emptyArr.slice(emptyArr.indexOf(arr) + 1);
            performOperation(arr, num1, num2);
        }
    })
}

let lastOperand1 = "";
let lastOperand2 = "";
let lastOperator = "";
let lastResult = "";

//a function to perform operation on both operands and the clicked operator
function performOperation(operator, num1, num2) {
    let operand1 = "";
    let operand2 = "";

    for (let n1 of num1) {
        operand1 += n1;
    }

    for (let n2 of num2) {
        operand2 += n2;
    }

    switch (operator) {
        case '+':
            result = Number(operand1) + Number(operand2);
            break;
        case '-':
            result = Number(operand1) - Number(operand2);
            break;
        case '÷':
            result = Number(operand1) / Number(operand2);
            break;
        case '×':
            result = Number(operand1) * Number(operand2);
            break;
        case '^':
            result = Number(operand1) ** Number(operand2);
            break;
        case '%':
            result = Number(operand1) % Number(operand2);
            break;
    }

    lastOperand1 = operand1;
    lastOperand2 = operand2;
    lastOperator = operator;
    lastResult = result;
}

//display result when the '=' button is clicked
equalTo.addEventListener("click", () => {
    emptyArr = [lastResult];   //enable continuous calculation by replacing operand1 with the result in the emptyArr
    displayResult(lastResult);
    displayHistory(lastResult, lastOperand1, lastOperand2, lastOperator)
})


function displayResult(result) {
    input.value = result;
}


//enable keyboard input
window.addEventListener("keydown", (e) => {
    buttons.forEach((button) => {
        if (button.value === e.key) {
            displayNumber(button);
        }
    })
    if (e.key === "Backspace") {
        buttons[11].click();
    } else if (e.key === "=" || e.key === "Enter") {
        buttons[19].click();
    } else if (e.key === "*") {
        buttons[12].click();
    } else if (e.key === "/") {
        buttons[13].click();
    }
})


//store previous calculations
let history;
const historyButton = document.querySelector(".history-btn");
const historyContainer = document.querySelector(".history-container");
historyContainer.classList.add("history-hidden");

function displayHistory(result, operand1, operand2, operator) {
    history = {
        "operation": Number(operand1) + " " + operator + " " + Number(operand2) + " " + '=' + " " + Number(result)
    }

    historyContainer.innerHTML += `${history.operation} <br>`
}

historyButton.addEventListener("click", () => {
    historyContainer.classList.toggle("history-hidden")
    historyContainer.classList.toggle("history")
})




const mobileMedia = window.matchMedia("(min-width: 360px) and (max-width: 480px)")
function handleMedia(med) {
    if (med.matches) {
        input.addEventListener("input", (e) => {
            e.preventDefault()
        })
    }
}
handleMedia(mobileMedia)
