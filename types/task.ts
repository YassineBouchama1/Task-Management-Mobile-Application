
export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  startTime?: number;
  endTime?: number;
  elapsedTime?: number;
  estimatedCompletionTime?: number;
  comments?: string[];
  photos?: string[];
  startLocation?: { latitude: number; longitude: number };
  endLocation?: { latitude: number; longitude: number };
}
export  type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
