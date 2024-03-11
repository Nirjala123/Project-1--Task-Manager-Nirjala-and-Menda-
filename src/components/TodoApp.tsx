import React, { useState, useEffect } from "react";
import { Task } from "../types";
import "./TodoApp.css";

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/"
      );
      const data: Task[] = await response.json();
      setTasks(data.slice(0, 10));
    };

    fetchTasks();
  }, []);

  return (
    <div className="todo-app">
      <h1>Task Manager</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
