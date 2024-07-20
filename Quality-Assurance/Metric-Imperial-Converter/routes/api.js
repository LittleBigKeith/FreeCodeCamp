'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get( 
    (req, res) => {
      const initNum = convertHandler.getNum(req.query.input);
      const initUnit = convertHandler.getUnit(req.query.input);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      if (returnUnit && !isNaN(returnNum)) {
        res.json({
          initNum,
          initUnit,
          returnNum,
          returnUnit,
          string,
        });
      } else {
        if (!returnUnit && isNaN(initNum)) {
          res.send("invalid number and unit");
        } else if (!returnUnit){
          res.send("invalid unit");
        } else {
          res.send("invalid number");
        }
      }
    })
};
