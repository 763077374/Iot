require('http').createServer(function(req, res) {
  res.writeHead(200, {"Content-Type":"text/html"});
  res.write("<html><head>");
  res.write("<meta charset='utf-8'><title>网志</title>");
  res.write("</head><body>用Node.js搭建网站</body>");
  res.end("</html>");
}).listen(8080);
console.log("http服务器已在8080端口启动");