require('dotenv').config();
let bodyParser = require('body-parser');
const express = require('express');
const dns = require('dns');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

let urlLib = {};
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
        urlLibSorted = Object.keys(urlLib).sort((a, b) => b - a);
        next_index = urlLibSorted.length === 0 ? 1 : Number(urlLibSorted[0]) + 1;
        urlLib[next_index] = req.body.url;
        res.json({ 
          original_url: req.body.url,
          short_url: next_index,
        })
      }
    });
  }
);

app.get("/api/shorturl/:shorturl",
  function(req, res) {
    long_url = urlLib[req.params.shorturl];
    if(long_url) {
      res.redirect(long_url);
    }
  }
)

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
