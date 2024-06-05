import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodoContext();

  const submitTodo = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <div className="input mt-4 px-3 py-2  ">
    <form onSubmit={submitTodo} >
    <input
        type="text"
        placeholder="Add todo"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        className="px-2 py-1 rounded-l-md text-black outline-none w-[60%]"
      />
      <button
        className="px-3 font-semibold bg-blue-500 py-1 rounded-e-md "
        type="submit"
      >
        ADD
      </button>
    </form>
    </div>
  );
};

export default TodoForm;
