interface Task {
  id: string;
  title: string;
}

interface TaskManagerProps {
    task: Task;
    deleteTask: (id: string) => void;
    editingTask: string | null;
    updatedTitle: string;
    setUpdatedTitle: (title: string) => void;
    updateTask: (id: string) => void;
    startEditing: (task: Task) => void;
  }

export type {Task, TaskManagerProps}