import { create } from 'zustand';
import { Task, TaskStatus } from '~/types/task';

interface TaskStore {
  tasks: Task[];
  filter: TaskStatus | 'All';
  searchQuery: string;
  setFilter: (filter: TaskStatus | 'All') => void;
  setSearchQuery: (query: string) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  getFilteredTasks: () => Task[];
}

const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [
    { id: '1', title: 'Design UI Mockups', status: 'Pending', estimatedCompletionTime: 3600 },
    { id: '2', title: 'UX Solutions', status: 'Pending', estimatedCompletionTime: 7200 },
    { id: '3', title: 'test 1min Solutions', status: 'Pending', estimatedCompletionTime: 20000 },
  ],

  filter: 'All',
  searchQuery: '',

  setFilter: (filter: TaskStatus | 'All') => set({ filter }),
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),

  addTask: (task: Task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (taskId: string, updatedTask: Partial<Task>) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task)),
    })),

  getFilteredTasks: () => {
    const { tasks, filter, searchQuery } = get();
    return tasks
      .filter((task) => filter === 'All' || task.status === filter)
      .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
  },
}));

export default useTaskStore;
// import {create} from 'zustand';
// import { Task, TaskStatus } from '~/types/task';

// interface TaskStore {
//   tasks: Task[];
//   filter: TaskStatus | 'All';
//   setFilter: (filter: TaskStatus | 'All') => void;
//   addTask: (task: Task) => void;
//   updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
// }

// // dummy data
// const useTaskStore = create<TaskStore>((set: any) => ({
//   tasks: [
//     { id: '1', title: 'Design UI Mockups', status: 'Pending', estimatedCompletionTime: 3600 },
//     { id: '2', title: 'UX Solutions', status: 'Pending', estimatedCompletionTime: 7200 },
//     { id: '3', title: 'test 1min Solutions', status: 'Pending', estimatedCompletionTime: 20000 },
//   ],

//   filter: 'All',
//   setFilter: (filter: TaskStatus | 'All') => set({ filter }),
//   addTask: (task: Task) => set((state: TaskStore) => ({ tasks: [...state.tasks, task] })),
//   updateTask: (taskId: string, updatedTask: Partial<Task>) =>
//     set((state: TaskStore) => ({
//       tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task)),
//     })),
// }));

// export default useTaskStore;
