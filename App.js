import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get("window");  // 화면 너비 가져오기

const API_KEY = "8ed3f5e8643b328ff969ccd466aacf34";  // openWeather에서 가져온 API 키 (실제로는 이렇게 코드 안에 넣으면 안 됨! 안전하지 않음)

const icons = {
  "Clear": "day-sunny",
  "Clouds": "cloudy",
  "Rain": "rains",
  "Snow": "snowflake-8",
  "Atmosphere": "cloudy-gusts",
  "Drizzle": "rain",
  "Thunderstorm": "lightning",
}

export default function App() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();  // 권한 허용 받았는지
    if(!granted){  // 허용받지 못했으면
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5});  // 위도/경도
    const location = await Location.reverseGeocodeAsync(  // reverseGeocodeAsync : 위도와 경도를 주소로 변환해줌 / GeocodeAsync: 주소를 위도, 경도 숫자로 변환해줌
      {latitude, longitude},
      {useGoogleMaps: false}
    );
    setCountry(location[0].country);
    setCity(location[0].region + " " + location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=alerts&appid=${API_KEY}`);
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();  // component가 마운트되면 이 function을 호출
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.countryname}>{country}</Text>
        <Text style={styles.cityname}>{city}</Text>
      </View>
      <ScrollView 
        pagingEnabled 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
          {days.length === 0 ? (  // day 배열이 없다면 로딩 표시
            <View style={{ ...styles.day, alignItems: "center" }}>
              <ActivityIndicator
                size="large"
                color="#3C4DA2"
              />
            </View>
           ) : (
            days.map((day, index) =>
              <View key={index} style={styles.day}>
                <Text style={styles.days}>{new Date(day.dt * 1000).toString().substring(0, 10)}</Text>
                <Fontisto name={icons[day.weather[0].main]} size={140} color="#3C4DA2" />
                <View style={styles.tem}>
                  <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                  <Text style={styles.do}> °C</Text>
                </View>
                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.sky}>{day.weather[0].description}</Text>
              </View>
            )
          )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#D2D7F2",
  },
  city:{
    flex: 5,
    justifyContent: "center",
    alignItems:"center",
    marginTop: 20,
  },
  countryname:{
    color: "#3C4DA2",
    fontSize: 20,
    fontWeight: "400",
  },
  cityname:{
    color: "#3C4DA2",
    fontSize: 40,
    fontWeight: "bold",
  },
  day:{
    alignItems:"center",
    width: SCREEN_WIDTH, 
  },
  days:{
    fontSize: 30,
    color: "#3C4DA2",
    marginBottom: 50,
  },
  tem:{
    flexDirection: "row",  // 줄바꿈 없애고 가로로 배치
  },
  do:{
    fontSize: 40,
    color: "#3C4DA2",
    marginTop: 75,
  },
  temp:{
    fontSize: 100,
    color: "#3C4DA2",
    marginBottom: 50,
  },
  description:{
    fontSize: 40,
    color: "#3C4DA2",
    marginTop: -30,
    fontWeight: "800",
  },
  sky:{
    fontSize: 20,
    color: "#3C4DA2",
  },
});



// 추가할 것
// 1. 유저가 권한을 허용해주지 않으면 ㅠㅠ
// 2. 날씨에 따라 배경화면 변경