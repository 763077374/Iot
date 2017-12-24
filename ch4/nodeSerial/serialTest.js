var com = require("serialport");
// 请自行修改串口设置
var serialPort = new com.SerialPort("COM4", {
    baudrate: 9600,
    parser: com.parsers.readline("\n")
  });

serialPort.on("open", function(){
  console.log("已开启串口");
  
  serialPort.on("data", function(d){
      console.log("数据：" + d);             // 显示传入串口的数据
  });
});