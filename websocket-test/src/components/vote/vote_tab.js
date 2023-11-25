import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import {useEffect, useRef} from 'react'
// import { WebSocket } from 'react-native-websocket';
//  https://sinor.loca.lt
const SERVER = "ws://0.0.0.0:4001";
const NAME = 'RN';

export default function VoteTab() {
  const socket = useRef(new WebSocket('ws://sinor.loca.lt?name=RN'));
  useEffect(() => {
    console.log(socket.current)
  
    socket.current.onopen = () => {
      socket.current.send("Hello, there.")
      console.log('connect')
    }

    socket.current.onmessage = (event) => {
      console.log(event.data)
    }
    return () => {
      socket.current.onclose = (event) => {
        socket.current.close(event.code, event.reason)
        console.log(event.code, event.reason) 
        console.log('bye')
      }
    }
  }, [])
  
  return (
    <View style={styles.container}>
      <Text>Vote Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})