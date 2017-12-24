var five = require("johnny-five");
// 请自行设置串口
// var board = new five.Board({ port: "COM4" });
// var board = new five.Board({ port: "/dev/ttyAMA0" });
var board = new five.Board();

board.on("ready", function() {
  var temp = new five.Thermometer({
    pin: "A0",          // 接脚
    controller: "LM35"  // 温度传感器类型
  });

  temp.on("change", function(){
    console.log("温度: %d", this.celsius);
  });
});