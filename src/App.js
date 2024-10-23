import React, { useState } from 'react';
import TodoList from './Components/TodoList'; // Corrected path for TodoList component
import DoneList from './Components/DoneList'; // Corrected path for DoneList component
import useTodoStore from './Store'; // Corrected path for Zustand store
import { FaPlus } from 'react-icons/fa'; // Add FontAwesome icon

const App = () => {
  const addTodoItem = useTodoStore((state) => state.addTodoItem);
  const todoItems = useTodoStore((state) => state.todoItems);
  const doneItems = useTodoStore((state) => state.doneItems);

  const [newTask, setNewTask] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newPriority, setNewPriority] = useState('1');
  const [newDueDate, setNewDueDate] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [isFormVisible, setIsFormVisible] = useState(false); // Toggle form visibility

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTodoItem({
        id: Date.now(),
        title: newTask,
        content: newContent,
        priority: newPriority,
        dueDate: newDueDate,
        isDone: false,
      });
      setNewTask('');
      setNewContent('');
      setNewPriority('1');
      setNewDueDate('');
      setIsFormVisible(false); // Close the form after adding the task
    }
  };

  // Filter todo items based on search term
  const filteredTodoItems = todoItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="h-[100vh] w-full flex flex-col items-center p-4 relative"
      style={{ 
        backgroundImage: `url('/imagestar.jpg')`,
        backgroundSize: 'cover' // Ensures the image covers the entire screen
      }}
    >
      <header className="w-full max-w-4xl text-center mt-5 mb-5"> {/* Added margin-bottom */}
      <h1 className="text-4xl font-bold mt-12 mb-12" style={{ color: 'white' }}>tasX - get things done</h1>

        {/* Centered Search Bar and Add Task Button */}
        <div className="flex justify-center items-center gap-4 mb-5 mt-5"> {/* Increased margin-bottom */}
          {/* Add Task Button */}
          <FaPlus
            className="text-3xl cursor-pointer hover:text-yellow-500"
            style={{ color: '#950135' }} // Set the icon color
            onClick={() => setIsFormVisible(!isFormVisible)}
            title="Add Task"
          />

          {/* Search Input */}
          <input
            className="px-4 py-2 w-full max-w-md bg-gray-700 text-white rounded-[30px] focus:outline-none focus:ring-2 mt-5 mb-5" // Increased margin-bottom
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Capture the search input
            placeholder="Search tasks..."
            style={{ backgroundColor: '#950135', color: 'white' }} // Set background and text color
          />
        </div>
      </header>

   {/* Centered Form */}
   {isFormVisible && (
  <div
    className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-80"
    style={{ zIndex: 1000 }}
  >
    <div
      className="p-6 rounded-[30px] w-full max-w-lg mx-4 mb-8"
      style={{ backgroundColor: '#c7b4ad' }} // Form background color updated
    >
      <h2 className="text-xl font-semibold mb-8" style={{ color: '#950135' }}>Add New Task</h2>
      <input
        className="px-4 py-2 w-full rounded-[30px] mb-8"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Task Title"
        style={{ backgroundColor: '#e0c7b8', color: 'black' }} // Input background and text color updated
      />
      <input
        className="px-4 py-2 w-full rounded-[30px] mb-8"
        type="text"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="Task Details"
        style={{ backgroundColor: '#e0c7b8', color: 'black' }} // Input background and text color updated
      />
      <select
        className="px-4 py-2 w-full rounded-[30px] mb-8"
        value={newPriority}
        onChange={(e) => setNewPriority(e.target.value)}
        style={{ backgroundColor: '#e0c7b8', color: 'black' }} // Select background and text color updated
      >
        <option value="1">Priority 1</option>
        <option value="2">Priority 2</option>
        <option value="3">Priority 3</option>
        <option value="4">Priority 4</option>
        <option value="5">Priority 5</option>
      </select>
      <input
        className="px-4 py-2 w-full rounded-[30px] mb-8"
        type="date"
        value={newDueDate}
        onChange={(e) => setNewDueDate(e.target.value)}
        style={{ backgroundColor: '#e0c7b8', color: 'black' }} // Input background and text color updated
      />
      <button
        className="font-bold px-4 py-2 rounded-[30px] w-full mb-8 hover:bg-[#AE5E6F]"
        style={{ backgroundColor: '#950135', color: 'black' }} // Button background and text color updated
        onClick={handleAddTask}
      >
        Add Task
      </button>
      <button
        className="mt-4 font-bold w-full text-center rounded-[30px] px-4 py-2 hover:bg-[#AE5E6F]"
        style={{ backgroundColor: '#950135', color: 'black' }} // Close button background and text color updated
        onClick={() => setIsFormVisible(false)} // Close the form
      >
        Close
      </button>
    </div>
  </div>
)}

      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 mb-10"> {/* Increased margin-bottom */}
        <div className="todo-section">
          <h2 className="text-2xl font-semibold mb-8 mt-8" style={{  color: '#950135' }}>Todo Items</h2> {/* Increased margin-bottom */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-12" style={{ backgroundColor: '#950135' }}> {/* Increased margin-bottom */}
            <TodoList todoItems={filteredTodoItems} /> {/* Pass filtered todo items */}
          </div>
        </div>

        <div className="done-section">
          <h2 className="text-2xl font-semibold mb-8 mt-8" style={{ color: '#950135' }}>Done Items</h2> {/* Increased margin-bottom */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-12" style={{ backgroundColor: '#950135' }}> {/* Increased margin-bottom */}
            <DoneList doneItems={doneItems} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
