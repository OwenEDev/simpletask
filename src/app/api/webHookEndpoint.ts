import { Task } from "../types";

// Simulate a webhook endpoint that processes task events (create or delete)
const webhookEndpoint = (event: string, taskData: { id: string, name: string }) => {
    const timestamp = new Date().toISOString(); // Get current timestamp for logging
    switch(event) {
        case 'task-created': // Event when a task is created
            handleTaskCreated(taskData, timestamp);
            break;
        case 'task-deleted': // Event when a task is deleted
            handleTaskDeleted(taskData, timestamp);
            break;
        case 'task-updated': // Event when a task is updated
            handleTaskUpdated(taskData, timestamp);
        default:
            // Log any unknown event
            console.log(`[${timestamp}] Unknown event: ${event}`);
        }
  };
  
  // Handler for task creation event
  const handleTaskCreated = (taskData: Task, timestamp: string) => {
    console.log(`[${timestamp}] Task Created: ID = ${taskData.id}`);
  };
  
  // Handler for task deletion event
  const handleTaskDeleted = (taskData: Task, timestamp: string) => {
    console.log(`[${timestamp}] Task Deleted: ID = ${taskData.id}`);
  };

  // Handler for task update event
  const handleTaskUpdated = (taskData: Task, timestamp: string) => {
    console.log(`[${timestamp}] Task Updated: ID = ${taskData.id}`);
  };

  export default webhookEndpoint;
  