import { useState } from "react"
import TodoForm from "./components/ToDoForm"
import TodoItem from "./components/ToDoItem"
import { ToDoProvider } from "./context/ToDoContext"
import { useEffect } from "react"
import TaskCount from "./components/TaskCount"


function App() {
  const [todos, setTodos] = useState([]) //empty array because null will create problems in loop
  //state has all the todos, not individual

  const addTodo =(todo)=>{
    //setTodos(todo) //with this all old values will get reset
    setTodos((prev)=>[{id:Date.now(), ...todo}, ...prev])
  }

  //add todos
  const updateTodo = (id, todo)=>{
    if (!todo) return; // or throw an error
    //todos.map((todo)=> console.log(todo.id))
    setTodos((prev)=>prev.map(
      //prevTodo is saare todos mein se ek
      (prevTodo)=>
        (prevTodo.id === id? todo:prevTodo)
      ))
      //setTodo as todo if id matches

  }


  const deleteTodo = (id)=>{
    //now we have to form new array which will have all the todos except the one whose id is given
    //map looping not preferred
    setTodos((prev)=> prev.filter((todo)=> todo.id!==id))
    //filter works for only true
    //if id does not match, then passed otherwise removed
  }

  const toggleComplete = (id)=>{
    setTodos((prev)=>
      prev.map((prevTodo)=> 
        prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
    //match nhi karta hai toh prevTodo remains prevTodo
    //agar match karta hai toh baaki values as it is, only one value changed (values: id, todo, completed)
    //completed: !prevTodo.completed, purani value ko overwrite kar dia
  }
  
  useEffect(()=>{
    //local storage can be directly accessed in react so long as we are not working in server side rendering
    //if everything on serverside then nothing reaches browser so how do we save it on save it on browser?
    //local storage is about storage in broowser memeory like
    const todos= JSON.parse(localStorage.getItem('todos'))
    //return string so JSON.parse
    //console.log(todos.length); //returns no. tasks
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
    

    //should be same name of key in set and get: todos(anything but same)
    //only accepts string so JSON.stringify
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
            {/* Todo form goes here */} 
            <TodoForm />
          </div>
          {/* <div>{compLen}/{len}</div> */}
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {/* har ek todoItem ek single Todo hai */}
             {/* //using () means auto return, {} then return keyword necessary
              //if (!todo) return null; // or return an empty fragment <></> */}
              {todos.map((todo) => {
              if (!todo) return null; // or return an empty fragment <></>
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
