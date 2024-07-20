'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
        if (!req.body.hasOwnProperty("text") || !req.body.hasOwnProperty("locale")) {
          res.json({ error: "Required field(s) missing" })
        } else if (req.body.text.length === 0) {
          res.json({ error: "No text to translate"})
        } else if (req.body.locale !== "american-to-british" && req.body.locale !== "british-to-american") {
          res.json({ error: "Invalid value for locale field"})
        } else {
          var translation = translator.translate(req.body)
          if (req.body.text === translation) {
            translation = "Everything looks good to me!"
          }
          res.json({
            text: req.body.text,
            translation,
          })
        }
    });
};
