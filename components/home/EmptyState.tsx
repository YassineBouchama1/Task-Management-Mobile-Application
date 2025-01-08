import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyState = () => (
  <View style={styles.emptyState}>
    <Text style={styles.emptyStateText}>No active tasks found</Text>
  </View>
);

export default memo(EmptyState);

const styles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    color: '#666',
    fontSize: 16,
  },
});
