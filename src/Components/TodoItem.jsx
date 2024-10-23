import React, { useState } from 'react';
import TodoList from './TodoList'; // Component for Todo Items
import DoneList from './DoneList'; // Component for Done Items

const TaskManager = () => {
  const [doneTasks, setDoneTasks] = useState([
    // Sample done tasks data
    { id: 1, title: 'Completed Task 1', isDone: true },
    { id: 2, title: 'Completed Task 2', isDone: true }
  ]);

  const [todoTasks, setTodoTasks] = useState([
    // Sample todo tasks data
    { id: 3, title: 'Pending Task 1', isDone: false },
    { id: 4, title: 'Pending Task 2', isDone: false }
  ]);

  const removeTask = (id) => {
    setDoneTasks(doneTasks.filter(task => task.id !== id));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6">
      {/* Done tasks on the left */}
      <div className="w-full lg:w-1/3">
        <DoneList doneTasks={doneTasks} onRemove={removeTask} />
      </div>
      
      {/* Todo tasks on the right */}
      <div className="w-full lg:w-2/3">
        <TodoList todoTasks={todoTasks} />
      </div>
    </div>
  );
};

export default TaskManager;
