import { useState, useRef } from 'react';
import { CameraView, CameraType } from 'expo-camera';

export const useCamera = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (!photo) {
          console.error('No photo captured');
          return;
        }
        setPhoto(photo.uri);
      } catch (error) {
        console.error('Error capturing photo:', error);
      }
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  return {
    facing,
    photo,
    cameraRef,
    toggleCameraFacing,
    takePhoto,
    retakePhoto,
  };
};
