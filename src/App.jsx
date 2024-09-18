import { useState } from "react"
import TodoForm from "./components/ToDoForm"
import TodoItem from "./components/ToDoItem"
import { ToDoProvider } from "./context/ToDoContext"
import { useEffect } from "react"
import TaskCount from "./components/TaskCount"


function App() {
  const [todos, setTodos] = useState([]) l

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

  return (
    <ToDoProvider value={{todos, addTodo,updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold mb-8 mt-2 text-start">
          <span className="bg-white text-black px-2 mr-4 py-0 flex items-center w-max mb-2">+</span>
            Todos
          </h1>
          <div className="my-10"><TaskCount total={len} complete={compLen}/></div>
          <div className="my-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
              {todos.map((todo) => {
              if (!todo) return null; 
              return (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ToDoProvider>
  )
}

export default App
