var mail = require('./pirMail.js');
var exec = require('child_process').exec;
var Gpio = require('onoff').Gpio, 
    pir = new Gpio(7, 'in', 'rising'),  // GPIO7连接PIR信号输出脚
    captured = false;				 // 暂存是否已拍照的状态，缺省为「否」。

var time = function () {
  var now = new Date();
  var str = now.getFullYear() + '.' + 
          (now.getMonth()+1) + '.' +
          now.getDate()
           + '_' + 
          ((now.getHours() < 10) ? "0" : "") + now.getHours()
           + '.' +
          ((now.getMinutes() < 10) ? "0" : "") + now.getMinutes() 
           + '.' + 
          ((now.getSeconds() < 10) ? "0" : "") + now.getSeconds();
    
  return str;
};

function takePhoto() {
  var file = time() + '.jpg';
  var path = './images/' + file;
  
  var args = 'raspistill -w 640 -h 480 -o ' + path + ' -t 1 -q 40';
  
  exec(args, function(error, stdout, stderr) {
    console.log('error: ' + stderr);

    if (error) {
      throw error;
    } else {
      console.log("拍照中，请微笑～");
      // 寄送信件
      mail.send(file, path);
   }
  });
}

// 处理pir脚位变化的事件处理程序
pir.watch(function(err, value) {
  if (err) exit();

  // 若脚位是「高电位」而且尚未拍照
  if(value == 1 && captured == false)  {
   captured = true;         // 先设置成「已拍照」
   console.log('侦测到入侵者，开始照相存证…');
   takePhoto();           // 拍照
   
   // 5秒定时程序，5秒之后设置成「未拍照」状态。
   setTimeout(function () {
      captured = false;
    }, 5000);
  }
});

// 关闭进程时，清理资源的自订函数
function exit() {
  pir.unexport();  // 释放资源
  console.log('\nbye!');
  process.exit();
}

// 收到「关闭进程」消息时，运行exit自订函数。
process.on('SIGINT', exit);
console.log('狗仔相机准备好了～');