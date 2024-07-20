const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    test('Solve a puzzle with valid puzzle string', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/solve')
          .send({
               puzzle: "..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815....."
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.solution, '618423975253897146974651382136245897729186534845739621597364218462918753381572469');
            done();
          });
      });

    test('Solve a puzzle with missing puzzle string', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({
            
            })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.error, "Required field missing");
            done();
            });
    });

    test('Solve a puzzle with invalid characters', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({
                puzzle: "..8...97.253..7.......5ABCDEFGH45...7.9..6.3....7...21.....4..8..2.1.....815....."
            })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.error, "Invalid characters in puzzle");
            done();
        });
    });

    test('Solve a puzzle with incorrect length', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({
                puzzle: "..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815...."
            })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
            done();
        });
    });

    test('Solve a puzzle that cannot be solved', function (done) {
    chai
        .request(server)
        .keepOpen()
        .post('/api/solve')
        .send({
            puzzle: "..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815....2"
        })
        .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(res.body.error, "Puzzle cannot be solved");
        done();
        });
    });

    test('Check a puzzle placement with all fields', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                coordinate: "H6",
                value: "3",
                puzzle: "..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815....2",
            })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.isTrue(res.body.valid);
            done();
        });
    });

    test('Check a puzzle placement with single placement conflict', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                coordinate: "A9",
                value: "1",
                puzzle: "..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815....2",
            })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.conflict.length, 1);
            assert.include(res.body.conflict, "column");
            done();
        });
    });

    test('Check a puzzle placement with multiple placement conflicts', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                coordinate: "B9",
                value: "7",
                puzzle: "..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815....2",
            })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.conflict.length, 2);
            assert.include(res.body.conflict, "row");
            assert.include(res.body.conflict, "region");
            done();
        });
    });

    test('Check a puzzle placement with all placement conflicts', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                coordinate: "G3",
                value: "8",
                puzzle: "..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815....2",
            })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.conflict.length, 3);
            assert.include(res.body.conflict, "row");
            assert.include(res.body.conflict, "column");
            assert.include(res.body.conflict, "region");
            done();
        });
    });

    test('Check a puzzle placement with missing required fields', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                coordinate: "A9",
            })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.error, "Required field(s) missing");
            done();
        });
    });

    test('Check a puzzle placement with invalid characters', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                coordinate: "A1",
                value: "1",
                puzzle: "..8...97.253..7.......5ABCDEFGH45...7.9..6.3....7...21.....4..8..2.1.....815....."
            })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.error, "Invalid characters in puzzle");
            done();
        });
    });

    test('Check a puzzle placement with incorrect length', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                coordinate: "A1",
                value: "1",
                puzzle: "..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815...."
            })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
            done();
        });
    });

    test('Check a puzzle placement with invalid placement coordinate', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                coordinate: "J2",
                value: "1",
                puzzle: "..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815....."
            })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.error, "Invalid coordinate");
            done();
        });
    });

    test('Check a puzzle placement with invalid placement value', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                coordinate: "A7",
                value: "0",
                puzzle: "..8...97.253..7.......5........45...7.9..6.3....7...21.....4..8..2.1.....815....."
            })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.error, "Invalid value");
            done();
        });
    });
});

