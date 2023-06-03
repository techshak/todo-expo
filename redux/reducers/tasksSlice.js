import { createSlice } from "@reduxjs/toolkit"
import { EDITTASKCASES, TASKSTATUS } from "../../utils/TypeConstants";


const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        taskList:[
            {id: 1, task: "Do this stuff", status:"due", title:"Title of Task"},
            {id: 2, task: "Do another stuff", status:"done", title:"Title of Task"},
            {id: 3, task: "Do another stuff again", status:"late", title:"Title of Task"},
        ]
    },
  
    reducers: {
      setUsertaskDetails(state, action) {
        state.taskList = [...state.taskList,action.payload]
      },

      setUserTaskComplete(state, action){
        state.taskList[action.payload].status = TASKSTATUS.DONE
      },

      editUserTaskDetails(state, action){
       if (action.payload.type == EDITTASKCASES.EDITTASK){
          const {data} = action.payload;
         state.taskList.map((task,index)=>{
            if (task.id === data.id){
              state.taskList[index] = data;
            }
          });
       }
      },

      clearState(state){
        state.taskList = null
      },
   

    }
  });

  export const { setUsertaskDetails, clearState, setUserTaskComplete, editUserTaskDetails } = tasksSlice.actions;

  export const UserTasks = (state) => state.tasks.taskList;

  export default tasksSlice.reducer;
