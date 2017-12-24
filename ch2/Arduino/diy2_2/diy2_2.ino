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

void setup() {  
  Ethernet.begin(mac, ip, gateway, subnet);
  webserver.setDefaultCommand(&defaultCmd);   // 处理「首页」请求
  webserver.addCommand("temp", &dht11Cmd);
  webserver.addCommand("th.json", &thCmd);
  webserver.begin();
}

void loop() {
  webserver.processConnection();
}
