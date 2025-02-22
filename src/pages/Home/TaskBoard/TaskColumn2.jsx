import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import { IoMdArrowDropright } from "react-icons/io";
import { LuCalendar } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheck, FaCross, FaCut, FaEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// import useAuth from "../hooks/useAuth";
import { ImCross } from "react-icons/im";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const TaskColumn = ({ category }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category,
  });
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [showInput, setShowInput] = useState(false);

  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosPublic.get(`/tasks?email=${user.email}`);
      // console.log(res.data);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Add Task
  const addTask = async () => {
    if (!newTask.title.trim()) return;
    const task = {
      ...newTask,
      email: user.email,
      timestamp: new Date().toLocaleString(),
    };
    try {
      const res = await axiosPublic.post("/tasks", task);
      if (res.data.insertedId) {
        refetch();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
    setNewTask({ title: "", description: "", category, imageUrl: "" });
    setShowInput(false);
  };

  // Remove Task
  const removeTask = async (id) => {
    try {
      await axiosPublic.delete(`/tasks/${id}`);
      refetch();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Update Task
  const updateTask = async (id) => {
    try {
      await axiosPublic.put(`/tasks/${id}`, editedTask);
      setEditingTask(null);
      refetch();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="w-96 mx-auto bg-base-300 text-text1 shadow-md rounded-2xl p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{category}</h2>
        <div className="flex items-center gap-2 text-text2">
          <IoMdArrowDropright className="cursor-pointer hover:text-primary" />
          <BsThreeDots className="cursor-pointer hover:text-primary" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {tasks
          .filter((t) => t.category === category)
          .map((task) => (
            <div
              key={task._id}
              className="bg-base-200 p-3 rounded-md hover:bg-base-100"
            >
              <div className="flex justify-between items-center">
                {editingTask === task._id ? (
                  <div>
                    {" "}
                    <input
                      type="text"
                      value={editedTask.title || task.title}
                      onChange={(e) =>
                        setEditedTask({ ...editedTask, title: e.target.value })
                      }
                      className="w-full p-2 rounded-md bg-base-100 text-text1"
                    />
                  </div>
                ) : (
                  <h3 className="font-bold text-primary">{task.title}</h3>
                )}
                <div className="flex items-center gap-2">
                  {editingTask === task._id ? (
                    <>
                      <button
                        onClick={() => updateTask(task._id)}
                        className="text-green-500"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => setEditingTask(null)}
                        className="text-red-500"
                      >
                        <AiOutlineClose />
                      </button>
                    </>
                  ) : (
                    <FaEdit
                      onClick={() => {
                        setEditingTask(task._id);
                        setEditedTask(task);
                      }}
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                    />
                  )}
                  {editingTask === null && (
                    <AiOutlineClose
                      onClick={() => removeTask(task._id)}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                    />
                  )}
                </div>
              </div>
              {editingTask === task._id ? (
                <textarea
                  value={editedTask.description || task.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-md bg-base-100 text-text1"
                />
              ) : (
                task.description && (
                  <p className="text-sm text-text2 mt-1">{task.description}</p>
                )
              )}
              <p className="text-xs text-text3 mt-1">{task.timestamp}</p>
            </div>
          ))}
      </div>

      {/* Add Task */}
      {showInput ? (
        <div className="mt-2 space-y-2 bg-base-200 p-3 rounded-md">
          {/* add title */}
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-2 rounded-md bg-base-100 text-text1"
            placeholder="Title"
            maxLength={50}
          />

          {/* add description */}
          <textarea
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full p-2 rounded-md bg-base-100 text-text1"
            placeholder="Description"
            maxLength={250}
          />

          {/* add image field */}
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
    </div>
  );
};

export default TaskColumn;
