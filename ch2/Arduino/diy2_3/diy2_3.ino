// 动手做16-1：监控远程的温湿度值，输出小数点。
// 详细的程序说明，请参阅「完美图解Arduino互动设计入门」第十六章。

#include "SPI.h"
#include "Ethernet.h"
#include "WebServer.h"
#include "Streaming.h"   // 引用处理字符串的库（参阅下文说明）
#include "dht11.h"

dht11 DHT11;            // 声明 DHT11 程序对象
const byte dataPin = 2; // 声明 DHT11 模块的数据输入脚位

static byte mac[] = { 0xF0, 0x7B, 0xCB, 0x4B, 0x7C, 0x9F };
IPAddress ip(192, 168, 1, 25);
IPAddress subnet(255, 255, 255, 0);
IPAddress gateway(192, 168, 1, 1);

WebServer webserver("", 80);

P(htmlHead) =
 "<!doctype html><html>"
 "<head><meta charset=\"utf-8\">"
 "      <meta http-equiv=\"refresh\" content=\"3\">"
 "<title>Arduino 温湿度计</title>"
 "</head><body>";
 
P(htmlFoot) = "</body></html>";

void defaultCmd(WebServer &server, WebServer::ConnectionType type, char *, bool)
{
  int chk = DHT11.read(dataPin);
  char buffer[5] = "";
  server.httpSuccess();

  if (type != WebServer::HEAD){
    server.printP(htmlHead);

    if (chk == 0) {
      server << "<h1>温湿度计</h1>";
      server << "<p>温度：" << dtostrf(DHT11.temperature, 5, 2, buffer)
             << "&deg;C</p>";
      server << "<p>湿度：" << dtostrf(DHT11.humidity, 5, 2, buffer) 
             << "%</p>";
    } else {
      server << "<h1>无法读取温湿度值</h1>";
    }
    server.printP(htmlFoot);
  }
}

void dht11Cmd(WebServer &server, WebServer::ConnectionType type, char *, bool)
{
  int chk = DHT11.read(dataPin);
  char buffer[5] = "";
  server.httpSuccess("text/plain");  // 设置返回「纯文本」内容类型
  
  if (type != WebServer::HEAD) {
    if (chk == 0) {
      server << dtostrf(DHT11.temperature, 5, 2, buffer);
    } else {
      server << "??";
    }
  }
}

void thCmd(WebServer &server, WebServer::ConnectionType type, char *, bool)
{
  int chk = DHT11.read(dataPin);
  char buffer[5] = "";
  server.httpSuccess("text/javascript");
  
  if (type != WebServer::HEAD) {
    if (chk == 0) {
      server << "{\"t\":" << dtostrf(DHT11.temperature, 5, 2, buffer) 
             << ",\"h\":" << dtostrf(DHT11.humidity, 5, 2, buffer) 
             << "}";
    } else {
      server << "{\"t\":\"?\",\"h\":\"?\"}";
    }
  }
}

boolean isPWMpin(byte pin) {
    byte pins[] = {3, 5, 6, 9}; 
    for (byte i=0; i < 4; i++) {
        if (pins[i] == pin) {
            return true;
        }
    }
    return false;
}

void getCmd(WebServer &server, WebServer::ConnectionType type, char *url_tail, bool tail_complete) {
  URLPARAM_RESULT rc;
  char name[16];
  char value[16];
  byte ledPin = 255;
  byte pwm = 0;

  server.httpSuccess("application/json");  // 内容类型设置成JSON

  if (type == WebServer::GET) {  // 处理GET请求
    while (strlen(url_tail)) {
      rc = server.nextURLparam(&url_tail, name, 16, value, 16);
      
      if (rc != URLPARAM_EOS) {
       if (strcmp(name, "led") == 0) {  // 读取led参数
          ledPin = atoi(value);       // 将数据转换成数字类型
          
          if (!isPWMpin(ledPin)) {   // 确认是否为PWM控制脚位
            ledPin = 255;        // 若不是，则设置成（不存在的）255脚
          } else {
            pinMode(ledPin, OUTPUT);  // 若是，则把该脚设成「输出」模式。
          }
        }
  
        if (strcmp(name, "pwm") == 0) {  // 读取pwm参数
          pwm = atoi(value);      // 将数据转换成数字类型
          if (pwm > 255) pwm = 255;   // 确认数值不超过255

          if (ledPin != 255) {  // 只要led脚位编号不是255…
             analogWrite(ledPin, pwm);   // 输出PWM信号
         }
        } 
      }
    }
  }
  // 输出JSON格式消息
  server << "{\"pin\":" << ledPin << ",\"pwm\":" << pwm << "}";
}

void setup() {  
  Ethernet.begin(mac, ip, gateway, subnet);
  webserver.setDefaultCommand(&defaultCmd);   // 处理「首页」请求
  webserver.addCommand("temp", &dht11Cmd);
  webserver.addCommand("th.json", &thCmd);
  webserver.addCommand("pwm", &getCmd);    // 处理「pwm页面」请求
  webserver.begin();
}

void loop() {
  webserver.processConnection();
}
