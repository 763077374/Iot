var express = require('express');
var app = express();
var users = 0;

app.use(express.static("www"));

var server = app.listen(5438, function() {  
     console.log('网站在5438端口开工了');
});

var io = require('socket.io');
var five = require("johnny-five");
// 请自行修改串行端口
var board = new five.Board();
var servos = {};

var sio = io(server);

board.on("ready", function() {
  servos = {
    x: new five.Servo({
      pin: 4,
      startAt: 90     
    }),
    y: new five.Servo({
      pin: 5,
      startAt: 90
    })
  };
});

sio.on('connection', function(socket){
  console.log('用户连接');
  
  socket.on('disconnect', function() {
    console.log('用户脱机');
  });
  
  // 接收用户端传来的‘face’事件与数据
  socket.on('face', function(data) {
     // 在控制台显示接收到的x, y座标
     console.log('马达旋转角度，x：' + data.x + ', y: ' + data.y);
     // 转动伺服马达
     servos.x.to(data.x);
     servos.y.to(data.y);
  });
});