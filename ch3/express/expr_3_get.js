var express = require("express");
var app = express();

app.get('/', function(req, res) {
  res.end("<h1>你好！</h1>");
});

app.get('/sw/:pin', function(req, res) {
  res.send('收到的脚位编号：' + req.params.pin);
});

app.get('/arduino/:pin/:val?', function(req, res) {
  var html = "脚位：" + req.params.pin + "<br>" +
             "状态：" + req.params.val;
  res.send(html);
});

app.get("/control", function(req, res) {
  var pin = req.query.pin;
  var val = req.query.val;

  if (pin != undefined && val != undefined) {
    var html = "脚位：" + pin + "<br>" +
               "状态：" + val;
    res.send(html);
  } else {
    res.send("没收到数据！");
  }
});

app.listen(5438, function(req, res) {
  console.log("网站服务器在5438端口开工了！");
});