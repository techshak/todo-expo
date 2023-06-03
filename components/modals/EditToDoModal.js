import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { Card, TextInput, Title, Button } from "react-native-paper";
import Spacer from "../Spacer";
import { useDispatch } from "react-redux";
import { editUserTaskDetails } from "../../redux/reducers/tasksSlice";
import { serialize } from "redux-toolkit";
import { EDITTASKCASES } from "../../utils/TypeConstants";

export default function EditToDoModal({ closeEdit, toDo }){

    const [task, setTask] = useState(toDo.task);
    const [title, setTitle] = useState(toDo.title);
    const [buttonDisable, setButtonDisable] = useState(true);
    const dispatch = useDispatch();
    const updatedTask = {id: toDo.id, task: task, status:toDo.status, title:title}

    useEffect(()=>{

        if(title !== ''){
            setButtonDisable(false)
        }else setButtonDisable(true)

    },[task,title])

    function EditToDo(){
        dispatch(editUserTaskDetails({type:EDITTASKCASES.EDITTASK,data:updatedTask}))
        closeEdit(false)
    }

    return(
        <Pressable style={{flex:1,backgroundColor:'#000000aa'}} onPress={()=>closeEdit(false)}>
            <Card style={{position:'absolute',bottom:0,width:'100%',borderTopLeftRadius:15,borderTopRightRadius:15}}>
                <Card.Content>
                <Title>Edit ToDo</Title>

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
                <Button mode="contained" onPress={()=>EditToDo()} disabled={buttonDisable}>
                    Save
                </Button>
                </Card.Content>
            </Card>
      <Spacer />
    </Pressable>
    )
}