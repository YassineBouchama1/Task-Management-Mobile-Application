import { useState, useEffect } from 'react';
import useTaskStore from '../store/taskStore';
import { getCurrentLocation } from '../services/locationService';
import { pickImage } from '../services/imageService';
import { Task } from '~/types/task';

const useTaskActions = () => {
  const { updateTask } = useTaskStore();
  const [isLoading, setIsLoading] = useState(false);



//TODO : implement  check if task end sooner 


  //handle start task
  const startTask = async (taskId: string) => {
    setIsLoading(true);
    try {
      const location = await getCurrentLocation(); // get current location
      const startTime = Date.now();

      updateTask(taskId, { // update task status with location and start time
        status: 'In Progress',
        startTime,
        startLocation: location.coords,
      });

    } catch (error) {
      console.error('Error starting task:', error);
      alert('Failed to start task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };



  const endTask = async (taskId: string) => {
    setIsLoading(true);
    try {
      const location = await getCurrentLocation();
      const endTime = Date.now();

      updateTask(taskId, {
        status: 'Completed',
        endTime,
        endLocation: location.coords,
        elapsedTime:
          (endTime -
            (useTaskStore.getState().tasks.find((t: Task) => t.id === taskId)?.startTime ||
              endTime)) /
          1000,
      });
      
    } catch (error) {
      console.error('Error ending task:', error);
      alert('Failed to end task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addComment = (taskId: string, comment: string) => {
    const task = useTaskStore.getState().tasks.find((t:Task) => t.id === taskId);
    if (task) {
      updateTask(taskId, {
        comments: [...(task.comments || []), comment],
      });
    }
  };

  const uploadPhoto = async (taskId: string) => {
    setIsLoading(true);
    try {
      const result = await pickImage();
      if (!result.canceled) {
        const task = useTaskStore.getState().tasks.find((t: Task) => t.id === taskId);
        if (task) {
          updateTask(taskId, {
            photos: [...(task.photos || []), result.assets[0].uri],
          });
        }
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    startTask,
    endTask,
    addComment,
    uploadPhoto,
    isLoading,
  };
};

export default useTaskActions;
