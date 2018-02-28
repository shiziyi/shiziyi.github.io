
var express = require("express");
var app = express();
var path = require("path");

var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.static(__dirname + '/images'));
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname + "/home.html"));
    //functions.myMap();
});

app.get("/myProgram", (req, res) => {
    res.redirect('https://github.com/Jasper-Shi');
})


app.get("/workHistory", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/workHistory.html"));
})

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/contact.html"));
})

app.listen(HTTP_PORT, () =>{
    console.log("Server listening on: " + HTTP_PORT);
});
