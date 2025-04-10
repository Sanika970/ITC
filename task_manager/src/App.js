import React from "react";
import "./App.css";
function App() {
  const [todos, setTodos] = React.useState([]); 
  // Creating hooks.
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  // to do editing id value hence we want to keep it empty.
  React.useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);
  React.useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);
  function handleSubmit(e) {
    e.preventDefault(); //to avoid refresh error
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }
  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id == id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id == id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }
  return (
    <div className="App">
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/currency.mp4" type="video/mp4"/>
      </video>
      <h1>Task Manager</h1>

      <div className="area">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button type="submit"> Add Todo </button>
        </form>

        {todos.map((todo) => (
          <div key={todo.id}>
            {todoEditing == todo.id ? (
              <input
                type="text"

                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
              />
            ) : (
              <div>{todo.text}</div>
            )}
            <div>{todo.text}</div>
            <input
              type="text"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <input
              type="checkbox"
              onChange={() => toggleComplete(todo.id)}
              checked={todo.completed}
            />
            {todoEditing == todo.id ? (
              <button onClick={() => editTodo(todo.id)}> submit edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit todo</button>
            )}
            
          </div>
        ))}   
        {/* map: goes hrougn each array and returns some value.
    naming each element of the array by todo
    key value: to access the id */}
      </div>
    </div>
  );
}
export default App;

