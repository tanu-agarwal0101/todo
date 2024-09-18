/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";

export const ToDoContext = createContext({
    todos:[
        {
            id:1,
            todo: "todo message",
            completed: false
        },// {}, {}
    ],
    addTodo: (todo)=>{}, //only references
    updateTodo: (id, todo)=>{}, //functionality of methods in app.jsx
    deleteTodo: (id)=>{},
    toggleComplete: (id)=>{} 
})


export const useToDo=()=>{
    //useContext ko ek context dena padega ki kiske baare mein baat kar rhe hai
    return useContext(ToDoContext)
}


export const ToDoProvider = ToDoContext.Provider
/* instead of wrapping our components in <ToDoContext.Provider>, we simply wrap in <ToDoProvider> */

