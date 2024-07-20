const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
    test("Logic handles a valid puzzle string of 81 characters", () => {
        assert.isOk(solver.validateLength("..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815....."));
        assert.isOk(solver.validCharacters("..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815....."));
    });

    test("Logic handles a puzzle string with invalid characters", () => {
        assert.isNotOk(solver.validCharacters("..8...97.253..7.......5....X...45...7.9..6.3....7...21.....4..8..2.1.....815...."));
    });

    test("Logic handles a puzzle string that is not 81 characters in length", () => {
        assert.isNotOk(solver.validateLength("..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815.....9"));
    });

    test("Logic handles a valid row placement", () => {
        assert.isOk(solver.checkRowPlacement("..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815.....", 4, 4, "1"));
    });

    test("Logic handles an invalid row placement", () => {
        assert.isNotOk(solver.checkRowPlacement("..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815.....", 3, 1, "4"));
    });

    test("Logic handles a valid column placement", () => {
        assert.isOk(solver.checkColPlacement("..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815.....", 4, 4, "9"));
    });

    test("Logic handles an invalid column placement", () => {
        assert.isNotOk(solver.checkColPlacement("..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815.....", 3, 1, "8"));
    });

    test("Logic handles a valid region (3x3 grid) placement", () => {
        assert.isOk(solver.checkRegionPlacement("..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815.....", 7, 8, "1"));
    });

    test("Logic handles an invalid region (3x3 grid) placement", () => {
        assert.isNotOk(solver.checkRegionPlacement("..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815.....", 3, 7, "1"))
    });

    test("Valid puzzle strings pass the solver", () => {
        assert.isTrue(solver.solvePuzzle("..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815.....").pass);
    });

    test("Invalid puzzle strings fail the solver", () => {
        assert.isFalse(solver.solvePuzzle("..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815....2").pass);
    });

    test("Solver returns the expected solution for an incomplete puzzle", () => {
        assert.equal(solver.solvePuzzle("..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815.....").solution, "618423975253897146974651382136245897729186534845739621597364218462918753381572469");
    });
});
