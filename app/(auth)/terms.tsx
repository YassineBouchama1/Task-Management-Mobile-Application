import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import {  useRouter } from 'expo-router';
import { useAuth } from '~/providers/AuthProvider';

export default function TermsScreen() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [locationConsent, setLocationConsent] = useState(false);
  const { handleAcceptedTerms } = useAuth();
  const router = useRouter();
  


  const handleSubmit = async () => {
    if (agreeTerms) {
      console.log('User agreed to Terms and Conditions');
      console.log('Location tracking consent:', locationConsent);
      
      await handleAcceptedTerms();
      router.push('/(tabs)/tasks');
    } else {
      alert('You must agree to the Terms and Conditions to proceed.');
    }
  };


  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
       
      </Text>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={agreeTerms ? 'checked' : 'unchecked'}
          onPress={() => setAgreeTerms(!agreeTerms)}
        />
        <Text style={styles.checkboxLabel}>I agree to the Terms and Conditions</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={locationConsent ? 'checked' : 'unchecked'}
          onPress={() => setLocationConsent(!locationConsent)}
        />
        <Text style={styles.checkboxLabel}>I consent to location tracking</Text>
      </View>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },
});
