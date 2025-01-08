import { useLocalSearchParams } from 'expo-router';
import useTaskStore from '~/store/taskStore';
import { Task } from '~/types/task';
import * as MediaLibrary from 'expo-media-library';

export const usePhotoSave = () => {
  const { taskId } = useLocalSearchParams();

  const savePhoto = async (photoUri: string) => {
    if (!taskId) return;

    try {
      // here we save photo to media library
      await MediaLibrary.saveToLibraryAsync(photoUri);
      console.log('Photo saved to media library');

      // Save the photo to the task
      const task = useTaskStore.getState().tasks.find((t: Task) => t.id === taskId);
      if (task) {
        const updatedPhotos = [...(task.photos || []), photoUri];
        useTaskStore.getState().updateTask(taskId, { photos: updatedPhotos });
        console.log('Photo saved to task:', taskId);
      }
    } catch (error) {
      console.error('Error saving photo:', error);
    }
  };

  return { savePhoto };
};
