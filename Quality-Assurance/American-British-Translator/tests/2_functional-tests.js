const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test('Translation with text and locale fields', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/translate')
          .send({
            text: "I ate yogurt for breakfast.",
            locale: "american-to-british",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.text, "I ate yogurt for breakfast.");
            assert.equal(res.body.translation, `I ate <span class="highlight">yoghurt</span> for breakfast.`);
            done();
          });
    });

    test('Translation with text and invalid locale field', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/translate')
          .send({
            text: "I ate yogurt for breakfast.",
            locale: "british-to-spanish",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.error, "Invalid value for locale field");
            done();
          });
    });

    test('Translation with text and missing text field', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/translate')
          .send({

            locale: "british-to-american",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.error, "Required field(s) missing");
            done();
          });
    });

    test('Translation with text and missing locale field', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/translate')
          .send({
            text: "Paracetamol takes up to an hour to work."
            
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.error, "Required field(s) missing");
            done();
          });
    });

    test('Translation with empty text', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/translate')
          .send({
            text: "",
            locale: "american-to-british",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.error, "No text to translate");
            done();
          });
    });

    test('Translation with text that needs no translation', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/translate')
          .send({
            text: "This text is perfectly fine with absolutely nothing to translate",
            locale: "american-to-british",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.text, "This text is perfectly fine with absolutely nothing to translate");
            assert.equal(res.body.translation, "Everything looks good to me!");
            done();
          });
    });
});
