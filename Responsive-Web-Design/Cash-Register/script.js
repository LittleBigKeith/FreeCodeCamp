let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

const price = 8.52;
let values= {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.10,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100,
}

const cashDiv = document.getElementById("cash");
const priceDiv = document.getElementById("price");
const changeDiv = document.getElementById("change");
const changeDue = document.getElementById("change-due");

const hundredQuantity = document.getElementById("hundred-quantity");
const hundredAmount = document.getElementById("hundred-amount");
const twentyQuantity = document.getElementById("twenty-quantity");
const twentyAmount = document.getElementById("twenty-amount");
const tenQuantity = document.getElementById("ten-quantity");
const tenAmount = document.getElementById("ten-amount");
const fiveQuantity = document.getElementById("five-quantity");
const fiveAmount = document.getElementById("five-amount");
const oneQuantity = document.getElementById("one-quantity");
const oneAmount = document.getElementById("one-amount");
const quarterQuantity = document.getElementById("quarter-quantity");
const quarterAmount = document.getElementById("quarter-amount");
const nickelQuantity = document.getElementById("nickel-quantity");
const nickelAmount = document.getElementById("nickel-amount");
const dimeQuantity = document.getElementById("dime-quantity");
const dimeAmount = document.getElementById("dime-amount");
const pennyQuantity = document.getElementById("penny-quantity");
const pennyAmount = document.getElementById("penny-amount");

const purchase = () => {
  const cashValue = Number(cashDiv.value);
  if (isNaN(cashValue)) {
    alert("Please input a valid number.");
    return;
  }
  if (price > cashValue) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  if (price === cashValue) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }
  const totalChangeAvailable = parseFloat(cid.reduce((acc, el) => acc + el[1], 0));
  let changeValue = parseFloat(cashValue - price);
  if (changeValue > totalChangeAvailable + 0.005) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    changeDiv.textContent = "N/A";
    return;
  }

  let changeArr = [];
  let i = 1;
  for (let change of cid.slice(0).reverse()) {
    const thisChange = parseFloat(Math.min(Math.floor(changeValue / values[change[0]]) * values[change[0]], change[1])).toFixed(2);
    changeValue = parseFloat(changeValue - thisChange).toFixed(2);
    if (thisChange > 0) {
      cid[cid.length - i][1] = parseFloat(cid[cid.length - i][1] - thisChange);
      changeArr.push(`${change[0]}: $${thisChange}`);
    }
    i += 1;
  }
  if (totalChangeAvailable.toFixed(2) === parseFloat(cashValue - price).toFixed(2)) {
    changeDue.innerHTML = `<p>Status: CLOSED</p> <p>${changeArr.join("</p> <p>")}</p>`
    changeDiv.textContent = parseFloat(cashValue - price).toFixed(2);
  } else {
    changeDue.innerHTML = `<p>Status: OPEN</p> <p>${changeArr.join("</p> <p>")}</p>`
    changeDiv.textContent = parseFloat(cashValue - price).toFixed(2);
  };

  countTill();
}

const countTill = () => {
  hundredAmount.textContent = Math.round(cid.find(element => element[0] === "ONE HUNDRED")[1]);
  hundredQuantity.textContent = Math.round(cid.find(element => element[0] === "ONE HUNDRED")[1] / values["ONE HUNDRED"]);
  twentyAmount.textContent = Math.round(cid.find(element => element[0] === "TWENTY")[1]);
  twentyQuantity.textContent = Math.round(cid.find(element => element[0] === "TWENTY")[1] / values["TWENTY"]);
  tenAmount.textContent = Math.round(cid.find(element => element[0] === "TEN")[1]);
  tenQuantity.textContent = Math.round(cid.find(element => element[0] === "TEN")[1] / values["TEN"]);
  fiveAmount.textContent = Math.round(cid.find(element => element[0] === "FIVE")[1]);
  fiveQuantity.textContent = Math.round(cid.find(element => element[0] === "FIVE")[1] / values["FIVE"]);
  oneAmount.textContent = Math.round(cid.find(element => element[0] === "ONE")[1]);
  oneQuantity.textContent = Math.round(cid.find(element => element[0] === "ONE")[1] / values["ONE"]);
  quarterAmount.textContent = Math.abs(parseFloat(cid.find(element => element[0] === "QUARTER")[1]).toFixed(2));
  quarterQuantity.textContent = Math.round(cid.find(element => element[0] === "QUARTER")[1] / values["QUARTER"]);
  nickelAmount.textContent = Math.abs(parseFloat(cid.find(element => element[0] === "NICKEL")[1]).toFixed(2));
  nickelQuantity.textContent = Math.round(cid.find(element => element[0] === "NICKEL")[1] / values["NICKEL"]);
  dimeAmount.textContent = Math.abs(parseFloat(cid.find(element => element[0] === "DIME")[1]).toFixed(2));
  dimeQuantity.textContent = Math.round(cid.find(element => element[0] === "DIME")[1] / values["DIME"]);
  pennyAmount.textContent = Math.abs(parseFloat(cid.find(element => element[0] === "PENNY")[1]).toFixed(2));
  pennyQuantity.textContent = Math.round(cid.find(element => element[0] === "PENNY")[1] / values["PENNY"]);
}

const _money = [
  ['ONE HUNDRED', 10000],
  ['TWENTY', 2000],
  ['TEN', 1000],
  ['FIVE', 500],
  ['ONE', 100],
  ['QUARTER', 25],
  ['DIME', 10],
  ['NICKEL', 5]
];
const _denomRegexes = [
  /PENNY/,
  /NICKEL/,
  /DIME/,
  /QUARTER/,
  /ONE [^H]/,
  /FIVE/,
  /TEN/,
  /TWENTY/,
  /ONE HUNDRED/
];
function _randomNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}

window.onload = () => {
  priceDiv.textContent = price;
  countTill();
}