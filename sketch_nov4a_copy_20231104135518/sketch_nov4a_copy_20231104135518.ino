#include <DHT.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino.h>
#include <ArduinoJson.h>

#define DHTPIN 3
#define DHTTYPE DHT11


DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "Stefan's Galaxy A52s 5G";
const char* password = "12345678";
const char* apiEndpoint = "http://192.168.1.247:9000";



void setup() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  int sensorValue = analogRead(34);
  Serial.print("Sensor Value: ");
  Serial.println(sensorValue);
  float temperature = dht.readTemperature();
  Serial.print("Temperature: ");
  Serial.println(temperature);
  float humidity = dht.readHumidity();
  Serial.print("Humidity: ");
  Serial.println(humidity);


  if (!isnan(temperature) || !isnan(sensorValue) || !isnan(humidity)) {
    HTTPClient http;
    String url = String(apiEndpoint) + "/users/update-temperature";
    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    // Create a JSON object and add temperature and sensorValue to it
    StaticJsonDocument<64> jsonDocument; // Adjust the size as needed
    jsonDocument["temperature"] = temperature;
    jsonDocument["sensorValue"] = sensorValue;
    jsonDocument["humidity"] = humidity;

    // Serialize the JSON object to a string
    String requestBody;
    serializeJson(jsonDocument, requestBody);

    int httpResponseCode = http.POST(requestBody);
    Serial.println(httpResponseCode);
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Data sent successfully.");
      Serial.println("Server response: " + response);
    } else {
      Serial.println("Error sending data.");

    }
    http.end();

  }
  delay(5000);
}