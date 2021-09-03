let sumTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

///first we listen for the user's event
document
  .querySelector(".calc-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });

/// then we check if the value of the event is a symbol or a number
function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

// The parseInt function converts its first argument to a string,
// parses that string, then returns an integer or NaN . If not NaN ,
// the return value will be the integer that is the first argument
// taken as a number in the specified radix

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}
///buffer 0 takes the value and either becomes it and or appends the last value to it
/// so if the user typed in 5, buffer = 0 + 5; buffer now = 0;
// if the user typed in another 5 then buffer goes from 5 to 55

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      sumTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer)); /// converts buffer to an int and passes it to flushOperation
      previousOperator = null;
      buffer = "" + sumTotal;
      sumTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else{
          buffer = buffer.substring(0, buffer.length-1); 
      }
      break;
      default:
          handleMath(value);
          break;
  }
}

function handleMath(value){
    const intBuffer = parseInt(buffer);
    if (sumTotal === 0) {
        sumTotal = intBuffer
    } else{
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer= "0";

}

function flushOperation(intBuffer){
    if(previousOperator == "+"){
        sumTotal += intBuffer;
    }else if (previousOperator == "-"){
        sumTotal -= intBuffer;
    }else if (previousOperator == "×"){
        sumTotal *= intBuffer;
    }else{
        sumTotal /= intBuffer;
    }    
}


function rerender() {
  screen.innerText = buffer;
}

///<section class="screen">0</section> <---- function rerender() changes the text in screen class in html
// based to the buffer value
