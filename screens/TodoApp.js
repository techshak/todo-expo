import React, {useState} from 'react';
import { Text, View, StyleSheet, FlatList, Modal, Pressable } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Spacer from '../components/Spacer';

// or any pure javascript modules available in npm
import { Card, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { UserTasks } from '../redux/reducers/tasksSlice';
import TaskCard from '../components/TaskCard';
import AddToDoModal from '../components/modals/AddToDoModal';



function TodoApp () {

  const todo_list = useSelector(UserTasks);
  const [addTodo, setAddToDo] = useState(false);

  const AddTaskModal = () => {
    return(

      <Modal
        transparent={true}
        visible={addTodo}
        animationType='slide'
        style={{ margin: 0 }}
        onRequestClose={()=>setAddToDo(false)}>

          <AddToDoModal
              closeAdd={setAddToDo}
          />

     </Modal>

    )
    
}


  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>ToDo App with React Native and Redux</Text>
      </Card>
      <Spacer />
      <FlatList
        data={todo_list}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return (<TaskCard item ={item} index={index}/>);
        }}
      />
      <Pressable style={{bottom:30,height:50,backgroundColor:'blue',justifyContent:'center',borderRadius:10}} onPress={()=>setAddToDo(true)}>
        <Text style={{alignSelf:'center',color:"white",fontWeight:'bold',fontSize:20,paddingHorizontal:20}}>Add ToDo</Text>
    </Pressable>
      <AddTaskModal/>
    </View>
  );
}

export default TodoApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});



