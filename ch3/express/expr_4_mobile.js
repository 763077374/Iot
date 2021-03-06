var express = require("express");
var app = express();

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/', function(req, res) {
  res.end("<h1>你好！</h1>");
});

app.get('/sw/:pin', function(req, res) {
  //res.send('收到的脚位编号：' + req.params.pin);
  res.json({"pin": req.params.pin});
  console.log("pin: " + req.params.pin);
});

app.get('/arduino/:pin/:val?', function(req, res) {
  var html = "脚位：" + req.params.pin + "<br>" +
             "状态：" + req.params.val;
  //res.send(html);
  res.json({"pin": req.params.pin, "val":req.params.val});
});

app.listen(5438, function(req, res) {
  console.log("网站服务器在5438端口开工了！");
});