#include <Servo.h>
#include "thingProperties.h"
#include "DHT.h"

#if defined(ESP32)
#include <WiFi.h>
#include <FirebaseESP32.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

// Provide the token generation process info.
#include <addons/TokenHelper.h>

// Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>

/* 1. Define the WiFi credentials */
#define WIFI_SSID "Univision_BCA8"
#define WIFI_PASSWORD "53ef9f300789"

// For the following credentials, see examples/Authentications/SignInAsUser/EmailPassword/EmailPassword.ino

/* 2. Define the API Key */
#define API_KEY "jSPNoBKz9tEa2NxoZtwlkXV8QVGtrr0zUU57GUmA"

/* 3. Define the RTDB URL */
#define DATABASE_URL "https://remote-greenhouse-default-rtdb.firebaseio.com/" //<databaseName>.firebaseio.com or <databaseName>.<region>.firebasedatabase.app

#define DHTPIN 15
#define DHTTYPE DHT11
#endif
// Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

float sensor = 34;
DHT dht(DHTPIN, DHTTYPE);
Servo myservo;

void setup() {
  dht.begin();
  // Initialize serial and wait for port to open:
  Serial.begin(9600);
  // This delay gives the chance to wait for a Serial Monitor without blocking if none is found
  delay(1500);
  pinMode(2, OUTPUT); // soroh sens
  pinMode(13, OUTPUT); // garah sens
  pinMode(35, INPUT);  // haalga medregch
  pinMode(sensor,INPUT);
  myservo.attach(5);
  
  // Defined in thingProperties.h
  initProperties();

  // Connect to Arduino IoT Cloud
  ArduinoCloud.begin(ArduinoIoTPreferredConnection);

  /*
     The following function allows you to obtain more information
     related to the state of network and IoT Cloud connection and errors
     the higher number the more granular information you’ll get.
     The default is 0 (only errors).
     Maximum is 4
  */
  setDebugMessageLevel(2);
  ArduinoCloud.printDebugInfo();


//firebase setup


  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

  Firebase.begin(&config, &auth);

  // Comment or pass false value when WiFi reconnection will control by your code or third party library
  Firebase.reconnectWiFi(true);

  Firebase.setDoubleDigits(5);
}

void loop() {
  
  ArduinoCloud.update();
  DHT_SENSOR_READ();
  // SendHumidityToNextion();
  // SendTemperatureToNextion();
  if(automode == 1){
  float t = dht.readTemperature();
      if (t > 47) {
        digitalWrite(13, HIGH);
        digitalWrite(2, HIGH);
        sorohled = 1;
        garahled = 1;
      }
      if (40 > t) {
        digitalWrite(13, LOW);
        digitalWrite(2, LOW);
        sorohled = 0;
        garahled = 0;
      }
      sens_soroh = 0;
      sens_garah = 0;
  }    
  if(digitalRead(35) == 1){ // haalga signal
    alarm1 = 1;
    Serial.println(1);
  }
  else{
    alarm1 = 0;
    Serial.println(0);
  }
  
  float t = dht.readTemperature();
  if (t > 50) { // 50 gradus deesh signal
    alarm2 = 1;
  }
  else{
    alarm2 = 0;
  }
  
  if (t < 10) { // 10 gradusaas doosh signal
    alarm3 = 1;
  }
  else{
    alarm3 = 0;
  }
  int  a = analogRead(sensor);
  int b = (a / (4096 / 180)) - 55 ;
   gadaatemp = b;
   Serial.print("gadaa"); Serial.println(b);
  
}


/*
  Since Led is READ_WRITE variable, onLedChange() is
  executed every time a new value is received from IoT Cloud.
*/
// void SendHumidityToNextion{
//   String command = "t2.txt=\"+string(dht.readHumidity())+"/""
//   endNextionCommand()
// }

void get_door(){
  int door;
    Firebase.getInt(fdbo, "door");
    json.add("value", door);
    Serial.print("Door Value"); Serial.println(door);
  }
void onSensSorohChange()  {
    if (sens_soroh == 1) {
      digitalWrite(2, HIGH);
      sorohled = 1;
    }
    else{
      digitalWrite(2, LOW);
      sorohled = 0;
    }
  }
  // Add your code here to act upon Led change
void onSensGarahChange()  {
  if (sens_garah == 1) {
      digitalWrite(13, HIGH);
      garahled = 1;
    }
    else{
      digitalWrite(13, LOW);
      garahled = 0;
    }
}  
  
void DHT_SENSOR_READ() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  temperature = t;
  humidity = h;

  // sendHumidityToNextion();
  Serial.print("temperature-"); Serial.println(t);
  Serial.print("Humidity-"); Serial.println(h);
  delay(500);
}




void onHumidityChange()  {
  
  }
  
void onGadaatempChange()  {
  // int 34;
  // int  a = analogRead(sensor);
  // a = a / 10;
  // gadaatemp = a;
  // Serial.print("gadaa"); Serial.println(a);
  // int Vo;
  // float R1 = 10000; // value of R1 on board
  // float logR2, R2, T;
  // float c1 = 0.001129148, c2 = 0.000234125, c3 = 0.0000000876741; //steinhart-hart coeficients
  // // loop
  // Vo = analogRead(ThermistorPin);
  // R2 = R1 * (1023.0 / (float)Vo - 1.0); //calculate resistance on thermistor
  // logR2 = log(R2);
  // T = (1.0 / (c1 + c2 * logR2 + c3 * logR2 * logR2 * logR2)); // temperature in Kelvin
  // T = T - 273.15;
  // gadaatemp = T;
  // delay(500);
  // Serial.println(T);
}


void onAlarm1Change()  {
  // if(digitalRead(35) == 1){
  //   alarm1 = 1;
  //   Serial.println(1);
  // }
  // else{
  //   alarm1 = 0;
  //   Serial.println(0);
  // }
}

/*
  Since Alarm2 is READ_WRITE variable, onAlarm2Change() is
  executed every time a new value is received from IoT Cloud.
*/
void onAlarm2Change()  {
  // float t = dht.readTemperature();
  //     if (t > 50) {
  //       alarm2 = 1;
  //     }
  //     else{
  //       alarm2 = 0;
  //     }
}

/*
  Since Alarm3 is READ_WRITE variable, onAlarm3Change() is
  executed every time a new value is received from IoT Cloud.
*/
void onAlarm3Change()  {
  // float t = dht.readTemperature();
  //     if (t < 10) {
  //       alarm3 = 1;
  //     }
  //     else{
  //       alarm3 = 0;
  //     }
}





/*
  Since Automode is READ_WRITE variable, onAutomodeChange() is
  executed every time a new value is received from IoT Cloud.
*/
void onAutomodeChange()  {
  // Add your code here to act upon Automode change
}



/*
  Since Door is READ_WRITE variable, onDoorChange() is
  executed every time a new value is received from IoT Cloud.
*/
void onDoorChange()  {
  if(door==1){
    myservo.write(90);
  }
  else{
    myservo.write(0);
  }
  // Add your code here to act upon Door change
}
