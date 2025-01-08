import * as ImagePicker from 'expo-image-picker';

export const pickImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access photos was denied');
  }
  return await ImagePicker.launchImageLibraryAsync();
};
