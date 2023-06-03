import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { Card, TextInput, Title, Button } from "react-native-paper";
import Spacer from "../Spacer";
import { useDispatch } from "react-redux";
import { TASKSTATUS } from "../../utils/TypeConstants";
import { setUsertaskDetails } from "../../redux/reducers/tasksSlice";

export default function AddToDoModal({closeAdd}){

    const [task, setTask] = useState('');
    const [title, setTitle] = useState('');
    const [buttonDisable, setButtonDisable] = useState(true)
    const dispatch = useDispatch();

    useEffect(()=>{

        if(title !== ''){
            setButtonDisable(false)
        }else setButtonDisable(true)

    },[task,title])

    function AddToDo(){
        let taskData = {
            id: Math.random(), 
            task: task, 
            status:TASKSTATUS.DUE, 
            title:title
        }
        dispatch(setUsertaskDetails(taskData))
    }

    return(
        <Pressable style={{flex:1,backgroundColor:'#000000aa'}} onPress={()=>closeAdd(false)}>
            <Card style={{position:'absolute',bottom:0,width:'100%',borderTopLeftRadius:15,borderTopRightRadius:15}}>
                <Card.Content>
                <Title>Add ToDo Here</Title>

                <TextInput
                    mode="outlined"
                    label="Title"
                    value={title}
                    multiline={false}
                    onChangeText={title => setTitle(title)}
                />
                
                <TextInput
                    mode="outlined"
                    label="Task"
                    value={task}
                    multiline={true}
                    onChangeText={task => setTask(task)}
                />
                <Spacer/>
                <Button mode="contained" onPress={()=> AddToDo()} disabled={buttonDisable}>
                    Add
                </Button>
                </Card.Content>
            </Card>
      <Spacer />
    </Pressable>
    )
}