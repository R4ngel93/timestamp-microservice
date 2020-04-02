var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

/* My stuff */
app.get('/api/timestamp/', (request, response) => {
  let date = new Date();
  response.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get('/api/timestamp/:date_string?', (request, response) => {
  let dateString = request.params.date_string;
  if (/\d{5}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    response.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
  }

  let dateObject = new Date(dateString);

  if (dateObject.toString() === "Invalid Date") {
    response.json({ error: dateObject.toString() });
  } else {
    response.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  }

});


// listen for requests :)
app.listen(3000, () => {
  console.log('server working...');
});