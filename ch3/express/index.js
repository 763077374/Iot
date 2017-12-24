var express = require('express');
var app = express();

app.get("/", function(req, res) {
	res.send("arduino信息网页");
});

app.get("/th", function(req, res) {
  var temp = req.query.t;   // 读取查找字符串的t值
  var humid = req.query.h;  // 读取查找字符串的h值

  // 确认有收到温度和湿度值（两者都不是undefined）
  if (temp != undefined && humid != undefined) {
　　console.log("温度: " + temp + "，湿度： " + humid);
　　res.send("温度: " + temp + "°C，湿度： " + humid +"%");
  } else {
  	console.log("没收到数据！");
  }
});

app.use("*",function(req,res){
  res.status(404).send('查无此页！');
});

var server = app.listen(5438, function () {
  console.log("网站服务器在5438端口开工了！");
});