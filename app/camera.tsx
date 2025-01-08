import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCamera } from '~/hooks/useCamera';
import { usePhotoSave } from '~/hooks/usePhotoSave';
import { usePermissions } from '~/hooks/usePermissions';
import { CameraView } from 'expo-camera';

export default function CameraCapture() {
  const { facing, photo, cameraRef, toggleCameraFacing, takePhoto, retakePhoto } = useCamera();

  const { savePhoto } = usePhotoSave();

  const {
    cameraPermission,
    mediaLibraryPermission,
    requestCameraPermission,
    requestMediaLibraryPermission,
  } = usePermissions();

  if (!cameraPermission || !mediaLibraryPermission) {
    return <View />;
  }


  // display the camera permission request
  if (!cameraPermission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestCameraPermission}>
          <Text style={styles.permissionButtonText}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // display the media library permission request
  if (!mediaLibraryPermission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>We need your permission to save photos</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestMediaLibraryPermission}>
          <Text style={styles.permissionButtonText}>Grant Media Library Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSavePhoto = async () => {
    if (photo) {
      await savePhoto(photo);
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {photo ? (
        // prev mode
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.previewImage} />
          <View style={styles.previewButtons}>
            <TouchableOpacity style={styles.previewButton} onPress={retakePhoto}>
              <Ionicons name="camera-reverse" size={32} color="#fff" />
              <Text style={styles.previewButtonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.previewButton} onPress={handleSavePhoto}>
              <Ionicons name="checkmark-circle" size={32} color="#fff" />
              <Text style={styles.previewButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (

        // here isa camera mode
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Ionicons name="camera-reverse" size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
              <Ionicons name="camera" size={48} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.back()}>
              <Ionicons name="close" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  message: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#6a11cb',
    padding: 15,
    borderRadius: 10,
  },
  permissionButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  captureButton: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  previewImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  previewButton: {
    alignItems: 'center',
  },
  previewButtonText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
});
