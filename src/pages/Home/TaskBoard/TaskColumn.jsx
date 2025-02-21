// import React, { useContext, useState } from "react";
// import { BsThreeDots } from "react-icons/bs";
// import { HiOutlinePlus } from "react-icons/hi";
// import { IoMdArrowDropright } from "react-icons/io";
// import { LuCalendar } from "react-icons/lu";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaEdit } from "react-icons/fa";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import { AuthContext } from "../../../Providers/AuthProviders";
// import { useQuery } from "@tanstack/react-query";

// const TaskColumn = ({ category }) => {
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     category,
//     imageUrl: "",
//   });
//   const [editingTask, setEditingTask] = useState(null);
//   const [showInput, setShowInput] = useState(false);
//   const axiosPublic = useAxiosPublic();
//   const { user } = useContext(AuthContext);

//   // Fetch tasks for the logged-in user
//   const { data: tasks = [], refetch } = useQuery({
//     queryKey: ["tasks", user?.email],
//     queryFn: async () => {
//       if (!user?.email) return [];
//       const res = await axiosPublic.get(`/tasks?email=${user.email}`);
//       console.log("Fetched tasks:", res.data);
//       return res.data;
//     },
//     enabled: !!user?.email, // Prevents query from running if email is not available
//   });

//   // Add a new task
//   const addTask = async () => {
//     if (newTask.title.trim() === "") return;
//     const task = {
//       ...newTask,
//       email: user.email,
//       timestamp: new Date().toLocaleString(),
//     };
//     try {
//       const res = await axiosPublic.post("/tasks", task);
//       if (res.data.insertedId) {
//         refetch();
//       }
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//     setNewTask({ title: "", description: "", category, imageUrl: "" });
//     setShowInput(false);
//   };

//   // Save edited task
//   const saveTask = async () => {
//     try {
//       await axiosPublic.put(`/tasks/${editingTask._id}`, editingTask);
//       setEditingTask(null);
//       refetch();
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   // Remove a task
//   const removeTask = async (id) => {
//     try {
//       await axiosPublic.delete(`/tasks/${id}`);
//       refetch();
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   return (
//     <div className="w-96 mx-auto bg-base-300 text-text1 shadow-md rounded-2xl p-4">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="font-semibold">{category}</h2>
//         <div className="flex items-center gap-2 text-text2">
//           <IoMdArrowDropright className="cursor-pointer hover:text-primary" />
//           <BsThreeDots className="cursor-pointer hover:text-primary" />
//         </div>
//       </div>

//       {/* Task List filtered by category */}
//       <div className="mt-4 space-y-2">
//         {tasks
//           .filter((t) => t.category === category)
//           .map((task) => (
//             <div
//               key={task._id}
//               className="bg-base-200 p-3 rounded-md hover:bg-base-100"
//             >
//               <div className="flex justify-between items-center">
//                 <h3 className="font-bold text-primary">{task.title}</h3>
//                 <div className="flex items-center gap-2">
//                   <FaEdit
//                     onClick={() => setEditingTask(task)}
//                     className="cursor-pointer text-blue-500 hover:text-blue-700"
//                   />

//                   {/* Implement remove or delete functionality from database here */}
//                   <AiOutlineClose
//                     onClick={() => removeTask(task._id)}
//                     className="cursor-pointer text-red-500 hover:text-red-700"
//                   />
//                 </div>
//               </div>
//               {task.imageUrl && (
//                 <img
//                   src={task.imageUrl}
//                   alt="Task"
//                   className="w-full h-32 object-cover mt-2 rounded-md"
//                 />
//               )}
//               {task.description && (
//                 <p className="text-sm text-text2 mt-1">{task.description}</p>
//               )}
//               <p className="text-xs text-text3 mt-1">{task.timestamp}</p>
//             </div>
//           ))}
//       </div>

//       {/* Add Task Input */}
//       {showInput ? (
//         <div className="mt-2 space-y-2 bg-base-200 p-3 rounded-md">
//           <input
//             type="text"
//             value={newTask.title}
//             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//             className="w-full p-2 rounded-md bg-base-100 text-text1"
//             placeholder="Title"
//             maxLength={50}
//             required
//           />
//           <textarea
//             value={newTask.description}
//             onChange={(e) =>
//               setNewTask({ ...newTask, description: e.target.value })
//             }
//             className="w-full p-2 rounded-md bg-base-100 text-text1"
//             placeholder="Description"
//             maxLength={200}
//           />
//           <input
//             type="text"
//             value={newTask.imageUrl}
//             onChange={(e) =>
//               setNewTask({ ...newTask, imageUrl: e.target.value })
//             }
//             className="w-full p-2 rounded-md bg-base-100 text-text1"
//             placeholder="Image URL"
//           />
//           <button
//             onClick={addTask}
//             className="w-full py-2 bg-primary text-white rounded-md"
//           >
//             Add Task
//           </button>
//         </div>
//       ) : (
//         <div
//           className="flex items-center gap-2 mt-4 cursor-pointer text-text2 hover:text-primary"
//           onClick={() => setShowInput(true)}
//         >
//           <HiOutlinePlus />
//           <p>Add a card</p>
//           <LuCalendar className="ml-auto cursor-pointer" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskColumn;

import React, { useContext, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import { IoMdArrowDropright } from "react-icons/io";
import { LuCalendar } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../Providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const TaskColumn = ({ category }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category,
    imageUrl: "",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosPublic.get(`/tasks?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const addTask = async () => {
    if (newTask.title.trim() === "") return;
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

  const removeTask = async (id) => {
    try {
      await axiosPublic.delete(`/tasks/${id}`);
      refetch();
    } catch (error) {
      console.error("Error deleting task:", error);
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
                <h3 className="font-bold text-primary">{task.title}</h3>
                <div className="flex items-center gap-2">
                  <FaEdit
                    onClick={() => setEditingTask(task)}
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                  />
                  <AiOutlineClose
                    onClick={() => removeTask(task._id)}
                    className="cursor-pointer text-red-500 hover:text-red-700"
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
            </div>
          ))}
      </div>

      {showInput ? (
        <div className="mt-2 space-y-2 bg-base-200 p-3 rounded-md">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-2 rounded-md bg-base-100 text-text1"
            placeholder="Title"
          />
          <textarea
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full p-2 rounded-md bg-base-100 text-text1"
            placeholder="Description"
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
    </div>
  );
};

export default TaskColumn;
