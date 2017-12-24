var fs = require("fs");
try {
  var file = fs.readFileSync("node.txt");
  console.log("文件读取完毕，内容：" + file);
} catch (err) {
  console.log("运行出错了，消息：" + err);
  process.exit();  // 中断进程
}
console.log("Node程序运行中…");