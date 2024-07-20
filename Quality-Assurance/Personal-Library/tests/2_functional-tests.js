/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const book = require("../routes/book");

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suiteSetup(async () => {
    await book.model.deleteMany({});
    await book.model.create({
      title: "Little Red Riding Hood",
    })
  })

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .send({
            title: "The Ugly Duckling",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.title, "The Ugly Duckling");
            assert.property(res.body, "_id", "Book should contain _id");
            done();
          });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .send({
            
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "text/html");
            assert.equal(res.text, "missing required field title");
            done();
          });
      });
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai
          .request(server)
          .keepOpen()
          .get('/api/books')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, "response should be an array");
            assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');
            done();
          });
      });   
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        const mongoose = require('mongoose');
        const id_invalid = new mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
        chai
          .request(server)
          .keepOpen()
          .get(`/api/books/${id_invalid}`)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "text/html");
            assert.equal(res.text, "no book exists");
            done();
          });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai
          .request(server)
          .keepOpen()
          .get(`/api/books`)
          .end(function (err, res) {
            const book_0 = res.body[0];
            chai
              .request(server)
              .keepOpen()
              .get(`/api/books/${book_0._id}`)
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body._id, book_0._id);
                assert.equal(res.body.title, book_0.title);
                assert.property(res.body, "comments");
                done();
              });
          });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){

      suiteSetup(async () => {
        await book.model.deleteMany({});
        await book.model.create({
          title: "Little Red Riding Hood",
        })
      })

      test('Test POST /api/books/[id] with comment', function(done){
        chai
          .request(server)
          .keepOpen()
          .get(`/api/books`)
          .end(function (err, res) {
            const book_0 = res.body[0];
            chai
              .request(server)
              .keepOpen()
              .post(`/api/books/${book_0._id}`)
              .send({
                comment: "best book of the decade",
              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body._id, book_0._id);
                assert.equal(res.body.title, book_0.title);
                assert.property(res.body, "comments");
                done();
              });
          });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai
          .request(server)
          .keepOpen()
          .get(`/api/books`)
          .end(function (err, res) {
            const book_0 = res.body[0];
            chai
              .request(server)
              .keepOpen()
              .post(`/api/books/${book_0._id}`)
              .send({

              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.type, "text/html");
                assert.equal(res.text, "missing required field comment");
                done();
              });
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        const mongoose = require('mongoose');
        const id_invalid = new mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
        chai
          .request(server)
          .keepOpen()
          .post(`/api/books/${id_invalid}`)
          .send({
            comment: "does not have the best ending",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "text/html");
            assert.equal(res.text, "no book exists");
            done();
          });
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai
          .request(server)
          .keepOpen()
          .get(`/api/books`)
          .end(function (err, res) {
            const book_0 = res.body[0];
            chai
              .request(server)
              .keepOpen()
              .delete(`/api/books/${book_0._id}`)
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.type, "text/html");
                assert.equal(res.text, "delete successful");
                done();
              });
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        const mongoose = require('mongoose');
        const id_invalid = new mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
        chai
          .request(server)
          .keepOpen()
          .delete(`/api/books/${id_invalid}`)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "text/html");
            assert.equal(res.text, "no book exists");
            done();
          });
      });

    });

  });

});
