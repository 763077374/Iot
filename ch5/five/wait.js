var five = require("johnny-five"),
    ledPin = 13;   // LED接在13脚
// 若有必要，请自行设置串口
// var board = new five.Board({ port: "COM4" });
// var board = new five.Board({ port: "/dev/ttyAMA0" });
var board = new five.Board();

board.on("ready", function() {
  this.pinMode(ledPin, this.MODES.OUTPUT);
  this.digitalWrite(ledPin, 1);
 
  this.wait(3000, function() {     // 设置一个3秒延时程序
    this.digitalWrite(ledPin, 0);
  });
});