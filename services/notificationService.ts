import * as Notifications from 'expo-notifications';

// config notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// req notification permissions
export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to show notifications was denied.');
    return false;
  }
  return true;
};

// Schedule  notification
export const scheduleNotification = async (title: string, body: string, seconds: number) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
    },
    trigger: { seconds },
  });
};

// here get the Expo push token
export const getExpoPushToken = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to send push notifications was denied.');
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Expo Push Token:', token);
  return token;
};
