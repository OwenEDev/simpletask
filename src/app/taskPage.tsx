'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TaskCard from "./components/taskCard";
import React from "react";
import { Task } from "./types";
import apiCalls from "./api/tasks";


export default function TaskPage() {

  const {getTasks, apiAddTask, apiDeleteTask, apiUpdateTask} = apiCalls();    


  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  

  useEffect(() => {
    const fetchTasks = async () => {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    const task = await apiAddTask(newTask)
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const deleteTask = async (id: string) => {
    await apiDeleteTask(id)
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingTask(task.id);
    setUpdatedTitle(task.name);
  };

  useEffect(() => {console.log(updatedTitle)}, [updatedTitle])

  const updateTask = (task: Task) => {
    setTasks(tasks.map(thisTask => thisTask.id === task.id ? { ...thisTask, name: updatedTitle } : thisTask));
    apiUpdateTask(task.id, task.name);
    setEditingTask(null);
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
          <TaskCard task={task} deleteTask={deleteTask} editingTask={editingTask} updatedTitle={updatedTitle} setUpdatedTitle={setUpdatedTitle} updateTask={updateTask} startEditing={startEditing}/>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
