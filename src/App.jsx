import { useState, useEffect } from "react";
import { MdAddToPhotos } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  const handleAddTaskBtn = () => {
    if (input.trim()) {
      const task = {
        id: Date.now(),
        title: input,
        date: new Date().toLocaleDateString("en-EN", {
          year: "numeric",
          month: "long",
        }),
      };

      setTasks((prevTasks) => [...prevTasks, task]);
      setInput("");
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleUpdate = (id, newTitle) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          id: task.id,
          title: newTitle,
          date: task.date,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
          🌄My Todo List✅
        </h1>
        <div className="flex space-x-3 mb-6">
          <input
            type="text"
            placeholder="Enter Your Task👨‍💻 ... "
            className="flex-1 border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInput}
            value={input}
          />
          <button
            className="bg-blue-500 text-white font-medium p-4 rounded-md hover:bg-blue-600 transition"
            onClick={handleAddTaskBtn}
          >
            <MdAddToPhotos className=" text-xl" />
          </button>
        </div>
        {tasks.map((task) => (
          <div
            className="flex items-center justify-between p-4 bg-gray-100 rounded-md mb-3 shadow-sm"
            key={task.id}
          >
            <div className="flex-1">
              <span className="block text-gray-800 font-medium">
                {task.title}
              </span>
              <span className="block text-sm text-gray-500">
                Created on: {task.date}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition flex items-center"
                onClick={() => handleUpdate(task.id, input)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition flex items-center"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {tasks.length > 2 && (
          <button
            className="bg-red-300 text-white p-3 rounded-md hover:bg-red-600 transition mt-6 w-full"
            onClick={handleClearAll}
          >
            Clear All Tasks
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
