'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if (!req.body.hasOwnProperty("puzzle") || !req.body.hasOwnProperty("coordinate") || !req.body.hasOwnProperty("value")) {
        res.json({ error: "Required field(s) missing" });
      } else {
        const coordinate = req.body.coordinate;
        const value = req.body.value;
        const puzzleString = req.body.puzzle;
        if (!coordinate.match(/^[A-Ia-i][1-9]$/g)) {
          res.json({ error: "Invalid coordinate" });
        } else if (!value.match(/^[1-9]$/g)) {
          res.json({ error: "Invalid value" });
        } else if (!solver.validateLength(puzzleString)) {
          res.json({ error: "Expected puzzle to be 81 characters long" });
        } else if (!solver.validCharacters(puzzleString)) {
          res.json({ error: "Invalid characters in puzzle" });
        } else {
          const row = coordinate.charCodeAt(0) - "A".charCodeAt(0);
          const col = coordinate.charCodeAt(1) - "1".charCodeAt(0);
          if (puzzleString[row * 9 + col] !== '.') {
            res.json({ valid: puzzleString[row * 9 + col] === value});
          } else {
            const isRowValid = solver.checkRowPlacement(puzzleString, row, col, value);
            const isColValid = solver.checkColPlacement(puzzleString, row, col, value);
            const isRegionValid = solver.checkRegionPlacement(puzzleString, row, col, value);
            if (isRowValid && isColValid && isRegionValid) {
              res.json({
                valid: true,
              });
            } else {
              const conflictArr = [];
              if (!isRowValid) {
                conflictArr.push("row");
              }
              if (!isColValid) {
                conflictArr.push("column");
              }
              if (!isRegionValid) {
                conflictArr.push("region");
              }
              res.json({
                valid: false,
                conflict: conflictArr,
              });
            }
          }
        }
      }
  });
    
  app.route('/api/solve')
     .post((req, res) => {
      if (!req.body.hasOwnProperty("puzzle")) {
        res.json({ error: "Required field missing" });
      } else if (!solver.validateLength(req.body.puzzle)) {
        res.json({ error: "Expected puzzle to be 81 characters long" });
      } else if (!solver.validCharacters(req.body.puzzle)) {
        res.json({ error: "Invalid characters in puzzle" });
      } else {
        const result = solver.solvePuzzle(req.body.puzzle);
        if (result.pass) {
          res.json({ solution: result.solution });
        } else {
          res.json({ error: "Puzzle cannot be solved" });
        }
      }
    });
};
