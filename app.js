const express = require('express'),
      app = express(),
      https =require('https'),
      fs = require('fs'),
      routes = require('./routes'),
      bodyParser    = require('body-parser'),
      compression = require("compression"),
      helmet = require('helmet');

app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/", routes);

let port = process.env.PORT || 3000;

https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase:'tipsyone'
}, app).listen(port, ()=>{
  console.log("server is up")
})