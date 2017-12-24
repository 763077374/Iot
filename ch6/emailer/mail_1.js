var nodemailer = require("nodemailer");

// 运行nodemailer的createTransport()方法，创建「发送器」对象。
var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '你的帐号@qq.com',
        pass: '你的电子邮箱密码'
    }
});

var mail = {
    from: '姓名 <你的帐号@qq.com>',   // 寄信人和电邮地址
    to: '收件人姓名 <收件人的e-mail>',     // 收信人的大名和e-mail
    subject: '信件主旨',
    text: '这里面不包含HTML标签',         // 纯文本消息内容
    html: '这里面可以加入<b>HTML标签</b>'  // HTML消息内容
};

transporter.sendMail(mail, function(error, info){
  if(error){
    return console.log(error);
  }
  console.log('邮件已寄出：' + info.response);
});
