var express = require('express');
var spawn = require('child_process').spawn;
var app = express();
var users = 0;

app.use(express.static("www"));

// 启动网站服务器时，一并启动串流视频
var server = app.listen(5438, function() {
     var args = ["-o", "output_http.so -w /usr/local/www", "-i", "input_raspicam.so"];
     spawn('mjpg_streamer', args);
     
     console.log('网站在5438端口开工了！');
});