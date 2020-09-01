// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

// ############################## global values ##############################

const items = ["1 hour of coding", "solve algo", "Excerise"];
const workItems = [];

// ############################## setting up frameworks ##############################

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

// ############################## Home route ##############################

app.get("/", function(req, res) {
  // 👉
  const day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {

  const item = req.body.newItem;

  // 👉
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
  //
});

// ##############################work route ##############################

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.post("/work", function(req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

// ##############################about route ##############################
app.get("/about", function(req, res) {
  res.render("about");
});

// ##############################port setting ##############################

app.listen(3000, function() {
  console.log("listening for TODOLIST app in port 3000");
});
