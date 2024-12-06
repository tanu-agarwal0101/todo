/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useToDo } from '../context/ToDoContext';

function TodoForm() {
    const [todo, setTodo] = useState('')
    const {addTodo} = useToDo();
    const [priority, setPriority] = useState("Important");
    const [urgency, setUrgency] = useState("Urgent");

    const importanceColors = {
        Important: 'bg-red-500', // Red for Important
        'Not Important': 'bg-gray-300', // Gray for Not Important
      };
    
      const urgencyColors = {
        Urgent: 'bg-yellow-500', // Yellow for Urgent
        'Not Urgent': 'bg-green-300', // Green for Not Urgent
      };
    
      const combinedColor = `${importanceColors[priority]} ${urgencyColors[urgency]}`; // Combine colors

    const add =(e)=>{
        e.preventDefault()
        if(!todo) return
        addTodo({todo, completed:false, priority, urgency})
        //could have written todo:todo like with completed but if key and value name is same then we can skip it
        //id already Date.now() se denge addTodo mein

        setTodo('')
        setPriority("Important");
        setUrgency("Urgent");
    }
   return (
        <form  onSubmit={add} className="flex">
            <input type="text" placeholder="Write Todo..."
            className={`w-full border text-black border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white py-1.5`} value={todo} onChange={(e)=> setTodo(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="bg-white text-black">
                <option value="Important" className=''>Important</option>
                <option value="Not Important">Not Important</option>
            </select>
            <select value={urgency} onChange={(e) => setUrgency(e.target.value)} className="bg-white lg:pl-5 lg:pr-4 text-black">
                <option value="Urgent">Urgent</option>
                <option value="Not Urgent">Not Urgent</option>
            </select>
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white 
            shrink-0 text-2xl font-black">
                +
            </button>
        </form>
    );}

export default TodoForm;


