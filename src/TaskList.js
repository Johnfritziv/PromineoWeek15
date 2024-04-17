import React, { useState } from 'react';

function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  let [editTaskId, setEditTaskId] = useState(null);
  let [editedTitle, setEditedTitle] = useState("");

  let handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditedTitle(task.title);
  };

  let handleSave = (id) => {
    onUpdateTask(id, { title: editedTitle });
    setEditTaskId(null); // Exit edit mode
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {editTaskId === task.id ? (
            <input
              type="text"
              value={editedTitle}
              onChange={e => setEditedTitle(e.target.value)}
            />
          ) : (
            <span>{task.title} - {task.status}</span>
          )}

          {editTaskId === task.id ? (
            <button onClick={() => handleSave(task.id)}>Save</button>
          ) : (
            <button onClick={() => handleEdit(task)}>Edit</button>
          )}

          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
          <button onClick={() => onUpdateTask(task.id, { ...task, status: 'completed' })}>Mark as Completed</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
