const { text } = require('body-parser');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("read a whole number input", () => {
        assert.equal(convertHandler.getNum("42"), 42);
    });

    test("read a decimal number input", () => {
        assert.approximately(convertHandler.getNum("4.27159"), 4.27159, 0.00001);
    });

    test("read a fractional input", () => {
        assert.approximately(convertHandler.getNum("7 / 8"), 0.875, 0.001);
    });

    test("read a fractional input with a decimal", () => {
        assert.approximately(convertHandler.getNum("2.7 / 9.6"), 0.28125, 0.00001);
    });

    test("return an error on a double-fraction", () => {
        assert.isNaN(convertHandler.getNum("8/9/6"));
    });

    test("default to a numerical input of 1 when no numerical input is provided", () => {
        assert.equal(convertHandler.getNum(""), 1);
    });

    test("read each valid input unit", () => {
        assert.equal(convertHandler.getUnit("GAL"), "gal");
        assert.equal(convertHandler.getUnit("l"), "L");
        assert.equal(convertHandler.getUnit("MI"), "mi");
        assert.equal(convertHandler.getUnit("KM"), "km");
        assert.equal(convertHandler.getUnit("LBS"), "lbs");
        assert.equal(convertHandler.getUnit("KG"), "kg");
    });

    test("return an error for an invalid input unit", () => {
        assert.isUndefined(convertHandler.getReturnUnit(convertHandler.getUnit("joy")));
    });

    test("return the correct return unit for each valid input unit", () => {
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit("gal")), "L");
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit("L")), "gal");
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit("mi")), "km");
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit("km")), "mi");
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit("lbs")), "kg");
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit("kg")), "lbs");
    });

    test("return the spelled-out string unit for each valid input unit", () => {
        assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
        assert.equal(convertHandler.spellOutUnit("L"), "liters");
        assert.equal(convertHandler.spellOutUnit("mi"), "miles");
        assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
        assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
        assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    });

    test("correctly convert gal to L", () => {
        assert.approximately(convertHandler.convert("1", "gal"), 3.78541, 0.00001);
    });

    test("correctly convert L to gal", () => {
        assert.approximately(convertHandler.convert("3.78541", "L"), 1.00000, 0.00001);
    });

    test("correctly convert mi to km", () => {
        assert.approximately(convertHandler.convert("1", "mi"), 1.60934, 0.00001);
    });

    test("correctly convert km to mi", () => {
        assert.approximately(convertHandler.convert("1.60934", "km"), 1.00000, 0.00001);
    });

    test("correctly convert lbs to kg", () => {
        assert.approximately(convertHandler.convert("1", "lbs"), 0.453592, 0.00001);
    });

    test("correctly convert kg to lbs", () => {
        assert.approximately(convertHandler.convert("0.453592", "kg"), 1.000000, 0.00001);
    });
});