import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';
const {width:SCREEN_WIDTH} = Dimensions.get('window');

const API_KEY = 'c1cd2de7d8a43e73852b8f643f8bc83f';

export default function App() {
  const [street, setStreet] = useState(null);
  const [days, setDays] = useState(null);
  const [ok, setOk] = useState(true);
  const ask = async () => {
   const {granted} = await Location.requestForegroundPermissionsAsync()
   if(!granted){
    setOk(false)
   }
   const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5})
   const location = await Location.reverseGeocodeAsync({latitude, longitude})
   setStreet(location[0].street)
   const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
   const json = await response.json();
   console.log(json)
  }
  useEffect(() => {
    ask();
  }, [])
  return (
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{street}</Text>
        </View>
        <ScrollView pagingEnabled showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={styles.weather}>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
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
    alignItems: "center"
  },
  cityName: {
    fontSize: 68
  },
  weather: {
    backgroundColor: 'red'
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178
  },
  description: {
    marginTop: -30,
    fontSize: 60
  }
})

