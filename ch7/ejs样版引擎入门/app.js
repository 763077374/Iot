var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  // 传递参数
  res.render('index', {usr: '">阿蝙"',
                       types: ['Arduino', 'Raspberry Pi', 'JavaScript']});

});

var server = app.listen(5438, function () {
  console.log('网站在5438端口开通了！');

});