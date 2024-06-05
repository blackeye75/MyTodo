import { useEffect, useState } from "react";
import "./App.css";
import { TodoContextProvider} from "./context/TodoContext";
import TodoForm from "./component/TodoForm";
import TodoList from "./component/TodoList";

function App() {
  const [todos, settodos] = useState([]);
  const addTodo = (todo) => {
    settodos((prevTodos) => [{ id: Date.now(), ...todo }, ...prevTodos]);
  };
  const updateTodo = (id,todo) => {
    settodos((prevTodos) =>
      prevTodos.map((eachTodo) => (eachTodo.id === id ? todo : eachTodo))
    );
  };

  const deleteTodo = (id) => {
    settodos((prevTodos) => prevTodos.filter((eachTodo) => eachTodo.id !== id));
  };

  const toggleComplete = (id) => {
    settodos((prevTodos) =>
      prevTodos.map((eachTodo) =>
        eachTodo.id === id
          ? { ...eachTodo, completed: !eachTodo.completed }
          : eachTodo
      )
    );
  };

  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length>0){
      settodos(todos);
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos])

  return (
    <TodoContextProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="w-full h-screen  flex justify-center p-3 items-start bg-slate-800">
        <div className=" text-white text-center w-full sm:w-[60%] max-h-[60%] mt-10 rounded-lg  h-fit  bg-black ">
          <h1 className="text-2xl mt-3 uppercase font-semibold" >Todos</h1>
          <div className="input-box " >
            <TodoForm/>
          </div>
          <div  className="todos-list" >
          <h1 className='text-xl text-center p-5 uppercase' >Your Todo's</h1>
             {
              todos.map((value)=>{
                return (
                  <TodoList key={value.id} todo={value} />
                )
              })
             }
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
