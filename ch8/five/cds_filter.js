var five = require("johnny-five");
// 请自行修改串口参数
var board = new five.Board({port:"COM4", repl:false});

// 实时通信
var io = require('socket.io');
var express = require("express");
var app = express();

app.use(express.static('www'));
app.use(function(req, res){
	res.statusCode = 404;
	res.end("<h1>ERROR!</h1>");
})

var server = app.listen(5438, function(req, res) {
  console.log("网站服务器在5438端口开工了！");
});

var sio = io(server);  // 可以写成：sio = io.listen(server);

var users = 0;
sio.on('connection', function(socket){
  ++users;
  sockets.emit('cds', { 'val': filterVal });  // 送出滤波值给连接用户
  
  socket.on('disconnect', function(socket){
    --users;
  });
});

var filterVal = 0;   // 滤波后的值
var oldVal = 0;    // 旧的滤波值
var cdsArr = [0, 0, 0];    // 原始值数组
var tempArr = [0, 0, 0];  // 暂存处理数据
var total = cdsArr.length;

function filter(val) {   // 滤波函数，接收一个原始值参数。
　　cdsArr.pop();
　　cdsArr.unshift(val);
　
   for (var i=0; i<total; i++) {  // 复制数组
　　  tempArr[i] = cdsArr[i];
　　}
　　
   tempArr.sort(function (a,b){return a - b});  // 排序
   filterVal = tempArr[0];  // 取第一个滤波元素值
   
   if (users > 0) {  // 如果仍有用户连接…
     if (filterVal != oldVal) {  // 如果新、旧滤波值不同…
      sio.sockets.emit('cds', { 'val': filterVal });  // 实时发送滤波值
      oldVal = filterVal;
     }
   }
}

board.on("ready", function() {
  var cds = new five.Sensor("A0");  // 读取A0脚位值
  
  cds.scale([0, 100]).on("change", function() {
	  var val = Math.floor(this.value);
	  filter(val);  // 过滤输入值
  });
});