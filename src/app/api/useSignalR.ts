import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { Task } from '../types';

export default function useSignalR() {
  const [hubConnection, setHubConnection] = useState<signalR.HubConnection | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5077/hubs/taskhub', {
        withCredentials: true
      })
      .build();

    connection.start()
      .then(() => console.log('Connected to SignalR Hub'))
      .catch(err => console.error('Connection failed: ', err));

    // Define event listeners
    connection.on("taskAdded", (task: Task) => {
      setTasks((prevTasks) => [...prevTasks, task]);
    });

    connection.on("taskDeleted", (taskId: string) => {
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
    });

    connection.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    });

    setHubConnection(connection);

    return () => {
      connection.stop();
    };
  }, []);

  return { tasks, hubConnection };
};
