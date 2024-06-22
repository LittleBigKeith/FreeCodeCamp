const changeEmotionBtn = document.getElementById("change-emotion");
const mouth = document.querySelector(".mouth");
const textInput = document.getElementById("text-input");
const result = document.getElementById("result");
const body = document.querySelector("body");

const becomeHappy = () =>{
    mouth.classList.remove("neutral");
    mouth.classList.remove("sad");
    mouth.classList.add("smile");
}

const becomeSad = () => {
    mouth.classList.remove("neutral");
    mouth.classList.remove("smile");
    mouth.classList.add("sad");
}

const changeEmotion = () => {
    if (mouth.classList.contains("smile")) {
        becomeSad();
    } else {
        becomeHappy();
    }
}

const resetEmotion = () => {
    mouth.classList.remove("smile");
    mouth.classList.remove("sad");
    mouth.classList.add("neutral");
}

const isEmptyString = (str) => {
    const noSpace = str.replace(/\s/, "");
    return !noSpace;
} 

const cleanString = (str) => {
    const regex = /[^\da-zA-Z]/g;
    return str.replace(regex, "").toLowerCase();
}

const checkPalindrome = () => {
    const input = textInput.value;
    const cleanedStr = cleanString(input);

    result.style.visibility = "visible";

    if (isEmptyString(cleanedStr)) {
        result.innerHTML = `${input} does not contain any alphanumerical characters!`;
        alert("Please input a value");
        return
    } 

    let isPalindrome = true;
    for (let i = 0; i < cleanedStr.length / 2; i++) {
        if (cleanedStr[i] !== cleanedStr[cleanedStr.length - i - 1]) {
            isPalindrome = false;
            break;
        }
    }
    if (isPalindrome) {
        result.innerHTML = `${input} is a palindrome.`;
        mouth.classList.remove("neutral");
        mouth.classList.remove("sad");
        mouth.classList.add("smile");
        body.style.animation = "green 1s forwards";
        result.style.color = "darkgreen";
    } else {
        result.innerHTML = `${input} is NOT a palindrome.`;
        mouth.classList.remove("neutral");
        mouth.classList.remove("smile");
        mouth.classList.add("sad");
        body.style.animation = "red 1s forwards";
        result.style.color = "#B00000";
    }
}

const resetPalindrome = () => {
    textInput.value = "";
    result.style.visibility = "hidden";
    mouth.classList.remove("smile");
    mouth.classList.remove("sad");
    mouth.classList.add("neutral");
    body.style.animation = "yellow 1s forwards";
}

textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      checkPalindrome();
    }
});