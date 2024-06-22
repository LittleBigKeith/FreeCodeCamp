const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const answerOutput = document.getElementById("output"); 
const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");


const convertBtnClicked = () => {
  answerOutput.style.visibility = "visible";
  answerOutput.style.fontSize = "1rem";
  const number = parseInt(numberInput.value);
  console.log(number);
  if (isNaN(number)) {
    answerOutput.textContent = "Please enter a valid number";
    return;
  }
  if (number < 1) {
    answerOutput.textContent = "Please enter a number greater than or equal to 1";
    return;
  }
  if (number > 3999) {
    answerOutput.textContent = "Please enter a number less than or equal to 3999";
    return;
  }
  answerOutput.style.fontSize = "3rem";
  answerOutput.textContent = doConversion(number);
}

const doConversion = (romanNumber) => {
  let arabicNumber = "I".repeat(romanNumber);
  
  return arabicNumber
  .replaceAll("I".repeat(1000), "M")
  .replaceAll("I".repeat(900), "CM")
  .replaceAll("I".repeat(500), "D")
  .replaceAll("I".repeat(400), "CD")
  .replaceAll("I".repeat(100), "C")
  .replaceAll("I".repeat(90), "XC")
  .replaceAll("I".repeat(50), "L")
  .replaceAll("I".repeat(40), "XL")
  .replaceAll("I".repeat(10), "X")
  .replaceAll("I".repeat(9), "IX")
  .replaceAll("I".repeat(5), "V")
  .replaceAll("I".repeat(4), "IV");
}

window.onload = () => {
  const setDate = () => {
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      
      const hourDeg = (hour / 12) * 360 + (minute / 60) * 30;
      const minuteDeg = (minute / 60) * 360 + (second / 60) * 6; 
      
      hourHand.style.transform = `rotate(${hourDeg}deg)`;
      minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
      console.log(hourHand);
  }
  setDate();
  setInterval(setDate, 1000);
    
  numberInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        convertBtnClicked();
      }
  });
}