// const { prependListener } = require("gulp");

let theme ={
    1: "theme-one",
    2: "theme-two",
    3: "theme-three"
};

let themeToggle = document.querySelectorAll('.circle');
let body = document.querySelector('body');

// Adding event Listener to every toggle
themeToggle.forEach(item=> item.addEventListener('click',()=>{
   
    themeToggle.forEach(circle=> circle.classList.remove("active"));
    item.classList.add("active");
    
    body.removeAttribute("class");

    for(let key in theme) {
        console.log(key)
        if(item.classList.contains(`${key}`)){
            body.setAttribute("class", `${theme[key]}`);
        }
    }

}))




// Es6 way of making a calc

//  Workings


class Calculator{

    constructor(currentOperandText, previousOperandText){
        this.currentOperandText = currentOperandText;
        this.previousOperandText = previousOperandText;
        this.reset()
    }

    reset(){
        // variable that will hold currend operand values, previous operand value and the Operator 
        this.currentOperand = "";
        this.previousOperand = "";
        this.operator = undefined;
    }

    deleteF(){
        this.currentOperand= this.currentOperand.slice(0,-1);
        // console.log("hello")
        
    }

    
    OurOperation(operator){
        // It will check if num ends with "." if yes then discard it.
        if(this.currentOperand.charAt(this.currentOperand.length-1)=="."){
            this.currentOperand= this.currentOperand.slice(0,-1);
        }
        
        // if previous and current num are there then only compute.
        if(this.previousOperand!=="" && this.currentOperand!==""){
            this.previousOperand = this.compute(this.operator) + operator;
            this.currentOperand="";
            this.operator = operator;
            return;
        }
        
        // let operateReg = /(-|\+|\*|\/)/g;
        if(this.previousOperand.match(/(-|\+|\x|\/)/g)!=null) {
            console.log(previousOperandText.innerText)
            this.operator = operator;
            this.previousOperand = this.previousOperand.slice(0,-1) + this.operator;
            
        }

        if(!this.currentOperand) return;
        
        this.operator = operator;
        this.previousOperand = this.currentOperand + operator;
        this.currentOperand = "";
        
    }


    compute(OPERATOR){
        if(!this.previousOperand || !this.currentOperand) return;

        let computed ; // for final output of calculation
        let previousOperator; // takes previousOperator of func for equals case.

        let curNum = parseFloat(this.currentOperand);
        let prevNum = parseFloat(this.previousOperand);


        switch(this.operator){
            case "+":
                computed = prevNum + curNum;
                break;

            case "-":
                computed = prevNum - curNum;
                break;

            case "x":
                computed = prevNum* curNum;
                floatfixer(computed);
                break;

            case "/":
                    computed = prevNum/ curNum;
                    floatfixer(computed);
                break;
        }

        // check if num is float or not and if yes then fixed 2.
        function floatfixer(compute){
           if(!Number.isInteger(compute)){
          computed = parseFloat(computed).toFixed(2);
        }
        }

        // If we wanna directly compute values using = then,
        if(OPERATOR=="="){
            this.reset();
            this.currentOperand = `${computed}`;
        }
        // else return value and place in input for future references and addition
        else{
            return `${computed}`;
        }

    }

    appendNumber(number){
        if(number==="." && this.currentOperand.includes(".")) return;
        this.currentOperand+= number;

    }

    updateDisplay(){
        this.pattern = /(\d)(?=(\d{3})+(\.\d+)?(\D|$))/g;

        this.currentOperandText.innerText = this.currentOperand.replace(this.pattern,"$1,");
        this.previousOperandText.innerText = this.previousOperand.replace(this.pattern,"$1,");
    }


}


// Variables
const previousOperandText = document.querySelector(".previous");
const currentOperandText = document.querySelector(".current");

const number = document.querySelectorAll("[data-number]");
const operator = document.querySelectorAll("[data-operator]");
// const backspace = document.querySelector("[data-deleteF]");
const reset = document.querySelector("[data-reset]");
// const equals = document.querySelectorAll("[data-equals]");



const calculator = new Calculator(currentOperandText, previousOperandText);

number.forEach(button => button.addEventListener("click",()=>{
    // will take num that is inside button on click
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
}))


operator.forEach(button => button.addEventListener("click",()=>{
    calculator.OurOperation(button.innerText);
    calculator.updateDisplay();
}))

reset.addEventListener("click",()=>{
    calculator.reset();
    calculator.updateDisplay();
})

// For backspace. The above approach trigger method doesn't seems to be working.
// So, a primitive approach.

function equals() {
    calculator.compute("=");
    calculator.updateDisplay();
}


function deleteMe(){
    calculator.deleteF();
    calculator.updateDisplay();
}