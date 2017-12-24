#include <SPI.h>
#include <Ethernet.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

// 要连接的Node服务器IP地址
IPAddress server(192, 168, 1, 19);

// 本机的IP地址
IPAddress ip(192, 168, 1, 177);

// 初始化乙太用户端
EthernetClient client;

void setup() {
  Serial.begin(9600);

  Ethernet.begin(mac, ip);  // 初始化以太网路连接
  
  // 等待一秒钟，让以太网路卡有时间进行初始化
  delay(1000);
  Serial.println("connecting...");
  
  // 连接到指定服务器的5438端口号
  if (client.connect(server, 5438)) {
    Serial.println("connected");
    // 发送HTTP请求
    client.println("GET /a?pin=10&state=1 HTTP/1.1");
    client.println();
  } else {
    // if you couldn't make a connection:
    Serial.println("connection failed");
  }
}

void loop() {

}
