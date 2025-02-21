import { Task } from "../types";
import useSignalR from "./useSignalR"


export default function apiCalls() {
    // let tasks = [
//     { id: "1", title: "Make task manager app" },
//     { id: "2", title: "Send app to recruiter" },
//   ];

    let { tasks, hubConnection } = useSignalR();
  
  // Simulate a delay for API calls
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
   const getTasks = async () => {
    await delay(500); // Simulate network delay
    return [...tasks];
  };
  
   const apiAddTask = async (title: string) => {
    await delay(500);
    const newTask = { id: Date.now().toString(), title };
    // tasks.push(newTask);
    if (hubConnection) {
        await hubConnection.invoke("addTask", newTask);
    }
    return newTask;
  };
  
   const apiDeleteTask = async (id: string) => {
    await delay(500);
    // tasks = tasks.filter(task => task.id !== id);
    if (hubConnection) {
        await hubConnection.invoke("deleteTask", id)
    }
    return id;
  };

   const apiUpdateTask = async (task: Task) => {
    if (hubConnection) {
        await hubConnection.invoke("updateTask", task);
    }
  };

  return {getTasks, apiAddTask, apiDeleteTask, apiUpdateTask}
}


  