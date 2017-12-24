var fs = require('fs');
require('http').createServer( function(req, res) {
  fs.readFile('www/index.html',
    function(err, file) {
      if (err) {
        res.writeHead(500);
        res.end('网页加载错误');
        return ;
      }

      res.writeHead(200);
      res.end(file);
    });
}).listen(8080, function(){
  console.log('网站已在8080端口启动');
});