var five = require("johnny-five");
// 请自行设置串口
// var board = new five.Board({ port: "COM4" });
// var board = new five.Board({ port: "/dev/ttyAMA0" });
var board = new five.Board();

board.on("ready", function() {
  // this.pinMode(13, five.Pin.OUTPUT);
  console.log("Arduino连接成功！");
  
  board.repl.inject({
     led:new five.Led(13) 
  });
});