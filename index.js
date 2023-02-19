var input = document.getElementById('input'),
  pattern = /[^x0-9-+=×÷/^*()]/,
  number = document.querySelectorAll('.numbers div'), // number buttons
  operator = document.querySelectorAll('.operators div'), // operator buttons
  result = document.getElementById('result'), // equal button
  clear = document.getElementById('clear'), // clear button
  resultDisplayed = false; // flag to keep an eye on what output is displayed

// input
input.addEventListener("keydown", function(e) {
  if(resultDisplayed == true && input.value.startsWith("x=")) input.value = "";

  if(pattern.test(input.value) === true) input.value = input.value.substring(0, input.value.length-1);
});

// adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {
    
    if(e.target.id == "clear") return;

    // storing current input string and its last character in variables - used later
    var currentString = input.value;
    var lastChar = currentString[currentString.length - 1];

    // if result is not diplayed, just keep adding
    if (resultDisplayed === false) {
      input.value += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      // if result is currently displayed and user pressed an operator
      // we need to keep on adding to the string for next operation
      resultDisplayed = false;
      input.value += e.target.innerHTML;
    } else {
      // if result is currently displayed and user pressed a number
      // we need clear the input string and add the new input to start the new opration
      resultDisplayed = false;
      input.value = "";
      input.value += e.target.innerHTML;
    }

  });
}

// adding click handlers to number buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    // storing current input string and its last character in variables - used later
    var currentString = input.value;
    var lastChar = currentString[currentString.length - 1];

    // if last character entered is an operator, replace it with the currently pressed one
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.value = newString;
    } else if (currentString.length == 0) {
      // if first key pressed is an opearator, don't do anything
      console.log("enter a number first");
    } else {
      // else just add the operator pressed to the input
      input.value += e.target.innerHTML;
    }

  });
}

// on click of 'equal' button
result.addEventListener("click", function() {

  var isEquation = input.value.includes("=")

  input.value = input.value.replace("×", "*")
  input.value = input.value.replace("÷", "/")

  if(isEquation == true) input.value = "x=" + nerdamer.solveEquations(input.value).join(", x=")
  else input.value = nerdamer(input.value)

  resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
  input.value = "";
})
