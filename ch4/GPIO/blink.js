var Gpio = require('onoff').Gpio, 
  led = new Gpio(18, 'out');  // LED接GPIO 18脚
  
function blink() {
    var id = setInterval(function () {
        led.writeSync(led.readSync() ^ 1);
    }, 200);
 
    setTimeout(function () {
        clearInterval(id);
        led.writeSync(0); 
        led.unexport();   // 释放资源
    }, 5000);
}

blink();