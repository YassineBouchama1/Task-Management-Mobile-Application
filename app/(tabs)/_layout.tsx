import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { TabBarIcon } from '~/components/TabBarIcon';
import { requestNotificationPermissions } from '~/services/notificationService';

const TabsLayout = () => {

  // reqyest permission for notification
    useEffect(() => {
      requestNotificationPermissions();
    }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
        },
        tabBarItemStyle: {
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          marginBottom: 5,
        },
        tabBarActiveTintColor: '#1976D2',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => <TabBarIcon name="tasks" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
