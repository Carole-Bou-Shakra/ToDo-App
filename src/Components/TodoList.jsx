import React, { useState } from 'react';
import useTodoStore from '../Store'; // Correct import path for Zustand store
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../index.css'; // Assuming index.css is in the src folder

const TodoList = ({ todoItems }) => {
  const updateTodoItem = useTodoStore((state) => state.updateTodoItem);
  const deleteTodoItem = useTodoStore((state) => state.deleteTodoItem);
  const markAsDone = useTodoStore((state) => state.markAsDone);

  const [editableTaskId, setEditableTaskId] = useState(null); // The ID of the task being edited
  const [editValues, setEditValues] = useState({}); // The values being edited

  // Handle clicking the edit button
  const handleEditClick = (task) => {
    setEditableTaskId(task.id); // Enter edit mode by setting the task ID
    setEditValues(task); // Set the current task values to the form for editing
  };

  // Handle saving the updated task
  const handleSaveClick = () => {
    updateTodoItem(editValues); // Save the updated task
    setEditableTaskId(null); // Exit edit mode
  };

  // Handle input changes in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: value, // Update the respective field in editValues
    }));
  };

  // Function to calculate days left for the task's due date
  const calculateDaysLeft = (dueDate) => {
    const currentDate = new Date();
    const targetDate = new Date(dueDate);
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
  };

  // Function to check if a task is due within the next 24 hours
  const isDueSoon = (dueDate) => {
    const currentDate = new Date();
    const targetDate = new Date(dueDate);
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    return timeDifference <= 24 * 60 * 60 * 1000 && timeDifference > 0; // Due within the next 24 hours
  };

  // Sort tasks by priority, and if priorities are the same, by due date
  const sortedTasks = [...todoItems].sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority; // Sort by priority first
    }
    return new Date(a.dueDate) - new Date(b.dueDate); // If priorities are the same, sort by due date
  });

  return (
    <div>
      <ul>
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <li
              key={task.id}
              className={`mb-4 p-4 rounded-lg bg-gray-700 text-white flex justify-between items-center shadow-md ${
                isDueSoon(task.dueDate) ? 'flash-animation' : ''
              }`}
              style={{ border: '2px solid #333' }}
            >
              {editableTaskId === task.id ? (
                <>
                  <div className="flex flex-col">
                    <input
                      className="p-2 mb-2 bg-gray-700 text-white rounded-md"
                      type="text"
                      name="title"
                      value={editValues.title}
                      onChange={handleInputChange}
                      placeholder="Edit title..."
                    />
                    <input
                      className="p-2 mb-2 bg-gray-700 text-white rounded-md"
                      type="text"
                      name="content"
                      value={editValues.content}
                      onChange={handleInputChange}
                      placeholder="Edit content..."
                    />
                    <select
                      className="p-2 mb-2 bg-gray-700 text-white rounded-md"
                      name="priority"
                      value={editValues.priority}
                      onChange={handleInputChange}
                    >
                      <option value="1">Priority 1</option>
                      <option value="2">Priority 2</option>
                      <option value="3">Priority 3</option>
                      <option value="4">Priority 4</option>
                      <option value="5">Priority 5</option>
                    </select>
                    <input
                      className="p-2 bg-gray-700 text-white rounded-md"
                      type="date"
                      name="dueDate"
                      value={editValues.dueDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-yellow-400 font-bold">({task.priority})</span>
                      <span className="ml-2 font-bold text-lg">{task.title}</span>
                    </div>
                    <div className="text-gray-400 mt-2">
                      {task.content || 'No content available'}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-yellow-400 font-semibold">
                      {calculateDaysLeft(task.dueDate)} Days
                    </div>

                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      onClick={() => markAsDone(task.id)} // Move to done list when clicked
                      title="Mark as Done"
                    />

                    <FaEdit
                      className="cursor-pointer text-blue-400"
                      onClick={() => handleEditClick(task)}
                      title="Edit Task"
                    />
                    <FaTrash
                      className="cursor-pointer text-red-400"
                      onClick={() => deleteTodoItem(task.id)}
                      title="Delete Task"
                    />
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <li>No tasks available.</li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
