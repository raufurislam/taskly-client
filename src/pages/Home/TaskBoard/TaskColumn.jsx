import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import { IoMdArrowDropright } from "react-icons/io";
import { LuCalendar } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const TaskColumn = ({ category }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category,
    imageUrl: "",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [showInput, setShowInput] = useState(false);

  // Add a new task
  const addTask = () => {
    if (newTask.title.trim() === "") return;

    const task = {
      ...newTask,
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", category, imageUrl: "" });
    setShowInput(false);
  };

  // Open edit form
  const editTask = (task) => {
    setEditingTask(task);
  };

  // Save edited task
  const saveTask = () => {
    setTasks(
      tasks.map((task) => (task.id === editingTask.id ? editingTask : task))
    );
    setEditingTask(null);
  };

  // Remove task
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="w-96 mx-auto bg-base-300 text-text1 shadow-md rounded-2xl p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{category}</h2>
        <div className="flex items-center gap-2 text-text2">
          <IoMdArrowDropright className="cursor-pointer hover:text-primary" />
          <BsThreeDots className="cursor-pointer hover:text-primary" />
        </div>
      </div>

      {/* Task List */}
      <div className="mt-4 space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-base-200 p-3 rounded-md cursor-pointer hover:bg-base-100"
            onClick={() => editTask(task)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-primary">{task.title}</h3>
              <div className="flex items-center gap-2">
                <FaEdit className="cursor-pointer text-blue-500 hover:text-blue-700" />
                <AiOutlineClose
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTask(task.id);
                  }}
                />
              </div>
            </div>
            {task.imageUrl && (
              <img
                src={task.imageUrl}
                alt="Task"
                className="w-full h-32 object-cover mt-2 rounded-md"
              />
            )}
            {task.description && (
              <p className="text-sm text-text2 mt-1">{task.description}</p>
            )}
            <p className="text-xs text-text3 mt-1">{task.timestamp}</p>
            <p className="text-xs text-text4 mt-1">Category: {task.category}</p>
          </div>
        ))}
      </div>

      {/* Add Task Input */}
      {showInput ? (
        <div className="mt-2 space-y-2 bg-base-200 p-3 rounded-md">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-2 rounded-md bg-base-100 text-text1 outline-none"
            placeholder="Title (max 50 chars)"
            maxLength={50}
            required
          />
          <textarea
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full p-2 rounded-md bg-base-100 text-text1 outline-none"
            placeholder="Description (max 200 chars)"
            maxLength={200}
          />
          <input
            type="text"
            value={newTask.imageUrl}
            onChange={(e) =>
              setNewTask({ ...newTask, imageUrl: e.target.value })
            }
            className="w-full p-2 rounded-md bg-base-100 text-text1 outline-none"
            placeholder="Image URL (Optional)"
          />
          <button
            onClick={addTask}
            className="w-full py-2 bg-primary text-white rounded-md"
          >
            Add Task
          </button>
        </div>
      ) : (
        <div
          className="flex items-center gap-2 mt-4 cursor-pointer text-text2 hover:text-primary"
          onClick={() => setShowInput(true)}
        >
          <HiOutlinePlus />
          <p>Add a card</p>
          <LuCalendar className="ml-auto cursor-pointer" />
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-base-300 p-5 rounded-lg w-96">
            <h3 className="text-lg font-bold text-primary">Edit Task</h3>
            <input
              type="text"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
              className="w-full p-2 rounded-md bg-base-100 text-text1 outline-none mt-2"
              placeholder="Title"
              maxLength={50}
            />
            <textarea
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({ ...editingTask, description: e.target.value })
              }
              className="w-full p-2 rounded-md bg-base-100 text-text1 outline-none mt-2"
              placeholder="Description"
              maxLength={200}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={saveTask}
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskColumn;
