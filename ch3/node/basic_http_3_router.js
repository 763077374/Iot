require('http').createServer(function(req, res) {
  switch (req.url) {	// 判读请求连接路径
    case "/":		// 若是根路径
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end("欢迎光临！");
      break;
    case "/blog":	// 若是/blog路径
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end("这是网志。");
      break;
    default:		// 若是其他路径
      res.writeHead(404, {"Content-Type":"text/html"});
      res.end("找不到资源！");
  }
}).listen(8080);
console.log("http服务器已在8080端口启动");