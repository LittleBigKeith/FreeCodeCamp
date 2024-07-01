const body = document.getElementById("body");
const userInput = document.getElementById("user-input-p");
const userInputInvis = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div")
const keypadDiv = document.getElementById("keypad-div");
const displayDiv = document.getElementById("display-div");
const buttonDiv = document.getElementById("button-div");
const callDiv = document.getElementById("call-div");
const historyDiv = document.getElementById("history-div");
const historyContainer = document.getElementById("history-container");
const tabDiv = document.getElementById("tab-div");
const keypadTab = document.getElementById("keypad-button");
const historyTab = document.getElementById("history-button");

const callHistory = JSON.parse(localStorage.getItem("call-history")) || [];

const regexObj = {
  regex: /^1?\s*(?:\([0-9]{3}\)|[0-9]{3})[- ]?(?:[0-9]{3})[- ]?(?:[0-9]{4})$/,
}

const regexArr = Object.values(regexObj);

const testNumberInput = numberInput => regex => regex.test(numberInput);

const onCall = () => {
  const numberInput = userInputInvis.value = userInputInvis.value ? userInputInvis.value : userInput.textContent; 
  if (!numberInput) {
    alert("Please provide a phone number");
    return;
  }
  const isValid = regexArr.map(testNumberInput(numberInput)).some(Boolean);
  const outputStr = `US number: ${numberInput}`;

  displayDiv.style.display = "none";
  buttonDiv.style.display = "none";
  tabDiv.style.display = "none";
  callDiv.style.display = "flex";

  userInputInvis.value = "";
  userInput.textContent = "";
  resultsDiv.style.color = "honeydew";
  resultsDiv.textContent = "Calling ..."

  setTimeout(() => {
    if (isValid) {
      resultsDiv.innerHTML = `Valid ${outputStr}`;
    } else {
      resultsDiv.textContent = `Invalid ${outputStr}`;
    }

    resultsDiv.style.color = isValid ? "#CCCCFF" : "#FFCCCC"; 
    const callObj = {
      numberInput,
      isValid,
    }

    const goBackBtn = callDiv.appendChild(document.createElement("button"));
    goBackBtn.id = "back";
    goBackBtn.textContent = "Back";
    goBackBtn.addEventListener("click", returnFromCall);
    callHistory.unshift(callObj);
    localStorage.setItem("call-history", JSON.stringify(callHistory));
  }, 1000);
}

const onClear = () => {
  userInput.value = "";
  resultsDiv.textContent = "";
}

const displayKeypad = () => {
  displayDiv.style.display = "block";
  buttonDiv.style.display = "block";
  callDiv.style.display = "none";
  historyDiv.style.display = "none";
}

const displayHistory = () => {
  displayDiv.style.display = "none";
  buttonDiv.style.display = "none";
  callDiv.style.display = "none";
  historyDiv.style.display = "flex";

  historyContainer.innerHTML = "";
  callHistory.forEach(({numberInput, isValid}, i) => {
    
    historyContainer.innerHTML += `
      <div id="${i}-${numberInput}" style="display: grid; grid-auto-flow: column; grid-template-columns: 99fr 1fr 1fr; justify-content: center; align-items: center;">
        <p style="color: ${isValid ? "honeydew": "pink"}">${numberInput}</p>
        <p style="color: ${isValid ? "honeydew": "pink"}; margin-right: 10px;"><strong>${isValid ? "Valid" : "Invalid"}</strong></p>
        <button onclick='deleteHistory("${i}-${numberInput}")'>X</button>
      </div>
    `
  })
}


const onClickKeypadTab = () => {
  displayKeypad();
  keypadTab.classList.add("active-tab");
  historyTab.classList.remove("active-tab");
}

const onClickHistoryTab = () => {
  displayHistory();
  keypadTab.classList.remove("active-tab");
  historyTab.classList.add("active-tab");
}

const deleteHistory = (id) => {
  const callHistoryIndex = id.split("-")[0];
  callHistory.splice(callHistoryIndex, 1);
  if (callHistory.length >= 1) {
    localStorage.setItem("call-history", JSON.stringify(callHistory));
  } else {
    localStorage.clear("call-history");
  }
  displayHistory();
}

const clearHistory = () => {
  callHistory.splice(0);
  localStorage.clear("call-history");
  displayHistory();
}

const returnFromCall = () => {
  displayDiv.style.display = "block";
  buttonDiv.style.display = "block";
  callDiv.style.display = "none";
  tabDiv.style.display = "flex";
  callDiv.removeChild(document.getElementById("back"));
}

window.onload = () => {
  const validKeys = /[\d-()]/;
  body.addEventListener("keydown", (e) => {
    console.log(e.key);
      if (validKeys.test(e.key)) {
          userInput.textContent += e.key;
      } else if (e.key == "Space") {
        userInput.textContent += " ";
      } else if(e.key == "Backspace") {
          userInput.textContent = userInput.textContent.substring(0, userInput.textContent.length - 1);
      } else if(e.key == "Enter") {
        onCall();
      }
  })

  const inputKeys = Array.from(document.getElementsByClassName("input-buttons")).reduce((acc, el) => {
    acc.push(...el.children);
    return acc;
  }, []);
  inputKeys.forEach((button) => {
    
    button.addEventListener("click", (e) => {
      switch (e.target.textContent) {
        case "Space":
          userInput.innerHTML += '<span class="whitespace">&nbsp;</span>';
          break;
        default:
          userInput.innerHTML += e.target.textContent;
          break;
      }
    });
  })

  callDiv.style.display = "none";
  historyDiv.style.display = "none";
}