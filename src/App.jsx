import { useState, useEffect } from "react";
import { MdAddToPhotos } from "react-icons/md";

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

  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-pink-500 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-gray-800 shadow-xl rounded-lg w-full max-w-lg p-6 text-white">
        <h1 className="text-4xl font-bold text-center mb-6 neon-text">
          🌄 My Todo List ✅
        </h1>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-x-3 sm:space-y-0 mb-6">
          <input
            type="text"
            placeholder="Enter Your Task👨‍💻 ... "
            className="flex-1 border-2 border-purple-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
            onChange={handleInput}
            value={input}
          />
          <button
            className="bg-indigo-600 text-white font-medium p-4 rounded-md hover:bg-indigo-700 transition mt-3 sm:mt-0 sm:w-auto w-full"
            onClick={handleAddTaskBtn}
          >
            Ajouter
          </button>
        </div>
        {tasks.map((task) => (
          <div
            className="flex items-center justify-between p-4 bg-gray-700 rounded-md mb-3 shadow-md hover:shadow-xl transition"
            key={task.id}
          >
            <div className="flex-1">
              <span className="block text-gray-300 font-medium">
                {task.title}
              </span>
              <span className="block text-sm text-gray-400">
                Created on: {task.date}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition flex items-center"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {tasks.length > 2 && (
          <button
            className="bg-pink-600 text-white p-3 rounded-md hover:bg-pink-700 transition mt-6 w-full"
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
