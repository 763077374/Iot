var stdin = process.stdin;
// stdin.setEncoding( 'utf8' );

var com = require("serialport");
var serialPort = new com.SerialPort("COM4");

serialPort.on("open", function(error){
  process.stdout.write('请输入on或off开、关灯。\n');
  
  serialPort.on("data", function(d){
      console.log("Arduino回应：" + d);             // 显示传入串口的数据
  });
  
  stdin.on( 'data', function( key ){
    var str = key.toString().toLowerCase().trim();
    
    if ( str == 'on' ) {
      //process.stdout.write( '开灯\n');
      serialPort.write('1');
    }
    
    if ( str == 'off' ) {
      //process.stdout.write( '关灯\n');
      serialPort.write('0');
    }
  })
});