var five = require("johnny-five");
// 请自行设置串口
// var board = new five.Board({ port: "COM4" });
// var board = new five.Board({ port: "/dev/ttyAMA0" });
var board = new five.Board();

board.on("ready", function() {
  // 声明自定义的矩阵图像
  var pict = [0x3C,0x7E,0x7E,0xDB,
           0xFF,0x18,0x24,0x5A];
  // 声明LED矩阵对象
  var matrix = new five.Led.Matrix({
    pins: {
      data: 11,   // 数据脚
      clock: 13,  // 时脉脚
      cs: 10     // 芯片选择脚
    }
  });

  matrix.on();       // 开启LED矩阵 
  matrix.draw(pict);  // 显示自定义图像
});