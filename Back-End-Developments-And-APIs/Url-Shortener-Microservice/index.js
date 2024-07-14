require('dotenv').config();
let bodyParser = require('body-parser');
const express = require('express');
const dns = require('dns');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {});

const urlSchema = new mongoose.Schema({
  long: {
    type: String,
    required: true
  },
  short: Number,
});

const Url = mongoose.model('Url', urlSchema);

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', 
  function(req, res, next) {
    req.domain = new URL(req.body.url).hostname
    next();
  },
  function(req, res) {
    dns.lookup(req.domain, (err, addresses, family) => {
      if (err) {
          console.log(err)
          res.json({ error : "invalid url" });
      } else {
        Url.find({}).sort({ _id: -1 }).limit(1)
           .then((lastUrl) => {
            console.log("Last Url", lastUrl)
            const next_index = lastUrl.length === 1 ? Number(lastUrl[0].short) + 1 : 1
            Url.create({
              long: req.body.url,
              short: next_index
            }).then (() =>
              res.json({ 
                original_url: req.body.url,
                short_url: next_index,
              })
            )
           })
           .catch(
            err => console.log(err)
           )
      }
    });
  }
);

app.get("/api/shorturl/:shorturl",
  function(req, res) {
    Url.findOne({short: req.params.shorturl})
       .then((url) =>
          res.redirect(url.long)
       )
  }
)

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
