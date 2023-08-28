// const { prependListener } = require("gulp");

type themeObj = {
  [key: number]: string;
};

let theme: themeObj = {
  0: "theme-one",
  1: "theme-two",
  2: "theme-three",
};

const themeToggle = document.querySelector(
  ".theme-selector"
) as HTMLButtonElement;
const body = document.querySelector("body") as HTMLBodyElement;
let themeNum: number = 0;

// Adding event Listener to every toggle
const themeChanger = (): void => {
  // console.log("hi")
  themeNum < 2 ? themeNum++ : (themeNum = 0);

  body.removeAttribute("class");
  body.setAttribute("class", `theme-${themeNum}`);
  themeToggle.style.left = `${themeNum}rem`;
};

// Es6 way of making a calc

//  Workings

class Calculator {
  currentOperandText:  HTMLParagraphElement;
  previousOperandText:  HTMLParagraphElement;
  private operator: string ;
  private currentOperand: string;
  private previousOperand: string;
  private pattern: string | RegExp;

  constructor(currentOperandText: HTMLParagraphElement, previousOperandText: HTMLParagraphElement) {
    this.currentOperandText = currentOperandText;
    this.previousOperandText = previousOperandText;
    this.operator = '';
    
    this.pattern = "^[0-9]*[.]?[0-9]*$";

    this.currentOperand = '';
    this.previousOperand = '';
    this.reset();
  }

  reset() {
    // variable that will hold currend operand values, previous operand value and the Operator
    this.currentOperand = "";
    this.previousOperand = "";
  }

  deleteF() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  OurOperation(operator: string) {
    // It will check if num ends with "." but have no value after that. if yes then discard it.
    if (this.currentOperand.charAt(this.currentOperand.length - 1) == ".") {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }

    // if previous and current num are there then only compute.
    if (this.previousOperand !== "" && this.currentOperand !== "") {
      this.previousOperand = this.compute(this.operator) + operator;
      this.currentOperand = "";
      this.operator = operator;
      return;
    }

    if (this.previousOperand.match(/(-|\+|\x|\/)/g) != null) {
      // console.log(previousOperandText.innerText)
      this.operator = operator;
      this.previousOperand = this.previousOperand.slice(0, -1) + this.operator;
    }

    if (!this.currentOperand) return;

    this.operator = operator;
    this.previousOperand = this.currentOperand + operator;
    this.currentOperand = "";
  }

  compute(OPERATOR: string) :void | string {
    if (!this.previousOperand || !this.currentOperand) return;

    let computed:number | string | undefined  ; // for final output of calculation
    let previousOperator; // takes previousOperator of func for equals case.

    let curNum = parseFloat(this.currentOperand);
    let prevNum = parseFloat(this.previousOperand);

    switch (this.operator) {
      case "+":
        computed = prevNum + curNum;
        break;

      case "-":
        computed = prevNum - curNum;
        break;

      case "x":
        computed = prevNum * curNum;
        floatfixer(computed);
        break;

      case "/":
        computed = prevNum / curNum;
        floatfixer(computed);
        break;
    }

    // check if num is float or not and if yes then fixed 2.
    function floatfixer(compute: number): void {
      if (!Number.isInteger(compute)) {
        computed = parseFloat(`${computed}`).toFixed(2);
      }
    }

    // If we wanna directly compute values using = then,
    if (OPERATOR == "=") {
      this.reset();
      this.currentOperand = `${computed}`;
    }
    // else return value and place in input for future references and addition
    else {
      return `${computed}`;
    }
  }

  appendNumber(number: string) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += number;
  }

  updateDisplay() {
    this.pattern = /(\d)(?=(\d{3})+(\.\d+)?(\D|$))/g;

    this.currentOperandText.innerText = this.currentOperand.replace(
      this.pattern,
      "$1,"
    );
    this.previousOperandText.innerText = this.previousOperand.replace(
      this.pattern,
      "$1,"
    );
  }
}

// Variables
const previousOperandText = document.querySelector(".previous") as HTMLParagraphElement;
const currentOperandText = document.querySelector(".current") as HTMLParagraphElement;

const number = document.querySelectorAll("[data-number]") as NodeListOf<HTMLButtonElement>;
const operator = document.querySelectorAll("[data-operator]") as NodeListOf<HTMLButtonElement>;
// const backspace = document.querySelector("[data-deleteF]");
const reset = document.querySelector("[data-reset]") as HTMLButtonElement;
// const equals = document.querySelectorAll("[data-equals]");

const calculator = new Calculator(currentOperandText, previousOperandText);

number.forEach((button : HTMLButtonElement) =>
  button.addEventListener("click", () => {
    // will take num that is inside button on click
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
);

operator.forEach((button : HTMLButtonElement) =>
  button.addEventListener("click", () => {
    calculator.OurOperation(button.innerText);
    calculator.updateDisplay();
  })
);

reset.addEventListener("click", () => {
  calculator.reset();
  calculator.updateDisplay();
});

// For backspace. The above approach trigger method doesn't seems to be working.
// So, a primitive approach.

function equals() {
  calculator.compute("=");
  calculator.updateDisplay();
}

function deleteMe() {
  calculator.deleteF();
  calculator.updateDisplay();
}
