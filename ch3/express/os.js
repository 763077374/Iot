var os = require("os");
var express = require("express");
var app = express();

/*
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
*/

app.get('/', function(req, res) {
   var hostname = os.hostname();
   var freemem = Math.ceil(os.freemem() / 1024 / 1024) + "MB";
   
   res.jsonp({host: hostname, mem:freemem});
});

app.listen(5438, function(req, res) {
  console.log("网站服务器在5438端口开工了！");
});