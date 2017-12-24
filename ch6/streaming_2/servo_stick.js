var express = require('express');
var spawn = require('child_process').spawn;
var app = express();
var users = 0;

app.use(express.static("www"));

var server = app.listen(5438, function() {
     var args = ["-o", "output_http.so -w /usr/www", "-i", "input_raspicam.so"];
     spawn('mjpg_streamer', args);
     
     console.log('网站在5438端口开工了');
});

var io = require('socket.io');
var five = require("johnny-five");
// 请自行修改串口
var board = new five.Board({ port: "/dev/ttyAMA0" });
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
  
  socket.on('joy', function(data) {
     servos.x.to(data.stick.x);
     servos.y.to(data.stick.y);
     // servos.x.step(data.stick.x);
     // servos.y.step(data.stick.y);
  });
});