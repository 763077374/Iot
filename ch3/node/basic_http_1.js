var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
    res.write("Node网站开工了！");
    res.end();
});

server.listen(8080);
console.log("http服务器已在8080端口启动");