const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

/* Start Endpoints */

app.get("/grade", (req, res) => {
  // get the mark from the query
  const { mark } = req.query;

  // do some validation
  if (!mark) {
    // mark is required
    return res.status(400).send("Please provide a mark");
  }

  const numericMark = parseFloat(mark);
  if (Number.isNaN(numericMark)) {
    // mark must be a number
    return res.status(400).send("Mark must be a numeric value");
  }

  if (numericMark < 0 || numericMark > 100) {
    // mark must be in range 0 to 100
    return res.status(400).send("Mark must be in range 0 to 100");
  }

  if (numericMark >= 90) {
    return res.send("A");
  }

  if (numericMark >= 80) {
    return res.send("B");
  }

  if (numericMark >= 70) {
    return res.send("C");
  }

  res.send("F");
});

/* End points below are saved for later*/

app.get("/colors", (req, res) => {
  const colors = [
    {
      name: "red",
      rgb: "FF0000"
    },
    {
      name: "green",
      rgb: "00FF00"
    },
    {
      name: "blue",
      rgb: "0000FF"
    }
  ];
  res.json(colors);
});

app.get("/video", (req, res) => {
  const video = {
    title: "Cats falling over",
    description: "15 minutes of hilarious fun as cats fall over",
    length: "15.40"
  };
  res.json(video);
});

app.get("/hello", (req, res) => {
  res.status(204);
});

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
  `;
  res.send(responseText);
});

app.get("/queryViewer", (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
