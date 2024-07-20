class SudokuSolver {

  validateLength(puzzleString) {
    return puzzleString.length === 81;
  }

  validCharacters(puzzleString) {
    return puzzleString.match(/^[1-9\.]+$/g);
  }

  checkRowPlacement(puzzleString, row, column, value) {
    return !puzzleString.substring(row * 9, (row + 1) * 9).split("").includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    return !puzzleString.split("").filter((squareValue, i) => i % 9 === column).includes(value.toString());
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    return !puzzleString.split("").filter((squareValue, i) => Math.floor(row / 3) === Math.floor(i / 27) && Math.floor(column / 3) === Math.floor((i % 9) / 3)).includes(value);
  }

  isAllValid(puzzleString, row, column, value) {
    return this.checkRowPlacement(puzzleString, row, column, value) &&
           this.checkColPlacement(puzzleString, row, column, value) &&
           this.checkRegionPlacement(puzzleString, row, column, value);
  }

  solve(puzzleString) {
    const firstEmpty = puzzleString.split("").indexOf(".");
    if (firstEmpty === -1 ) {
      return puzzleString;
    }
    const row = Math.floor(firstEmpty / 9);
    const col = firstEmpty % 9;
    var attempt = 1;
    while (attempt <= 9) {
      if (this.isAllValid(puzzleString, row, col, attempt.toString())) {
        const solvedPuzzle = this.solve(puzzleString.replace(/\./, attempt.toString()));
        if (solvedPuzzle.split("").indexOf(".") === -1 ) {
          puzzleString = solvedPuzzle;
        }
      }
      attempt++;
    }
    return puzzleString;
  }

  solvePuzzle(puzzleString) {
    const solvedPuzzle = this.solve(puzzleString);
    if (solvedPuzzle.split("").indexOf(".") === -1 ) {
      return {
        pass: true,
        solution: solvedPuzzle,
      }
    } else {
      return {
        pass: false,
      }
    }
  }
}

module.exports = SudokuSolver;

