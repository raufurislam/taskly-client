import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskItem = ({ task, editTask, removeTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-gray-700 p-3 rounded-md cursor-pointer hover:bg-gray-600"
      style={{ transform: CSS.Transform.toString(transform), transition }}
      onClick={() => editTask(task)}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-blue-400">{task.title}</h3>
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
      {task.description && (
        <p className="text-sm text-gray-300 mt-1">{task.description}</p>
      )}
      <p className="text-xs text-gray-400 mt-1">{task.timestamp}</p>
    </div>
  );
};

export default TaskItem;
