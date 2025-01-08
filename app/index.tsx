import { Redirect } from 'expo-router';
import { useAuth } from '~/providers/AuthProvider';

export default function Index() {
  const { isAuthenticated } = useAuth();

  console.log('Index isAuthenticated:', isAuthenticated);


  // here we check if the user is authenticated
  // if they are, we redirect them to the tabs layout
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
