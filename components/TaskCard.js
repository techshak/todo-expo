import React, { useState } from "react";
import Spacer from "./Spacer";
import { Modal, Pressable, View } from "react-native";
import { FontAwesome as Icon } from '@expo/vector-icons';
import { Title, Paragraph, Card,} from 'react-native-paper';
import ButtonIcon from "./ButtonIcon";
import { TASKSTATUS } from "../utils/TypeConstants";
import { useDispatch } from "react-redux";
import { setUserTaskComplete } from "../redux/reducers/tasksSlice";
import EditToDoModal from "./modals/EditToDoModal";


export default function TaskCard({item,index}){

    let cardBackground = " ";
    if(item.status == TASKSTATUS.DUE){
        cardBackground = '#fff'
    }else if(item.status == TASKSTATUS.DONE){
        cardBackground = '#2EFF2E'
    }else{
        cardBackground ='#FF92A5'
    }
    const dispatch = useDispatch();
    const [editToDo,setEditToDo] = useState(false)
  
    function SetTaskDone(){
      dispatch(setUserTaskComplete(index))
    }

    const EditTaskModal = () => {
      return(
        <Modal 
          transparent={true}
          visible={editToDo}
          animationType='slide'
          useNativeDriver={true}
          style={{ margin: 0 }}
          onRequestClose={() => setEditToDo(false)}>
  
            <EditToDoModal
                toDo={item}
                index={index}
                closeEdit={setEditToDo}
            />
  
       </Modal>
      )
      
  }

    return(
        <View>
            <Card style={{backgroundColor:cardBackground,borderRadius:10}}>
              <Card.Title
                title={`Task`}
                left={(props) => <Icon name="tasks" size={24} color="black" />}
                right={(props) => <ButtonIcon iconName="close" color="red" onPress={() =>{}} />}
              />
              <Card.Content>
                <Paragraph style={{marginBottom:7}}>{item.task}</Paragraph>
              </Card.Content>
              { item.status !== TASKSTATUS.DONE?
                <View style={{marginBottom:10,marginHorizontal:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                  <Pressable onPress={()=>SetTaskDone()} style={{flexDirection:'row',alignItems:"center"}}>
                    <View style={{height:15,width:15,borderRadius:10,borderWidth:1,borderColor:"black"}}/>
                    <Paragraph style={{marginStart:3}}>Mark complete</Paragraph>
                  </Pressable>

                  <Pressable onPress={()=>setEditToDo(true)}>
                    <Paragraph>Edit</Paragraph>
                  </Pressable>
                </View>
                :null}
              
            </Card>
            <Spacer/>
            <EditTaskModal/>
        </View>
    )
}