#include <SPI.h>
#include <Ethernet.h>
#include <dht11.h>
#include <Streaming.h>

dht11 DHT11;
const byte dataPin = 2;

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

// 要连接的服务器IP地址
IPAddress server(192, 168, 1, 19);

// 本机的IP地址
IPAddress ip(192, 168, 1, 177);

// 初始化乙太用户端
EthernetClient client;
unsigned long past = 0; 
const unsigned long interval = 5 * 1000L;

void httpSend() {
  char tBuffer[6] = "";
  char hBuffer[6] = "";
  client.stop();

  // 连接到指定服务器的5438端口号
  if (client.connect(server, 5438)) {
    Serial.println("connected");
    // 发送HTTP请求
    client << "GET /th?t=" << dtostrf(DHT11.temperature, 5, 2, tBuffer)
           << "&h=" << dtostrf(DHT11.humidity, 5, 2, hBuffer)
           << " HTTP/1.1\n";
    client.println();

    past = millis();
  } else {
    Serial.println("connection failed");
  }
}

void setup() {
  Serial.begin(9600);

  Ethernet.begin(mac, ip);  // 初始化以太网路连接
  
  // 等待一秒钟，让以太网路卡有时间进行初始化
  delay(1000);
  Serial.println("connecting...");
}

void loop() {
 if (millis() - past > interval) {
   int chk = DHT11.read(dataPin);
   
   if (chk == 0) {
     httpSend();
   } else {
     Serial.println("Sensor Error");
   }
  }
}
