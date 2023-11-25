import { StyleSheet, Text, View, Button, Dimensions, ActivityIndicator } from 'react-native';

export default function HomePage({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Button title='Go to Vote' onPress={() => navigation.navigate('Vote')}/>
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