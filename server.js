// Require Express to run server and routes
const express = require("express");

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8888;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// post route
app.post("/postData", addData);
function addData(req, res) {
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.feel = req.body.content;
}
//get route
app.get("/getData", getData);
function getData(req, res) {
  res.send(projectData);
}
