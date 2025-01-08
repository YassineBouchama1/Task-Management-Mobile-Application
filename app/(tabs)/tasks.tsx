import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useTaskStore, { TaskStore } from '~/store/taskStore';
import useTaskActions from '~/hooks/useTaskActions';
import TaskCard from '~/components/tasks/TaskCard';
import SearchBar from '~/components/tasks/SearchBar';
import TaskFilters from '~/components/tasks/TaskFilters';
import { Task } from '~/types/task';

const TaskList = () => {
  const getFilteredTasks = useTaskStore((state: TaskStore) => state.getFilteredTasks);
  const { startTask, endTask, isLoading } = useTaskActions();

  const handleStartTask = useCallback(
    (taskId: string) => {
      Alert.alert('Start Task', 'Are you sure you want to start this task?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start', onPress: () => startTask(taskId) },
      ]);
    },
    [startTask]
  );

  const handleEndTask = useCallback(
    (taskId: string) => {
      Alert.alert('End Task', 'Are you sure you want to end this task?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'End', onPress: () => endTask(taskId) },
      ]);
    },
    [endTask]
  );

  const renderTask = useCallback(
    ({ item }:{item:Task}) => (
      <TaskCard
        task={item}
        onStartTask={handleStartTask}
        onEndTask={handleEndTask}
        isLoading={isLoading}
      />
    ),
    [handleStartTask, handleEndTask, isLoading]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task List</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <SearchBar />
      <TaskFilters />

      <FlatList
        data={getFilteredTasks()}
        renderItem={renderTask}
        keyExtractor={useCallback((item:Task) => item.id, [])}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
});

export default TaskList;
