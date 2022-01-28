const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res){
    
    let today = new Date();
    let currentDay = today.getDay();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);
    
    res.render("lists", {listTitle : day, newListItems : items})
})

app.post("/", function(req, res){
    let item = req.body.newitem;

    if(req.body.list === "Work Lists"){
        workItems.push(item);
        res.redirect("/work")
    }else{
        items.push(item);
            
        res.redirect("/");
    }

})

app.get("/work", function(req, res){
    res.render("lists", {listTitle : "Work Lists", newListItems : workItems});
})

app.get("/about", function(req, res){
    res.render("about");
})


app.listen("3000", function(){
    console.log("App.js is running on port 3000.");
})