const HTTP_PORT = 8080;
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const app = express();
var dataServiceComments = require("./js/data-service-comments.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: 'layout',
    helpers: {
    equal: function (lvalue, rvalue, options) {
    if (arguments.length < 3)
    throw new Error("Handlebars Helper equal needs 2 parameters");
    if (lvalue != rvalue) {
    return options.inverse(this);
    } else {
    return options.fn(this);
    }
    },
    inc: function(value, options)
    {
        return parseInt(value) + 1;
    }
    }
   }));
app.set("view engine", ".hbs");

dataServiceComments.initialize();
app.get("/about", function(req,res){
    //res.sendFile(path.join(__dirname + "/views/about.html"));
    dataServiceComments.getAllComments().then((data) => {
        res.render("about", {data: data});
    }).catch(() => {
        res.render("about");
    })
});
app.post("/about/addComment", (req, res) => {
    dataServiceComments.addComment(req.body).then(() =>{
        res.redirect("/about");
    }).catch((err) => {
        console.log(err);
        res.redirect("/about");
    })
});

app.post("/about/addReply", (req, res) => {
    dataServiceComments.addReply(req.body).then(() => {
        res.redirect("/about");
    }).catch((err) => {
        console.log(err);
        res.redirect("/about");
    })
});

app.listen(HTTP_PORT, ()=>{
    console.log("Now server is listening on: " + HTTP_PORT);
});