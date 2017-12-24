var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sensor');

var dht11Schema = new mongoose.Schema(
  {
    '温度': Number,
    '湿度': Number,
    '时间': { type: Date, default: Date.now }
  }
);

var DHT11 = mongoose.model('dht11', dht11Schema);
module.exports = DHT11;