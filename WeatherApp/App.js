import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';
const {width:SCREEN_WIDTH} = Dimensions.get('window');

const icons = {
  "Clouds" : "cloudy",
  "Clear": "day-sunny",
  "Snow": "snow",
  "Rain": "rains",
  "Drizzle": "rain",
  "Thunderstorm": "lightning",
  "Atmosphere": "cloudy-gusts"
}

export default function App() {
  const [street, setStreet] = useState(null);
  const [days, setDays] = useState(null);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
   const {granted} = await Location.requestForegroundPermissionsAsync()
   if(!granted){
    setOk(false)
   }
   const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5})
   const location = await Location.reverseGeocodeAsync({latitude, longitude})
   setStreet(location[0].street)
   const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}&units=metric`)
   const {list} = await response.json()
   const filterList = list.filter(({dt_txt}) => dt_txt.endsWith("03:00:00"))
   setDays(() => filterList)
  }
  useEffect(() => {
    getWeather();
  }, [])
  return (
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{street}</Text>
        </View>
        <ScrollView pagingEnabled showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={styles.weather}>
          {days === null ? 
            <View style={{...styles.day, alignItems: "center"}}>
              <ActivityIndicator color='white' size={'large'} style={{marginTop: 10}} />
            </View> : 
            days.map((day, index) => 
              <View key={index} style={styles.day}>
                <Text style={styles.date}>{day.dt_txt.slice(5,10)}</Text>
                <View style={{flexDirection: 'row', width:SCREEN_WIDTH, alignItems:'flex-end', justifyContent:'space-between'}}>
                  <Text style={styles.temp}>{+day.main.temp.toFixed(1)}</Text>
                  <Fontisto name={icons[day.weather[0].main]} size={100} color="white"  />
                </View>
                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.tinyText}>{day.weather[0].description}</Text>
              </View>
            ) 
          }
        </ScrollView>
      </View>
  );
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green"
  },
  city: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    color:"white"
  },
  weather: {
    // backgroundColor: 'red'
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start"
  },
  date: {
    fontSize: 40,
    marginTop:50,
    marginBottom:-80,
    color:"white"
  },
  temp: {
    marginTop: 50,
    fontSize: 100,
    color:"white"
  },
  tinyText: {
    fontSize:30,
    color:"white"
  },
  description: {
    marginTop: -30,
    fontSize: 40,
    color:"white"
  }
})

