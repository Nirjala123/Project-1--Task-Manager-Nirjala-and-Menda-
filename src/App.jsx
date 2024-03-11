// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Fetch tasks from the API
    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then(data => setTasks(data.slice(0, 5))); // Limiting to first 5 tasks for simplicity
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, title: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTask = (taskId, newTitle) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, title: newTitle } : task
    ));
  };

  return (
    <div className="todo-app">
      <h1>Task Manager</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>{task.title}</span>
            <div className="task-buttons">
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              <button onClick={() => {
                const newTitle = prompt('Enter new title:', task.title);
                if (newTitle !== null) {
                  editTask(task.id, newTitle);
                }
              }}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
