import { useState } from "react"
import TodoForm from "./components/ToDoForm"
import TodoItem from "./components/ToDoItem"
import { ToDoProvider } from "./context/ToDoContext"
import { useEffect } from "react"
import TaskCount from "./components/TaskCount"
import PomodoroTimer from "./components/PomodoroTime"


function App() {
  const [todos, setTodos] = useState([]) ;

  const addTodo =(todo)=>{
    setTodos((prev)=>[{id:Date.now(), ...todo}, ...prev])
  }

  //add todos
  const updateTodo = (id, todo)=>{
    if (!todo) return; // or throw an error
    //todos.map((todo)=> console.log(todo.id))
    setTodos((prev)=>prev.map(
      (prevTodo)=>
        (prevTodo.id === id? todo:prevTodo)
      ))
  }


  const deleteTodo = (id)=>{
    setTodos((prev)=> prev.filter((todo)=> todo.id!==id))
  }

  const toggleComplete = (id)=>{
    setTodos((prev)=>
      prev.map((prevTodo)=> 
        prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }
  
  useEffect(()=>{
    //local storage can be directly accessed in react so long as we are not working in server side rendering
    //if everything on serverside then nothing reaches browser so how do we save it on save it on browser?
    //local storage is about storage in broowser memeory like
    const todos= JSON.parse(localStorage.getItem('todos'))
    if(todos && todos.length>0){
      setTodos(todos.filter((todo)=> todo!==null))
    }
  }, [])
  
  const len= todos.length
  const comp = todos.filter((todo)=>todo.completed)
  const compLen=(comp.length);
  useEffect(()=>{  
    localStorage.setItem('todos', JSON.stringify(todos))    
    console.log(len);
  }, [todos])

  const categorizeTasks = (todos) => {
    const categorized = {
        Q1: [],
        Q2: [],
        Q3: [],
        Q4: []
    };

    todos.forEach((todo) => {
        if (todo.priority === "Important" && todo.urgency === "Urgent") {
            categorized.Q1.push(todo);
        } else if (todo.priority === "Important" && todo.urgency === "Not Urgent") {
            categorized.Q2.push(todo);
        } else if (todo.priority === "Not Important" && todo.urgency === "Urgent") {
            categorized.Q3.push(todo);
        } else {
            categorized.Q4.push(todo);
        }
    });

    return categorized;
};

const categorizedTasks = categorizeTasks(todos);

const handlePomodoroComplete = (isBreak) => {
  if (isBreak) {
      alert("Break time is over! Get back to work!");
  } else {
      alert("Time to take a break!");
      // Optionally, you can also mark a task as completed here
      // For example, if you want to mark the first task as completed:
      // if (todos.length > 0) {
      //     updateTodo(todos[0].id, { completed: true });
      // }
      if (todos.length > 0) {
        updateTodo(todos[0].id, { completed: true });
    }
    // Log the completed Pomodoro session
    console.log(`Pomodoro session completed!`);
  }
};

  return (
    <ToDoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold mb-8 mt-2 text-start">
          <span className="bg-white text-black px-2 mr-4 py-0 flex items-center w-max mb-2">+</span>
            Todos
            <span><PomodoroTimer onComplete={handlePomodoroComplete} /></span>
          </h1>
          
          <div className="my-10"><TaskCount total={len} complete={compLen}/></div>
          <div className="my-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
              {Object.entries(categorizedTasks).map(([key, tasks]) => (
                        <div key={key} className="w-full">
                            <h3 className="text-lg font-bold">{key === 'Q1' ? 'Urgent & Important' : key === 'Q2' ? 'Not Urgent & Important' : key === 'Q3' ? 'Urgent & Not Important' : 'Not Urgent & Not Important'}</h3>
                            <ul>
                                {tasks.map((todo) => (
                                    <li key={todo.id}>
                                        <TodoItem todo={todo} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
          </div>
        </div>
        
      </div>
      
    </ToDoProvider>
  )
}

export default App
