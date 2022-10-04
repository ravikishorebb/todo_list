const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", { useNewUrlParser: true });

const app = express();

 let homeItems = ["Buy Food", "Cook Food", "Eat Food"];
 let workItems = ["Brush","Shower","Pack Lunch"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const itemsSchema = ({
  name: String
});

const Item = mongoose.model("item", itemsSchema);

const item1 = new Item({
  name: "welcome to you todolint!"
})

const item2 = new Item({
  name: "Hit the + button to add a new item."
})

const item3 = new Item({
  name: "<-- Hit this to delete an item."
})

const defaultItems = [item1, item2 , item3];

Item.insertMany(defaultItems, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Sucessfully saved default items to DB")
  }
})

app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){
      res.render("list", {listTitle: "Today", newListItems: foundItems });
  });


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
