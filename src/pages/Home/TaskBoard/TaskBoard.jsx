// import React, { useState } from "react";
// import TaskColumn from "./TaskColumn";
// // import TaskColumn from "./TaskColumn";

// const categories = ["To-Do", "In Progress", "Done"];

// const TaskBoard = () => {
//   const [tasks, setTasks] = useState([]);

//   // Add a new task
//   const addTask = (newTask) => {
//     setTasks([
//       ...tasks,
//       { ...newTask, id: Date.now(), timestamp: new Date().toLocaleString() },
//     ]);
//   };

//   // Edit Task
//   const editTask = (updatedTask) => {
//     setTasks(
//       tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
//     );
//   };

//   // Remove Task
//   const removeTask = (taskId) => {
//     setTasks(tasks.filter((task) => task.id !== taskId));
//   };

//   return (
//     <div className="flex justify-center gap-4 p-5">
//       {categories.map((category) => (
//         <TaskColumn
//           key={category}
//           category={category}
//           tasks={tasks.filter((task) => task.category === category)}
//           addTask={addTask}
//           editTask={editTask}
//           removeTask={removeTask}
//         />
//       ))}
//     </div>
//   );
// };

// export default TaskBoard;

import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";

const categories = ["To-Do", "In Progress", "Done"];

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([
      ...tasks,
      { ...newTask, id: Date.now(), timestamp: new Date().toLocaleString() },
    ]);
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Handle Dragging
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.category = result.destination.droppableId;
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-center gap-4 p-5">
        {categories.map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <TaskColumn
                  category={category}
                  tasks={tasks.filter((task) => task.category === category)}
                  addTask={addTask}
                  editTask={editTask}
                  removeTask={removeTask}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
