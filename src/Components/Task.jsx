import React from 'react';

const Task = ({ task, onMarkAsDone, onDelete, onEdit }) => {
  return (
    <div className={`p-4 mb-4 rounded-lg border-2 ${task.isDone ? 'bg-gray-800 text-gray-400 border-gray-600 line-through' : 'bg-gray-700 text-white border-gray-500'}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">
          {task.title} <span className="text-sm text-gray-400">({task.priority})</span>
        </h3>
        <span className="text-sm">{task.isDone ? 'Completed' : `Due: ${task.dueDate}`}</span>
      </div>
      <p className="text-sm">{task.content || 'No additional details provided.'}</p>
      <div className="flex gap-2">
        <button onClick={onMarkAsDone} className="bg-green-600 hover:bg-green-500 p-2 rounded-md text-white">
          {task.isDone ? 'Mark as Incomplete' : 'Mark as Done'}
        </button>
        <button onClick={onEdit} className="bg-yellow-600 hover:bg-yellow-500 p-2 rounded-md text-white">
          Edit
        </button>
        <button onClick={onDelete} className="bg-red-600 hover:bg-red-500 p-2 rounded-md text-white">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
