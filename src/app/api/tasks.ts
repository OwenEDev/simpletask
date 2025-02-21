import { Task } from "../types";
import useSignalR from "./useSignalR"
import webhookEndpoint from "./webHookEndpoint";


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
  
   const apiAddTask = async (name: string) => {
    await delay(500);
    const newTask = { id: Date.now().toString(), name};
    // tasks.push(newTask);
    if (hubConnection) {
        await hubConnection.invoke("AddTask", newTask.id, name)
        .then(() => webhookEndpoint('task-created', newTask))
        .catch(err => console.error("Error invoking AddTask", err))
    }
  
    return newTask;
  };
  
   const apiDeleteTask = async (id: string) => {
    await delay(500);
    // tasks = tasks.filter(task => task.id !== id);
    if (hubConnection) {
        await hubConnection.invoke("DeleteTask", id)
        .then(() => webhookEndpoint('task-deleted', {id, name: ''}))
        .catch(err => console.error('Error deleting task', err));
    }

    return id;
  };

   const apiUpdateTask = async (id: string, name:string ) => {
    if (hubConnection) {
        await hubConnection.invoke("UpdateTask", id, name)
        .then(() => webhookEndpoint('task-updated', {id, name}))
        .catch(err => console.error("Error updating task", err));
    }
  };

  return {getTasks, apiAddTask, apiDeleteTask, apiUpdateTask}
}


  