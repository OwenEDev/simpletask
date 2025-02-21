interface Task {
  id: string;
  name: string;
}

interface TaskManagerProps {
    task: Task;
    deleteTask: (id: string) => void;
    editingTask: string | null;
    updatedTitle: string;
    setUpdatedTitle: (title: string) => void;
    updateTask: (task: Task) => void;
    startEditing: (task: Task) => void;
  }

export type {Task, TaskManagerProps}