let tasks = [
    { id: "1", title: "Make task manager app" },
    { id: "2", title: "Send app to recruiter" },
  ];
  
  // Simulate a delay for API calls
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  export const getTasks = async () => {
    await delay(500); // Simulate network delay
    return [...tasks];
  };
  
  export const addTask = async (title: string) => {
    await delay(500);
    const newTask = { id: Date.now().toString(), title };
    tasks.push(newTask);
    return newTask;
  };
  
  export const deleteTask = async (id: string) => {
    await delay(500);
    tasks = tasks.filter(task => task.id !== id);
    return id;
  };
  