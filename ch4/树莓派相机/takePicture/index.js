var exec = require('child_process').exec;  // 引用程序库

// 自订「时间」函数
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

var cmd = 'raspistill -w 640 -h 480 -t 1 -q 40 -o ./images/'
          + time() + '.jpg';

exec(cmd, function(error, stdout, stderr) {
  if (error !== null) {
    console.log('exec运行错误：' + error);
  } else {
    console.log('拍摄完毕！');
  }
});