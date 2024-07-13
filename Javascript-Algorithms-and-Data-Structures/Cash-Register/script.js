let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

let price = 0;
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
const changeRemaining = document.getElementById("change-remaining");
const maxCash = document.getElementById("max-cash");

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
  if (!cashDiv.value || isNaN(cashValue)) {
    alert("Please input a valid cash value.");
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
  let cid_update = [];
  let changeArr = [];
  for (let change of cid.slice(0).reverse()) {
    const thisChange = parseFloat(Math.min(Math.floor(changeValue / values[change[0]]) * values[change[0]], change[1])).toFixed(2);
    changeValue = parseFloat(changeValue - thisChange).toFixed(2);
    cid_update.unshift(thisChange);
    if (thisChange > 0) {
      changeArr.push(`${change[0]}: $${thisChange}`);
    }
  }
  if (parseFloat(changeValue) > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    changeDiv.textContent = "N/A";
    return;
  }
  for (let i = 0; i < cid.length; i++) {
    cid[i][1] -= cid_update[i];
  }
  if (totalChangeAvailable.toFixed(2) === parseFloat(cashValue - price).toFixed(2)) {
    changeDue.innerHTML = `<p>Status: CLOSED</p> <p>${changeArr.join("</p> <p>")}</p>`
    changeDiv.textContent = parseFloat(cashValue - price).toFixed(2);
  } else {
    changeDue.innerHTML = `<p>Status: OPEN</p> <p>${changeArr.join("</p> <p>")}</p>`
    changeDiv.textContent = parseFloat(cashValue - price).toFixed(2);
  };
  countTill();
  update_total_change();
  update_max_cash();
}

const displayInt = (amountField, quantityField, label) => {
  amountField.textContent = `$${Math.round(cid.find(element => element[0] === label)[1])}`;
  quantityField.textContent = Math.round(cid.find(element => element[0] === label)[1] / values[label]);
}

const displayFloat = (amountField, quantityField, label) => {
  amountField.textContent = `$${Math.abs(parseFloat(cid.find(element => element[0] === label)[1]).toFixed(2))}`;
  quantityField.textContent = Math.round(cid.find(element => element[0] === label)[1] / values[label]);
}

const countTill = () => {
  displayInt(hundredAmount, hundredQuantity, "ONE HUNDRED");
  displayInt(twentyAmount, twentyQuantity, "TWENTY");
  displayInt(tenAmount, tenQuantity, "TEN");
  displayInt(fiveAmount, fiveQuantity, "FIVE");
  displayInt(oneAmount, oneQuantity, "ONE");
  
  displayFloat(quarterAmount, quarterQuantity, "QUARTER");
  displayFloat(nickelAmount, nickelQuantity, "NICKEL");
  displayFloat(dimeAmount, dimeQuantity, "DIME");
  displayFloat(pennyAmount, pennyQuantity, "PENNY");
}

const calculate_total_change = () => {
  return cid.reduce((acc, el) => acc + el[1], 0)
}

const calculate_max_cash = () => {
  return parseFloat(calculate_total_change()) + parseFloat(price);
}

const update_total_change = () => {
  changeRemaining.textContent = `$${calculate_total_change().toFixed(2)}`;
}

const update_max_cash = () => {
  maxCash.textContent = `$${calculate_max_cash().toFixed(2)}`;
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
  countTill();
  priceDiv.value = price;
  priceDiv.addEventListener("keyup", () => {
    price = parseFloat(priceDiv.value) || 0;
    console.log(price);
    update_max_cash();
  });
  update_total_change();
  update_max_cash();
}