import React from 'react';

const DoneList = ({ doneItems }) => {
  return (
    <div>
      
      <ul>
        {doneItems.length > 0 ? (
          doneItems.map((task) => (
            <li key={task.id} className="mb-4 p-4 rounded-lg bg-gray-800 text-white shadow-md">
              <div className="flex justify-between items-center">
                {/* Priority and Title */}
                <div className="flex items-center">
                  <span className="text-yellow-400 font-bold">({task.priority})</span>
                  <span className="ml-2 font-bold text-lg">{task.title}</span>
                </div>
                <div className="text-green-400 font-semibold">Completed</div>
              </div>
              <div className="text-gray-400 mt-2">{task.content || 'No content available'}</div>
              <div className="mt-2">
                <strong>Priority:</strong> {task.priority}
              </div>
              <div className="mt-2">
                <strong>Due Date:</strong> {task.dueDate}
              </div>
            </li>
          ))
        ) : (
          <li>No completed tasks.</li>
        )}
      </ul>
    </div>
  );
};

export default DoneList;
