// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const e = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api", (req, res) => {
  res.json({
    unix: Date.now(),
    utc: new Date().toUTCString()
  })
})

app.get("/api/:timestamp", (req, res) => {
  utc_timestamp = Number(isNaN(Number(req.params.timestamp)) ? Date.parse(req.params.timestamp) : req.params.timestamp);
  if (utc_timestamp) {
    res.json({
      unix: utc_timestamp,
      utc: new Date(utc_timestamp).toUTCString()
    });
  } else {
    res.json({
      error: "Invalid Date"
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
