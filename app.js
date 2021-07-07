const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const path = require("path");
const session = require("express-session");


const app = express();

//passport config
require('./config/passport')(passport);

const port = process.env.PORT || 1356;
const db = require("./config/mongodb");

const static_path = path.join(__dirname, "./public/css");
app.use(express.static(static_path));

//ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

//bodyparser
app.use(express.urlencoded({extended: false}));

//express session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  }));
  
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use("/", require("./routes/index"));
app.use("/", require("./routes/User"));

app.listen(port, () => {
        console.log(`server running at port ${port}`)
})