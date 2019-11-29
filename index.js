// server /app/index all are same
const express = require("express");
const path = require("path");
const logger = require("./middleware/middleware");
const members = require("./Members");

// template engine with express-handlebars
const exphbs = require("express-handlebars");

const app = express();

// normal rout/get request
/*
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
*/

// 24 mins: rest json api gets that all members
// 24 min : middlewares are functions that has acces to our req, res
// and can  add and change things when making req,res
app.get("/members", (req, res) => {
  res.json(members);
});

// init logger mddleware
// app.use(logger);

// bodyparser midllewarenew version

app.use(express.json()); //allow us to handle raw json
app.use(express.urlencoded({ extended: false })); // handles form submision

// require members api our routes
app.use("/members", require("./routes/api/members"));

/*
set static  is not the reason we use for express
express is used either when you serving json api data for
frontend framework or you want render template engines
so you can insert dynamic data and build dynamic app

*/
/*
// app.use(express.static(path.join(__dirname, "public")));
we comment out the static b/c express is like css , 
it shows the first app.use as display

-passport.js authentication is used for express server only
-jwt authenticaion is used when you have react /vue as front end
*/
// ================template engines 101 mins==========

// handlebar middleware main=is folder tha we going to display
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// render index.handlebars
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member app",
    members
  })
);

// =========template engines HANDLEBARS END===========
// listen port
// process enviroment, when we deploy the app it runs port number
// in enviroment virables
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is runing on Port ${PORT}`));
