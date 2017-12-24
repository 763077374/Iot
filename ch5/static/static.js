var express = require("express");
var app = express();

app.use(express.static('www'));
app.use('/files', express.static('uploads'));

app.listen(5438, function(req, res) {
  console.log("网站服务器在5438端口开工了！");
});