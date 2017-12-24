var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/www/index.html')
});

app.post('/regist',function(req,res){
  var user=req.body.user;
  var email=req.body.email;
  var boards = req.body.boards;

  var html = '暱称：' + user + '<br>' +
             '电邮：' + email + '<br>' +
             '控制板：' + boards.toString();

  res.send(html);
});

app.get('*', function(req, res) {
  res.status(404);
  res.send('找不到网页！');
});

app.listen(5438, function(req, res) {
  console.log("网站服务器在5438端口开工了！");
});