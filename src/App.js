import React, { useState } from "react";
import Form from "./components/Form";

import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const toggleComplete = i => {
    setTodos(
      todos.map((todo, k) =>
        k === i
          ? {
              ...todo,
              complete: !todo.complete
            }
          : todo
      )
    );
  };
  return (
    <div className="App">
      <Form
        onSubmit={text => setTodos([{ text, complete: false }, ...todos])}
      />
      <div>
        {todos.map(({ text, complete }, i) => (
          <div
            id="todo"
            className="todo"
            key={Math.random() * 10}
            onClick={() => toggleComplete(i)}
            style={{
              textDecoration: complete ? "line-through" : ""
            }}
          >
            {text}
          </div>
        ))}
      </div>
      <button onClick={() => setTodos([])}>Reset</button>
    </div>
  );
};

export default App;
