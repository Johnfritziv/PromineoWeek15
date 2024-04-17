import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './App.css';


let apiEndpoint = 'https://65f5ee0c41d90c1c5e0a66da.mockapi.io/Promineo_API/tasks'; // API endpoint URL


function App() {
  
  let [tasks, setTasks] = useState([]);  // State to hold tasks

    // Fetch tasks from the API when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from the API
  let fetchTasks = async () => {
    let response = await fetch(apiEndpoint);
    let data = await response.json();
    setTasks(data); // Set the fetched tasks to state
  };

  // Function to add a new task
  let addTask = async task => {
    let response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    let data = await response.json();
    setTasks([...tasks, data]); // Add the new task to the current tasks
  };

  // Function to update an existing task
  let updateTask = async (id, updatedTask) => {
    await fetch(`${apiEndpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });
    fetchTasks(); // Refresh the list to show updated data
  };
  
// Function to delete a task
  let deleteTask = async id => {
    await fetch(`${apiEndpoint}/${id}`, {
      method: 'DELETE'
    });
    setTasks(tasks.filter(task => task.id !== id)); // Remove the task from the state
  };

  return (
    <div>
      <h1>To-do List</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
    </div>
  );
}

export default App;
