var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '你的qq帐号',
        pass: '你的qq密码'
    }
});

// 寄送信件
exports.send = function(f, p) {
  var mail = {
    from: '寄信人的e-mail',
    to: '收信人的e-mail',
    subject: '狗仔相机',
    html: '发掘到真相了：<br><img src="cid:photo"/>',
    attachments: [{
        filename: f,
        path: p,
        cid: 'photo'
    }],
  };

  transporter.sendMail(mail, function(error, info){
    if(error){
	    return console.log(error);
	}
	console.log('狗仔照片已寄出：' + info.response);
  });
};