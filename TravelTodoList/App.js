import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import {theme} from './color'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';

const STORAGE_KEY = "@toDos"

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({});
  useEffect(() => {
    loadTodos();
  }, []);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  // TextInput에 입력된 값 저장
  const onChangeText = (payload) => setText(payload)

  // AsyncStorage 저장
  const saveTodos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  }

  // AsyncStorage에 저장된 값 가져오기
  const loadTodos = async () => {
    const getTodo = await AsyncStorage.getItem(STORAGE_KEY)
    setTodos(JSON.parse(getTodo))
  }
  
  // Todo리스트 추가
  const addTodo = async () => {
    if(text === "") return
    // const newTodos = Object.assign({...todos}, {[Date.now()]: {text, work:working}})
    const newTodos = {...todos, [Date.now()]: {text, work:working}}
    setTodos(newTodos)
    await saveTodos(newTodos)
    setText("")
  }
  const deleteTodo =  (key) => {
    Alert.alert("선택하신 To do를 삭제하시겠습니까?", "확실한가요?", [
      {text: "취소"},
      {text: "삭제", onPress: () => {
        const newTodos = {...todos}
        delete newTodos[key]
        setTodos(newTodos);
        saveTodos(newTodos);
      }}
    ])
    
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? 'white' : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? 'white' : theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput onSubmitEditing={addTodo} returnKeyType='done' onChangeText={onChangeText} value={text} style={styles.input} placeholder={working ? '오늘의 할 일은 무엇인가요?' : '어디로 여행가고 싶나요?'} />
      <ScrollView >
        {Object.keys(todos).map(key => 
          todos[key].work === working ? 
          (<View style={styles.todos} key={key}>
            <Text style={styles.todoText}>{todos[key].text}</Text>
            <TouchableOpacity onPress={() => deleteTodo(key)}>
              <Fontisto name='trash' size={24} color={theme.grey}  />
            </TouchableOpacity>
          </View>) : 
          null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100
  },
  btnText: {
    // color:,
    fontSize:38,
    fontWeight: '600'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    marginBottom:20,
    fontSize: 18
  },
  todos: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  todoText: {
    fontSize:20,
    color: "white",
    fontWeight: '500'
  }
});
