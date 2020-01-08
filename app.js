const express = require('express'),
      app = express(),
      routes = require('./routes'),
      bodyParser    = require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));


app.use('/js', express.static(__dirname + '/js'));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/", routes);

let port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log("server is up")
})