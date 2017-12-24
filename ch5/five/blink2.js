var five = require("johnny-five");
// 请自行设置串口
// var board = new five.Board({ port: "COM4" });
// var board = new five.Board({ port: "/dev/ttyAMA0" });
var board = new five.Board();
const LEDPIN = 13;

board.on("ready", function() {
  var out = 0;
  this.pinMode(LEDPIN, five.Pin.OUTPUT);

  this.loop(500, function() {
    this.digitalWrite(LEDPIN, (out ^= 1));
  });
});