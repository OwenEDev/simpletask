import { Task } from "../types";
import useSignalR from "./useSignalR"

// let tasks = [
//     { id: "1", title: "Make task manager app" },
//     { id: "2", title: "Send app to recruiter" },
//   ];

let { tasks, hubConnection } = useSignalR();
  
  // Simulate a delay for API calls
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  export const getTasks = async () => {
    await delay(500); // Simulate network delay
    return [...tasks];
  };
  
  export const addTask = async (title: string) => {
    await delay(500);
    const newTask = { id: Date.now().toString(), title };
    // tasks.push(newTask);
    if (hubConnection) {
        await hubConnection.invoke("addTask", newTask);
    }
    return newTask;
  };
  
  export const deleteTask = async (id: string) => {
    await delay(500);
    // tasks = tasks.filter(task => task.id !== id);
    if (hubConnection) {
        await hubConnection.invoke("deleteTask", id)
    }
    return id;
  };

  export const updateTask = async (task: Task) => {
    if (hubConnection) {
        await hubConnection.invoke("updateTask", task);
    }
  };
  