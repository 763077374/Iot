var five = require("johnny-five");
// 请自行设置串口
// var board = new five.Board({ port: "COM4" });
// var board = new five.Board({ port: "/dev/ttyAMA0" });
var board = new five.Board();

var servos;

board.on("ready", function() {
  console.log("Arduino控制板已连接！");
  this.pinMode(13, five.Pin.OUTPUT);

  // 设置接脚初始角度  
  servos = {
    x: new five.Servo({
     pin: 9,           // Arduino接脚编号
　　　startAt: 80,       // 初始角度 
　　　range: [80, 110]   // 设置舵机的旋转角度范围
    }),
    y: new five.Servo({
      pin: 10,
      startAt: 120
    })
  };
  
  board.repl.inject({   // 开放sx, sy和led对象给命令行（终端机）操作
    s: servos,
    led: new five.Led(13)
  });
});