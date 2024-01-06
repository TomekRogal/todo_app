import Task from "./Task";
import React, {useEffect, useState} from "react";
import {getTasks} from "../js/tasks";

const Tasks = ({refresh, setRefresh}) => {
    const [allTask,setTask] = useState([])
    useEffect(() => {
        getTasks((data)=>setTask(data));
    }, [refresh]);
    return (
   allTask.map((ele)=>(
       <Task key={ele.id} task={ele} refreshApp={setRefresh}/>
   )))
}
export default Tasks;