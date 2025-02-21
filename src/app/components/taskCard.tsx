import { motion } from "framer-motion";

export default function TaskCard({task, deleteTask}: any) { //TODO change any
    return (
        <motion.div
        key={task.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <div className="flex justify-between items-center p-2 border rounded shadow">
          <span>{task.title}</span>
          <button 
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </motion.div>
    )
}