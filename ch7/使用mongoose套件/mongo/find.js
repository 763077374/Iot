var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sensors');

// 设置纲要
var dht11Schema = new mongoose.Schema(
  {
    '温度': Number,
    '湿度': Number,
    '时间': { type: Date, default: Date.now }
  }
);

// 定义自订的show()方法
dht11Schema.methods.show = function () {
  var msg = "温度：" + this['温度'] +
	      "、湿度：" + this['湿度'] + 
          "、时间：" + this['时间'];

  console.log(msg);  // 在控制台输出温、湿度和时间数据
}

// 创建模型
var DHT11 = mongoose.model('dht11', dht11Schema);

DHT11.find(function (err, docs) {
  if ( err || !docs) {
　　console.log("找不到dht11的数据！");
  } else {
    docs.forEach(function(d) {
      var data = new DHT11(d);  // 产生数据对象
      data.show();
    });
  }
});

/*
DHT11.find()
     .select('-_id -时间')
     .and([{'温度' : { $gte: 24 }}, {'湿度': {$gte:60}}])
     .exec(function(err, docs) {
        if ( err || !docs) {
　　        console.log("找不到dht11的数据！");
        } else {
            console.log(docs);
        }
     });
*/