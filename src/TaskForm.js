import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
    let [title, setTitle] = useState(''); // Local state to store the title input

    let handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        onAddTask({ title, status: 'pending' });  // Call onAddTask prop with new task
        setTitle(''); // Clear the input field after submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Add new task" />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;
