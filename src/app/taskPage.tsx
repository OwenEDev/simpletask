'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TaskCard from "./components/taskCard";
import React from "react";

interface Task {
  id: string;
  title: string;
}

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Fetch tasks from API (mocked for now)
    setTasks([
      { id: "1", title: "Sample Task 1" },
      { id: "2", title: "Sample Task 2" },
    ]);
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { id: Date.now().toString(), title: newTask };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Simple Task Manager</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
        <React.Fragment key={task.id}>
          <TaskCard task={task} deleteTask={deleteTask}/>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
