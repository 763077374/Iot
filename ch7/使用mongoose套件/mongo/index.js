var DHT11 = require('./models/dht11');  // 引用models路径中的dht11模块
var express = require('express');        // 引用node_modules路径里的express套件
var app = express();

app.get("/th", function(req, res) {
  var temp = req.query.t;    // 读取查找字符串的t（温度）值
  var humid = req.query.h;  // 读取查找字符串的h（湿度）值

  if (temp != undefined && humid != undefined) {  // 只要temp和humid都有值…
    var data = new DHT11({ '温度': temp, '湿度': humid });  // 依据模型创建数据
    data.save(function (err) {  // 保存数据，回呼函数将接收错误消息。
      if (err) {             // 如果err有值，代表保存过程出现问题。
        console.log('出错啦～');
      } else {
        console.log('保存成功！');
        // 在网页上显示接收到的温湿度值
        res.send("温度: " + temp + "&deg;C，湿度： " + humid +"%");
      }
    });
  } else {
  	console.log("没收到数据！");
  }
});