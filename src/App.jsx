import { useState, useEffect } from "react";

import "./App.css";

function App() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [edit,setEdit] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [priority, setPriority] = useState("Medium"); //  ek Default 

  const handleAdd = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      alert("Please enter both a title and a description.");
      return;
    }

    if (todos.some((todo) => todo.title === trimmedTitle)) {
      alert("A todo with this title already exists.");
      return;
    }
    
    const newTodo = {
      id: Date.now(),
      title: trimmedTitle,
      description: trimmedDescription,
      priority:priority,
    };

    setTodos([...todos, newTodo]);
    setTitle("");
    setDescription("");
  };
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("myTodoList");
    return saved ? JSON.parse(saved) : [];
  });
  


  function handleDelete(todoTitle) {
    setTodos(todos.filter((todo) => todo.title !== todoTitle));
  }
   
  function handleEdit(todo) {
    setEdit(todo.title);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  }

  function handleSaveEdit() {
    if (!editTitle.trim() || !editDescription.trim()){
      alert("why is title and description empty")
    }
    setTodos(
      todos.map((todo) =>
        todo.title === edit ? { title: editTitle, description: editDescription } : todo
      )
    );
    setEdit(null);
  };
  const filteredTodos = todos.filter((todo)=>
    todo.title.toLowerCase().includes(search.toLowerCase())
  )
  // local storage pe update hota rhe ga 
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(todos));
  }, [todos]);

  
  
 

  return (
    <div className="app-container">


      <h1 className="main-title">Todo List</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Title"
          value={title}
          
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">🔴 High</option>
        <option value="Medium">🟡 Medium</option>
        <option value="Low">🟢 Low</option>
        </select>

        <button onClick={handleAdd}>Add</button>
        
      </div>
      <p className="task-count">Need to complete: {filteredTodos.length} tasks</p>

      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <p className="empty-msg">No todos found.</p>
        ) : (
          filteredTodos.map((todo, index) => (
            
            <li key={index} className="todo-item">
              {edit === todo.title ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={() => setEdit(null)}>Cancel</button>
                </>
              ) : (
                <div className="todo-content">
                  <span className={`priority-badge ${todo.priority?.toLowerCase()}`}>
                {todo.priority}
                    </span>

                  <h3 className="todo-title">{todo.title}</h3>
                  <p className="todo-description">{todo.description}</p>
                  <div className="todo-actions">
                    <button onClick={() => handleDelete(todo.title)}>
                      Delete
                    </button>
                    <button onClick={() => handleEdit(todo)}>Edit</button>
                  </div>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
