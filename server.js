// Setup empty JS object to act as endpoint for all routes
projectData = {
  history: [],
};

// Require Express to run server and routes
const express = require("express");
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
const cors = require("cors");

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.static("website"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

app.get("/api/object", (req, res) => {
  res.status(200).json(projectData);
});

app.post("/api/weather", (req, res) => {
  const dataObj = req.body;
  if (!dataObj) throw Error("No Object Value");

  // [#] Add dataObj In History Array
  projectData.history.push(dataObj);

  // [#] Save The dataObj In projectData Obj
  projectData.dataObj = dataObj;

  // [#] Send To Ok as A response
  res.status(201).send("OK");
});

// Start up an instance of app
app.listen(5000, () => {
  console.log("Start Listening On Port 5000");
});
