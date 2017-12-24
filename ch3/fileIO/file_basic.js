var fs = require("fs");

fs.readFile("node.txt", "utf8", function(err, file) {
  if (err) {
   console.log("运行出错了，消息：" + err);
   process.exit();  // 中断进程
  }
  console.log("文件读取完毕，内容：");
  process.stdout.write(file + '\n');
});

console.log("Node程序运行中…");