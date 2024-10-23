import React, { useState, useEffect } from 'react';

const TaskForm = ({ currentTask, onSave }) => {
  const [task, setTask] = useState({
    title: '',
    content: '',
    priority: 1,
    dueDate: '',
  });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask); // Load the current task for editing
    }
  }, [currentTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task); // Save the task
    setTask({ title: '', content: '', priority: 1, dueDate: '' }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-md">
      <div className="mb-4">
        <label className="block text-white mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="w-full p-2 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Details:</label>
        <textarea
          name="content"
          value={task.content}
          onChange={handleChange}
          className="w-full p-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Priority (1-5):</label>
        <input
          type="number"
          name="priority"
          value={task.priority}
          onChange={handleChange}
          min="1"
          max="5"
          className="w-full p-2 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="w-full p-2 rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-500 p-2 rounded-md text-white"
      >
        {currentTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
