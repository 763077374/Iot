var five = require("johnny-five");  // 引用霹雳五号库
// 请自行修改端口号
var board = new five.Board({port:"COM4", repl:false});
var io = require('socket.io'); 
var express = require("express");
var app = express();

app.use(express.static('www'));

var server = app.listen(5438, function(req, res) {
  console.log("网站服务器在5438端口开工了！");
});

var sio = io(server);
var users = 0;   // 纪录目前在线人数
var newVal = 0;  // 纪录新的模拟检测值
sio.on('connection', function(socket){
  console.log("用户连接");
  ++users;
  // 发送当前的实时数据给新连接用户
  sio.sockets.emit('cds', { 'val': newVal });  // 传出实时传感数据
  
  socket.on('disconnect', function(socket){
    console.log("用户脱机");
    --users;
  });
});

board.on("ready", function() {
  var cds = new five.Sensor("A0");
  var oldVal = 0;
  
  cds.scale([0, 100]).on("change", function() {
	  newVal = Math.floor(this.value);
	  
     if (users > 0) {   // 只要仍有用户连接…
	    if (newVal != oldVal) {
		  sio.sockets.emit('cds', { 'val': newVal });  // 传出实时传感数据
	    }
	    oldVal = newVal;
     }
  });
});