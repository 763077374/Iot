// 动手做16-4：从浏览器控制远程的灯光开关
// 详细的程序说明，请参阅第十六章，16-28页。

#include "SPI.h"
#include "Ethernet.h"
#include "WebServer.h"
#include "Streaming.h"

static byte mac[] = { 0xF0, 0x7B, 0xCB, 0x4B, 0x7C, 0x9F };
IPAddress ip(192, 168, 1, 25);
IPAddress subnet(255, 255, 255, 0);
IPAddress gateway(192, 168, 1, 1);

WebServer webserver("", 80);

byte ledPin = 3;  // 缺省是第一个PWM脚位 
int pwm = 0;

// 确认数据是否在数组里面
boolean isPWMpin(byte pin){
    byte pins[] = {3, 5, 6, 9, 10, 11};
    for (byte i=0; i < 6; i++) {
        if (pins[i] == pin) {
            return true;
        }
    }
    return false;
}

P(htmlHead1) =
 "<!doctype html><html>"
 "<head><meta charset=\"utf-8\">"
 "<title>Arduino 微网站</title>";
 
P(htmlHead2) = "</head><body>";

P(jQuery) = "<script src=\"https://code.jquery.com/jquery-1.11.3.min.js\"></script>\n"
"<script src=\"https://code.jquery.com/ui/1.11.4/jquery-ui.min.js\"></script>\n";

P(myCSS) = "<link href='https://code.jquery.com/ui/1.11.4/themes/ui-lightness/jquery-ui.css' rel='stylesheet' type='text/css'>\n"
"<style type='text/css'>\n#swatch {width:120px;height:100px;margin-top:18px;margin-left:15px;background-color:#808080;}\n"
"#light {float:left;clear:left;width:300px;margin:15px;}\nbody {font-family:\"黑体\",sans-serif;}\n</style>\n";

P(slider) = "<h1>LED亮度</h1><div id=\"swatch\"></div><div id=\"light\"></div>\n";

P(sliderScript) = "<script>function hexFromRGB(r) {var hex=r.toString(16);\n"
"if (hex.length===1) {hex='0'+hex;}\n"
"return hex+hex+hex;}\n"
"function refreshSwatch() {var light = $('#light').slider('value');\n"
"hex = hexFromRGB(light);$('#swatch').css('background-color','#'+hex);}\n"
"function upload(){var light = $('#light').slider('value');\n"
"$.ajax({method:'GET',url:'/pwm',data:{led:9,pwm:light},"
"dataType:'json',success: function(data) {console.log('arduino返回脚位：'+data.pin+', 亮度：'+data.pwm);}});\n"
"console.log('发送亮度值：' + light);}\n"
"$(function(){$('#light').slider({\n"
"orientation:'horizontal',range:'min',max:255,"
"value:127,slide:refreshSwatch,change:upload});"
"$('#light').slider('value',127);});</script>\n";

P(htmlFoot) = "</body></html>";

void defaultCmd(WebServer &server, WebServer::ConnectionType type, char *, bool)
{
  server.httpSuccess();
  
  if (type != WebServer::HEAD) 
  {
    server.printP(htmlHead1);
    server.printP(jQuery);
    server.printP(myCSS);
    server.printP(htmlHead2);
    server.printP(slider);
    server.printP(sliderScript);
    server.printP(htmlFoot);
  }
}

void getCmd(WebServer &server, WebServer::ConnectionType type, char *url_tail, bool tail_complete)
{
  URLPARAM_RESULT rc;
  char name[16];
  char value[16];

  server.httpSuccess("application/json");  // 设置正确的内容类型
  
  if (type == WebServer::GET){
    while (strlen(url_tail))
    {
      rc = server.nextURLparam(&url_tail, name, 16, value, 16);
      
      if (rc != URLPARAM_EOS)
      {
       if (strcmp(name, "led") == 0) {
          ledPin = atoi(value);
          Serial.print("led: ");
          Serial.println(ledPin);
          // 确认是否是PWM控制脚位
          if (!isPWMpin(ledPin)) {
            ledPin = 3;
          } else {
            pinMode(ledPin, OUTPUT);
          }
        }
  
        if (strcmp(name, "pwm") == 0) {
          pwm = atoi(value);
          if (pwm > 255) pwm = 255;
          Serial.print("pwm: ");
          Serial.println(pwm);
          
          if (ledPin != 255) {  // 只要led脚位编号不是255…
             analogWrite(ledPin, pwm);   // 输出PWM信号
   	}
        } 
      }
    }
  }
  server << "{\"pin\":" << ledPin << ",\"pwm\":" << pwm << "}";
}

void setup() {
  Serial.begin(9600);
  Ethernet.begin(mac, ip, gateway, subnet);
  webserver.setDefaultCommand(&defaultCmd);     // 处理「首页」请求
  webserver.addCommand("pwm", &getCmd);         // 处理GET请求
  webserver.begin();
  Serial.println("online...");
}

void loop() {
  webserver.processConnection();
}
