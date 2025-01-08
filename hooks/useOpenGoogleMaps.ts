import { Alert, Linking } from "react-native";
import { Task } from "~/types/task";



 // this fun to open Google Maps with the start location
 export const useOpenGoogleMaps = (task: Task) => {
    let location = null;

    if (task.status === 'Completed' && task.endLocation) {
      location = task.endLocation;
    } else if (task.status === 'In Progress' && task.startLocation) {
      location = task.startLocation;
    }

    if (location) {
      const { latitude, longitude } = location;
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

      Linking.openURL(url).catch(() => {
        Alert.alert('Error', 'Unable to open Google Maps.');
      });
    } else {
      Alert.alert('Error', 'No location available for this task.');
    }
 };