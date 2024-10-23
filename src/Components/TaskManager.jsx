import React, { useState } from 'react';
import TodoList from './TodoList';
import DoneList from './DoneList';
import useTodoStore from '../Store';
; // Adjust the path based on where store.js is located
; // Import the Zustand store

const TaskManager = () => {
    // Local state for adding a new task
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskNotes, setNewTaskNotes] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState('Low');
  
    // Zustand store actions and state
    const todoItems = useTodoStore((state) => state.todoItems);
    const addTodoItem = useTodoStore((state) => state.addTodoItem);
    const updateTodoNotes = useTodoStore((state) => state.updateTodoNotes);
    const updateTodoPriority = useTodoStore((state) => state.updateTodoPriority);
    
    // Function to handle adding a new task
    const handleAddTask = () => {
      if (newTaskTitle.trim() === '') return;
  
      const newTask = {
        id: Date.now(),  // Unique id for the task
        title: newTaskTitle,
        notes: newTaskNotes,
        priority: newTaskPriority,
      };
  
      addTodoItem(newTask);  // Add the task using Zustand store
      setNewTaskTitle('');    // Reset the title input
      setNewTaskNotes('');    // Reset the notes input
      setNewTaskPriority('Low');  // Reset the priority to default
    };
  
    return (
      <div className="flex flex-col lg:flex-row gap-8 p-6">
        {/* Input fields for adding new tasks */}
        <div className="mb-4 w-full">
          <input
            className="p-2 border border-gray-300 rounded-md w-full"
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}  // Update local state
            placeholder="Add a new task..."
          />
          <input
            className="p-2 border border-gray-300 rounded-md w-full mt-2"
            type="text"
            value={newTaskNotes}
            onChange={(e) => setNewTaskNotes(e.target.value)}  // Update local state
            placeholder="Add a note..."
          />
          <select
            className="p-2 border border-gray-300 rounded-md w-full mt-2"
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}  // Update local state
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
  
        {/* Todo tasks on the right */}
        <div className="w-full lg:w-2/3">
          <TodoList
            todoTasks={todoItems}  // Pass todo items from Zustand store
            onUpdateNotes={updateTodoNotes}  // Update notes handler
            onUpdatePriority={updateTodoPriority}  // Update priority handler
          />
        </div>
      </div>
    );
  };
  
  export default TaskManager;