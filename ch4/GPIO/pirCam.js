var exec = require('child_process').exec;
var Gpio = require('onoff').Gpio,
  pir = new Gpio(7, 'in', 'rising'),
  captured = false;

var time = function () {
    var now = new Date();
    var str = now.getFullYear() + '.' + 
	        (now.getMonth()+1) + '.' +
            now.getDate() + '_' + 
            now.getHours() + '.' +
            now.getMinutes() + '.' + 
            now.getSeconds();
    
    return str;
};

function takePhoto() {
  // 影像档以自定义日期格式为名，存入img文件夹。
  var imgFile = './img/' + time() + '.jpg';
  // 拍照并存盘
  var args = 'raspistill -w 640 -h 480 -o ' + imgFile + ' -t 1 -q 40';
  exec(args, function(error, stdout, stderr) {
    if (error) {
      throw error;
    } else {
      console.log("拍照中，请微笑～");
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

function exit() {
  pir.unexport();
  console.log('\n结束程序');
  process.exit();
}

process.on('SIGINT', exit);
console.log('自动拍照设备准备好了～');