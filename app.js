const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let homeItems = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = ["Brush","Shower","Pack Lunch"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  let day = date.getDay();
  res.render("list", {listTitle: day, newListItems: homeItems });
}); //get


app.post("/", function(req, res){
  let item = req.body.newItem;

  if (req.body.list === "Work"){
    workItems.push(item);
    console.log("in home post method if: " + item);
    res.redirect("/work");
  } else{
    homeItems.push(item);
    console.log("in home post method else: " + item);
    res.redirect("/");
  }
})

app.get("/work", function(req, res){
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  })
})

app.post("/work", function(req, res){
  var item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about", function(req, res){
  res.render("about");

});

app.listen(3000, function() {
  console.log("To Do List listening on port 3000");
});
