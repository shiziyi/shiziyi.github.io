const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const HTTP_PORT = process.env.PORT || 8080;
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "home.html"));
    // res.send("World");
});

app.listen(HTTP_PORT, ()=>{
    console.log("Now server is listening on: " + HTTP_PORT);
});
