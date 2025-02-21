import { motion } from "framer-motion";
import { TaskManagerProps } from "../types";

export default function TaskCard({task, deleteTask, editingTask, updatedTitle, setUpdatedTitle, updateTask, startEditing}: TaskManagerProps) { //TODO change any
    return (
        <motion.div
            key={task.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex justify-between items-center p-2 border rounded shadow">
              {editingTask === task.id ? (
                <input
                  className="border p-1 flex-1 rounded"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              ) : (
                <span>{task.title}</span>
              )}
              <div className="flex gap-2">
                {editingTask === task.id ? (
                  <button 
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => updateTask(task)}
                  >
                    Save
                  </button>
                ) : (
                  <button 
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => startEditing(task)}
                  >
                    Edit
                  </button>
                )}
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
        </motion.div>
    )
}