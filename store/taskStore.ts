import { create } from 'zustand';
import { Task, TaskStatus } from '~/types/task';

export interface TaskStore {
  tasks: Task[];
  filter: TaskStatus | 'All';
  searchQuery: string;
  setFilter: (filter: TaskStatus | 'All') => void;
  setSearchQuery: (query: string) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  getFilteredTasks: () => Task[];
}

const useTaskStore = create<TaskStore>((set: any, get: any) => ({
  tasks: [
    { id: '1', title: 'Design UI Mockups', status: 'Pending', estimatedCompletionTime: 3600 },
    { id: '2', title: 'UX Solutions', status: 'Pending', estimatedCompletionTime: 7200 },
    { id: '3', title: 'test 1min Solutions', status: 'Pending', estimatedCompletionTime: 20000 },
    {
      elapsedTime: 115.243,
      endLocation: {
        accuracy: 100,
        altitude: 36.29999923706055,
        altitudeAccuracy: 49.38917922973633,
        heading: 0,
        latitude: 52.52, 
        longitude: 13.405, 
        speed: 0,
      },
      endTime: 1736410498710,
      estimatedCompletionTime: 3600,
      id: '4',
      startLocation: {
        accuracy: 16.791000366210938,
        altitude: 36.29999923706055,
        altitudeAccuracy: 14.56847095489502,
        heading: 0,
        latitude: 52.52, 
        longitude: 13.405, 
        speed: 0,
      },
      startTime: 1736410383467,
      status: 'Completed',
      title: 'Redesign Task Details Page',
    },
  ],

  filter: 'All',
  searchQuery: '',

  setFilter: (filter: TaskStatus | 'All') => set({ filter }),
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),

  addTask: (task: Task) =>
    set((state: TaskStore) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (taskId: string, updatedTask: Partial<Task>) =>
    set((state: TaskStore) => ({
      tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task)),
    })),

  getFilteredTasks: () => {
    const { tasks, filter, searchQuery } = get();
    return tasks
      .filter((task: Task) => filter === 'All' || task.status === filter)
      .filter((task: Task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
  },
}));

export default useTaskStore;
