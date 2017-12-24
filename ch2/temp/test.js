var str = '{"温度":22,"湿度":60,"数字脚":' + 
          '{"2":0,"3":1}}';

var obj = JSON.parse(str);
console.log('温度：' + obj.温度);
console.log('脚2：' + obj.数字脚[2]);