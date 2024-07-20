function ConvertHandler() {
  
  this.getNum = function(input) {
    const match = /[a-zA-Z]/.exec(input);
    const unitStart = match ? match.index : input.length;
    if (unitStart === 0) {
      return 1;
    }
    const fmatch = /\//.exec(input);
    const number = fmatch ? Number(input.substring(0, fmatch.index)) / Number(input.substring(fmatch.index + 1, unitStart)) : Number(input.substring(0, unitStart));
    return number;
  };
  
  this.getUnit = function(input) {
    const match = /[a-zA-Z]/.exec(input);
    const unitStart = match ? match.index : input.length;
    const unit = input.substring(unitStart);
    return unit.toUpperCase() === "L" ? "L" : unit.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit) {
      case "gal":
        return "L";
      case "L":
        return "gal";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      case "mi":
        return "km";
      case "km":
        return "mi";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    switch(unit) {
      case "gal":
        return "gallons";
      case "L":
        return "liters";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      default:
        return undefined;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    switch(initUnit) {
      case "gal":
        return Number((initNum * galToL).toFixed(5));
      case "L":
        return Number((initNum / galToL).toFixed(5));
      case "lbs":
        return Number((initNum * lbsToKg).toFixed(5));
      case "kg":
        return Number((initNum / lbsToKg).toFixed(5));
      case "mi":
        return Number((initNum * miToKm).toFixed(5));
      case "km":
        return Number((initNum / miToKm).toFixed(5));
      default:
        return undefined;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
