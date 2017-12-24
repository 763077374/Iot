const http = require('http');
const hostname = '127.0.0.1';  // 主机IP地址
const port = 1337;             // 端口号

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port, hostname, () => {
  console.log(`网站在此地址启动了：http://${hostname}:${port}/`);
});