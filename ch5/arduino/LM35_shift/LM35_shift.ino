const byte LM35 = A0;  // LM35温度传感器接在A0脚

void setup() {
  Serial.begin(9600);
}

void loop() {
  int val;
  int temp;

  val = analogRead(LM35); // 读取并暂存传感器的模拟值
  temp = (125 * val) >> 8;

  Serial.print("Temp:");
  Serial.print(temp);        // 在串口监视器显示温度值
  Serial.println("C");

  delay(3000);    // 暂停3秒
}
