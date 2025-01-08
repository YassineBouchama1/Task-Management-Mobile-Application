import { useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export const usePermissions = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  const arePermissionsGranted = cameraPermission?.granted && mediaLibraryPermission?.granted;

  return {
    cameraPermission,
    mediaLibraryPermission,
    requestCameraPermission,
    requestMediaLibraryPermission,
    arePermissionsGranted,
  };
};
