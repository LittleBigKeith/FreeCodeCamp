const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const issue = require('../routes/issue');
chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suiteSetup(async () => {
      await issue.model.deleteMany({});
    })

    test('Create an issue with every field', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/issues/sudokusolver')
          .send({
            "issue_title": "Fix error in posting data",
            "issue_text": "When we post data it has an error.",
            "created_by": "Joe",
            "assigned_to": "Nic",
            "status_text": "In QA",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.issue_title, "Fix error in posting data");
            assert.equal(res.body.issue_text, "When we post data it has an error.");
            assert.equal(res.body.created_by, "Joe");
            assert.equal(res.body.assigned_to, "Nic");
            assert.equal(res.body.status_text, "In QA");
            assert.isTrue(res.body.open);
            assert.property(res.body, "_id", "issue should have _id");
            done();
          });
    });

    test('Create an issue with only required fields', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/issues/sudokusolver')
          .send({
            "issue_title": "Fix error in getting data",
            "issue_text": "When we get data it has an error.",
            "created_by": "Zac",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.issue_title, "Fix error in getting data");
            assert.equal(res.body.issue_text, "When we get data it has an error.");
            assert.equal(res.body.created_by, "Zac");
            assert.isEmpty(res.body.assigned_to);
            assert.isEmpty(res.body.status_text);
            assert.isTrue(res.body.open);
            assert.property(res.body, "_id", "issue should have _id");
            done();
          });
    });

    test('Create an issue with missing required fields', function (done) {
      chai
        .request(server)
        .keepOpen()
        .post('/api/issues/sudokusolver')
        .send({
          "assigned_to": "Nic",
          "status_text": "In QA",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.error, "required field(s) missing");
          done();
        });
    });

    test('View issues on a project', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/issues/sudokusolver')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.length, 2);
          assert.equal(res.body[0].issue_title, "Fix error in posting data");
          assert.equal(res.body[0].issue_text, "When we post data it has an error.");
          assert.equal(res.body[0].created_by, "Joe");
          assert.equal(res.body[0].assigned_to, "Nic");
          assert.equal(res.body[0].status_text, "In QA");
          assert.isTrue(res.body[0].open);
          assert.property(res.body[0], "_id", "issue should have _id");
  
          assert.equal(res.body[1].issue_title, "Fix error in getting data");
          assert.equal(res.body[1].issue_text, "When we get data it has an error.");
          assert.equal(res.body[1].created_by, "Zac");
          assert.isEmpty(res.body[1].assigned_to);
          assert.isEmpty(res.body[1].status_text);
          assert.isTrue(res.body[1].open);
          assert.property(res.body[1], "_id", "issue should have _id");
          done();
        });
    });

    test('View issues on a project with one filter', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/issues/sudokusolver?created_by=Joe')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.length, 1);
          assert.equal(res.body[0].issue_title, "Fix error in posting data");
          assert.equal(res.body[0].issue_text, "When we post data it has an error.");
          assert.equal(res.body[0].created_by, "Joe");
          assert.equal(res.body[0].assigned_to, "Nic");
          assert.equal(res.body[0].status_text, "In QA");
          assert.isTrue(res.body[0].open);
          assert.property(res.body[0], "_id", "issue should have _id");
          done();
        });
    });

    test('View issues on a project with multiple filters', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/issues/sudokusolver?issue_title=Fix+error+in+getting+data&issue_text=When+we+get+data+it+has+an+error.&created_by=Zac')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.length, 1);
          assert.equal(res.body[0].issue_title, "Fix error in getting data");
          assert.equal(res.body[0].issue_text, "When we get data it has an error.");
          assert.equal(res.body[0].created_by, "Zac");
          assert.isEmpty(res.body[0].assigned_to);
          assert.isEmpty(res.body[0].status_text);
          assert.isTrue(res.body[0].open);
          assert.property(res.body[0], "_id", "issue should have _id");
          done();
        });
    });

    test('Update one field on an issue', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/issues/sudokusolver')
        .end(function(err, res) {
          const id_1 = res.body[1]._id;
          chai
            .request(server)
            .keepOpen()
            .put('/api/issues/sudokusolver')
            .send({
              "assigned_to": "Jenn",
              "_id": id_1,
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type, "application/json");
              assert.equal(res.body.result, "successfully updated");
              assert.equal(res.body._id, id_1);
              done();
            });
        });
      });
  
    test('Update multiple fields on an issue', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/issues/sudokusolver')
        .end(function(err, res) {
          const id_1 = res.body[1]._id;
          chai
            .request(server)
            .keepOpen()
            .put('/api/issues/sudokusolver')
            .send({
              "issue_title": "Fix bug in row checking, remove column offset",
              "issue_text": "When checking rows columns should not be added.",
              "created_by": "Keith",
              "assigned_to": "Leo",
              "status_text": "In Testing",
              "_id": id_1,
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type, "application/json");
              assert.equal(res.body.result, "successfully updated");
              assert.equal(res.body._id, id_1);
              done();
            });
        });
      });

    test('Update an issue with missing _id', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/issues/sudokusolver')
        .end(function(err, res) {
          const id_1 = res.body[1]._id;
          chai
            .request(server)
            .keepOpen()
            .put('/api/issues/sudokusolver')
            .send({
              "issue_title": "This update does not have an _id",
              "issue_text": "It should fail",
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type, "application/json");
              assert.equal(res.body.error, "missing _id");
              done();
            });
        });
    });

    test('Update an issue with no fields to update', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/issues/sudokusolver')
        .end(function(err, res) {
          const id_0 = res.body[0]._id;
          chai
            .request(server)
            .keepOpen()
            .put('/api/issues/sudokusolver')
            .send({
              "_id": id_0,
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type, "application/json");
              assert.equal(res.body.error, "no update field(s) sent");
              assert.equal(res.body._id, id_0);
              done();
            });
        });
      });

    test('Update an issue with an invalid _id', function (done) {
      const mongoose = require('mongoose');
      const id_invalid = new mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
      chai
        .request(server)
        .keepOpen()
        .put('/api/issues/sudokusolver')
        .send({
          "issue_title": "This update does not have an valid _id",
          "issue_text": "It should fail",
          "_id": id_invalid,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.error, "could not update");
          assert.equal(res.body._id, id_invalid);
          done();
        });
    });

    test('Delete an issue', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/issues/sudokusolver')
        .end(function(err, res) {
          const id_0 = res.body[0]._id;
          chai
            .request(server)
            .keepOpen()
            .delete('/api/issues/sudokusolver')
            .send({
              "_id": id_0,
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type, "application/json");
              assert.equal(res.body.result, "successfully deleted");
              assert.equal(res.body._id, id_0);
              done();
            });
        });
      });

    test('Delete an issue with an invalid _id', function (done) {
      const mongoose = require('mongoose');
      const invalid_id = new mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
      chai
        .request(server)
        .keepOpen()
        .get('/api/issues/sudokusolver')
        .end(function(err, res) {
          const id_0 = res.body[0]._id;
          chai
            .request(server)
            .keepOpen()
            .delete('/api/issues/sudokusolver')
            .send({
              "_id": invalid_id,
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type, "application/json");
              assert.equal(res.body.error, "could not delete");
              assert.equal(res.body._id, invalid_id);
              done();
            });
        });
      });

    test('Delete an issue with missing _id', function (done) {
      chai
        .request(server)
        .keepOpen()
        .delete('/api/issues/sudokusolver')
        .send({
          random: "field",
          missing: "_id",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.error, "missing _id");
          done();
        });
    });
});
