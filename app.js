const express = require('express'),
      app = express(),
      routes = require('./routes'),
      bodyParser    = require('body-parser'),
      compression = require("compression");

app.use(compression());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/", routes);

let port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log("server is up")
})