var DHT11 = require('./models/dht11');
var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    var paginate = 20;
    
	DHT11.find().select('-_id -__v').sort({'时间': -1}).limit(paginate)
    .exec(function(err, data) {
        res.render('temp', {docs:data});
    });
});

var server = app.listen(5438, function () {
  console.log("网站服务器在5438端口口开工了！");
});