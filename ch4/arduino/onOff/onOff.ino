const byte LED = 13;   // LED接在13脚
char val;         // 保存接收数据的变量，采字符类型
void setup() {
  pinMode(LED, OUTPUT);  // 脚位设置成「输出」模式

  Serial.begin(9600);
  Serial.println("Arduino ready.");  // 传出消息
}
 
void loop() {
  if( Serial.available() ) {  // 若串口收到字符…
    val = Serial.read();    // 读入字符
    switch (val) {
    case '0' :            // 收若收到字符‘0’…
      digitalWrite(LED, LOW);   // 输出低电位
      Serial.println("LED OFF");  // 传出消息
      break;
    case '1' :            // 收若收到字符‘1’…
      digitalWrite(LED, HIGH);   // 输出高电位
      Serial.println("LED ON");
      break;
    }
  }
}
