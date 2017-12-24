var five = require("johnny-five");
// 若有必要，请自行设置串口
// var board = new five.Board({ port: "COM4" });
// var board = new five.Board({ port: "/dev/ttyAMA0" });
var board = new five.Board();

board.on("ready", function() {
  this.pinMode(2, five.Pin.INPUT);
  
  this.digitalRead(2, function(value){
      console.log(value);
  })
});